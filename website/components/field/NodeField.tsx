'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { resolveMorph, useField, type Formation } from '@/lib/field-store'
import {
  COUNT, DIM, LEAD_INDEX, LIFT_INDEX, MAX_RAYS, RAY_OPACITY, SERVICE_COUNT,
  buildFormations, clusterOf, clustersInto, pipelineInto, pointDefaultY, serviceOf,
} from '@/lib/formations'

// Spring constants: slightly under critical damping (2 * sqrt(60) ≈ 15.5) for one soft overshoot.
const STIFF = 60
const DAMP = 14
const PUSH_RADIUS_SQ = 1.2 * 1.2
const MAX_TILT = 0.1 // radians, about 6 degrees

const MIST = new THREE.Color('#E3E8F4')
const ORANGE = new THREE.Color('#FF5A1F')
const dummy = new THREE.Object3D()
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const hit = new THREE.Vector3()
const NO_RAYS: number[] = []

export function NodeField() {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const lines = useRef<THREE.LineSegments>(null!)
  const lineMat = useRef<THREE.LineBasicMaterial>(null!)
  const nodeMat = useRef<THREE.MeshBasicMaterial>(null!)
  const group = useRef<THREE.Group>(null!)

  const { raycaster, pointer, camera } = useThree()
  const width = useThree((s) => s.viewport.width)
  const height = useThree((s) => s.viewport.height)
  const pxW = useThree((s) => s.size.width)
  const pxH = useThree((s) => s.size.height)

  // Static layouts are rebuilt only when the viewport changes size.
  const F = useMemo(() => buildFormations(width, height), [width, height])

  // Live simulation state lives in typed arrays, outside React.
  const pos = useMemo(() => F.positions.scatter.slice(), []) // eslint-disable-line react-hooks/exhaustive-deps
  const vel = useMemo(() => new Float32Array(COUNT * 3), [])
  const linePos = useMemo(() => new Float32Array(MAX_RAYS * 6), [])
  const clusterBuf = useMemo(() => new Float32Array(COUNT * 3), [])
  const pipeBuf = useMemo(() => new Float32Array(COUNT * 3), [])
  const pipeScale = useMemo(() => new Float32Array(COUNT), [])
  const pipeLead = useMemo(() => new Uint8Array(COUNT), [])
  const colorState = useMemo(() => new Uint8Array(COUNT), [])
  const centersW = useMemo(() => new Float32Array(6), [])
  const prevCenters = useMemo(() => new Float32Array(6).fill(NaN), [])
  const pointBuf = useMemo(() => new Float32Array(COUNT * 3), [])
  // Hubs only: the services scales with every satellite at zero, so just the nine centres show.
  const hubOnlyScale = useMemo(() => {
    const base = F.scales.services
    const out = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) out[i] = i < SERVICE_COUNT ? (base ? base[i] : 1) : 0
    return out
  }, [F])

  useLayoutEffect(() => {
    for (let i = 0; i < COUNT; i++) mesh.current.setColorAt(i, MIST)
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30) // no explosions after a tab switch
    const st = useField.getState()
    const { from, to, mix } = resolveMorph(st.segments)
    const fA: Formation = from === 'hero' ? st.heroFormation : from
    const fB = to
    const dominant = mix < 0.5 ? fA : fB
    const calm = from === 'hero' ? 1 - mix : 0 // cursor tilt and drift only around the hero
    const t = state.clock.elapsedTime

    // Animated formations are computed fresh each frame, only when in use.
    if (fA === 'clusters' || fB === 'clusters') {
      const c = st.clusterCenters
      for (let k = 0; k < 3; k++) {
        centersW[k * 2] = c ? (c[k][0] / pxW - 0.5) * width : F.defaultCenters[k * 2]
        centersW[k * 2 + 1] = c ? (0.5 - c[k][1] / pxH) * height : F.defaultCenters[k * 2 + 1]
      }
      clustersInto(clusterBuf, F.clusterBase, centersW, t)
      // The card windows scroll with the page. Carry the settled nodes along by exactly the
      // same distance, so the constellations ride with their cards instead of trailing behind.
      const w = fB === 'clusters' ? mix : fA === 'clusters' ? 1 - mix : 0
      for (let i = 0; i < COUNT; i++) {
        const c = clusterOf(i)
        const dx = centersW[c * 2] - prevCenters[c * 2]
        const dy = centersW[c * 2 + 1] - prevCenters[c * 2 + 1]
        if (Number.isFinite(dy)) {
          pos[i * 3] += dx * w
          pos[i * 3 + 1] += dy * w
        }
      }
      prevCenters.set(centersW)
    } else {
      prevCenters.fill(NaN)
    }
    if (fA === 'pipeline' || fB === 'pipeline') {
      pipelineInto(pipeBuf, pipeScale, pipeLead, width, height, t, st.sim)
    }
    if (fA === 'point' || fB === 'point') {
      const c = st.pointCenter
      const cx = c ? (c[0] / pxW - 0.5) * width : 0
      const cy = c ? (0.5 - c[1] / pxH) * height : pointDefaultY(height)
      const P = F.positions.point
      for (let i = 0; i < COUNT; i++) {
        pointBuf[i * 3] = P[i * 3] + cx
        pointBuf[i * 3 + 1] = P[i * 3 + 1] + cy
        pointBuf[i * 3 + 2] = 0
      }
    }
    const posOf = (f: Formation) =>
      f === 'clusters' ? clusterBuf : f === 'pipeline' ? pipeBuf : f === 'point' ? pointBuf : F.positions[f]
    const scaleOf = (f: Formation) => (f === 'pipeline' ? pipeScale : f === 'services' && st.hubsOnly ? hubOnlyScale : F.scales[f])
    const A = posOf(fA)
    const B = posOf(fB)
    const sA = scaleOf(fA)
    const sB = scaleOf(fB)
    // Once the stream fully owns the field, nodes follow it exactly (no spring lag on wrap-around).
    const pipeOnly = (fB === 'pipeline' && mix > 0.97) || (fA === 'pipeline' && mix < 0.03)

    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane, hit)

    let colorsDirty = false
    for (let i = 0; i < COUNT; i++) {
      const k = i * 3
      if (pipeOnly) {
        for (let a = 0; a < 3; a++) {
          pos[k + a] = A[k + a] + (B[k + a] - A[k + a]) * mix
          vel[k + a] = 0
        }
      } else {
        for (let a = 0; a < 3; a++) {
          const target = A[k + a] + (B[k + a] - A[k + a]) * mix
          vel[k + a] += ((target - pos[k + a]) * STIFF - vel[k + a] * DAMP) * dt
        }
        // The cursor walks through the hall: nearby nodes step aside.
        const dx = pos[k] - hit.x
        const dy = pos[k + 1] - hit.y
        const d2 = dx * dx + dy * dy
        if (d2 < PUSH_RADIUS_SQ) {
          const f = (6 / (d2 + 0.05)) * (0.3 + 0.7 * calm)
          vel[k] += dx * f * dt
          vel[k + 1] += dy * f * dt
        }
        vel[k + 2] += Math.sin(t * 0.6 + i * 1.7) * 0.03 * calm
        pos[k] += vel[k] * dt
        pos[k + 1] += vel[k + 1] * dt
        pos[k + 2] += vel[k + 2] * dt
      }

      const lift =
        from === 'hero' && ((dominant === 'stand' && i === LIFT_INDEX) || (dominant === 'converge' && i === LEAD_INDEX))
      const a0 = sA ? sA[i] : 1
      const b0 = sB ? sB[i] : 1
      dummy.position.set(pos[k], pos[k + 1], pos[k + 2])
      dummy.scale.setScalar(lift ? 2.2 : a0 + (b0 - a0) * mix)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)

      let orange = lift
      if (!orange) {
        if (dominant === 'services') orange = st.activeService !== null && serviceOf(i) === st.activeService
        else if (dominant === 'clusters') orange = st.activePackage !== null && clusterOf(i) === st.activePackage
        else if (dominant === 'pipeline') orange = pipeLead[i] === 1
        else if (dominant === 'point') orange = true
      }
      const cs = orange ? 1 : 0
      if (cs !== colorState[i]) {
        colorState[i] = cs
        mesh.current.setColorAt(i, orange ? ORANGE : MIST)
        colorsDirty = true
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true
    if (colorsDirty && mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true

    // Rays follow whichever formation dominates.
    const pairs = dominant === 'services' && st.hubsOnly ? NO_RAYS : F.rays[dominant]
    let n = 0
    for (let r = 0; r < pairs.length && n < MAX_RAYS; r += 2, n++) {
      const a = pairs[r] * 3
      const b = pairs[r + 1] * 3
      const o = n * 6
      linePos[o] = pos[a]
      linePos[o + 1] = pos[a + 1]
      linePos[o + 2] = pos[a + 2]
      linePos[o + 3] = pos[b]
      linePos[o + 4] = pos[b + 1]
      linePos[o + 5] = pos[b + 2]
    }
    const geo = lines.current.geometry
    geo.setDrawRange(0, n * 2)
    geo.attributes.position.needsUpdate = true

    const dim = DIM[fA] + (DIM[fB] - DIM[fA]) * mix
    const rays = (RAY_OPACITY[fA] + (RAY_OPACITY[fB] - RAY_OPACITY[fA]) * mix) * dim
    lineMat.current.opacity = THREE.MathUtils.damp(lineMat.current.opacity, rays, 6, dt)
    nodeMat.current.opacity = THREE.MathUtils.damp(nodeMat.current.opacity, 0.9 * dim, 6, dt)

    // Tilt towards the pointer around the hero; flat elsewhere so nodes line up with the DOM.
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * MAX_TILT * calm, 4, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * MAX_TILT * calm, 4, dt)
  })

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial ref={nodeMat} toneMapped={false} transparent opacity={0} />
      </instancedMesh>
      <lineSegments ref={lines} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMat} color="#E3E8F4" transparent opacity={0} toneMapped={false} />
      </lineSegments>
    </group>
  )
}
