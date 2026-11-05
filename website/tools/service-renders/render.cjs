// Serves the render page and saves each 3D service icon as a transparent PNG.
const http = require('http')
const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const [root, out, only] = process.argv.slice(2)
const types = { '.html': 'text/html', '.js': 'text/javascript' }
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]))
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404); return res.end() }
    res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' })
    res.end(d)
  })
})
server.listen(0, async () => {
  const port = server.address().port
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] })
  const p = await b.newPage({ viewport: { width: 640, height: 640 } })
  const errs = []
  p.on('pageerror', (e) => errs.push(e.message))
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  await p.goto(`http://127.0.0.1:${port}/index.html`)
  await p.waitForFunction(() => window.ready === true, null, { timeout: 30000 })
  const names = only ? only.split(',') : ['stand', 'print', 'email', 'ads', 'landing', 'screen', 'hosts', 'camera', 'capture', 'nurture']
  for (const n of names) {
    await p.evaluate((n) => window.renderIcon(n), n)
    await p.screenshot({ path: path.join(out, `svc-${n}.png`), omitBackground: true })
    console.log('rendered', n)
  }
  console.log('errors', JSON.stringify(errs))
  await b.close()
  server.close()
})
