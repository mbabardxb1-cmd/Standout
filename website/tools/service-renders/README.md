# Service icon renders

The ten 3D service icons in `public/icons/services/` are rendered from the three.js models in `index.html` (one function per service, STANDOUT colours).

To re-render after changing a model:

```bash
ln -sfn ../../node_modules/three tools/service-renders/three
node tools/service-renders/render.cjs tools/service-renders ./renders            # all ten
node tools/service-renders/render.cjs tools/service-renders ./renders stand,email # just some
```

This writes 640 px transparent PNGs. Crop them, then save them as 360 px WebP in `public/icons/services/svc-<name>.webp`.
