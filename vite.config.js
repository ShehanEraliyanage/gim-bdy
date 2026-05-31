import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const VIRTUAL_ASSETS_ID = 'virtual:assets'
const RESOLVED_VIRTUAL_ASSETS_ID = '\0' + VIRTUAL_ASSETS_ID

function scanAssets(publicDir, base) {
  const imagesDir = path.join(publicDir, 'images')
  const musicDir = path.join(publicDir, 'music')

  const readFiles = (dir, ext) => {
    if (!fs.existsSync(dir)) return []
    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(ext))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  }

  const images = readFiles(imagesDir, '.png').map((f) => `${base}images/${f}`)
  const music = readFiles(musicDir, '.mp3').map((f) => `${base}music/${f}`)

  return { images, music }
}

function assetManifestPlugin(base) {
  let publicDir = path.join(process.cwd(), 'public')

  const generateModule = () => {
    const manifest = scanAssets(publicDir, base)
    return `export default ${JSON.stringify(manifest, null, 2)}`
  }

  return {
    name: 'asset-manifest',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === VIRTUAL_ASSETS_ID) return RESOLVED_VIRTUAL_ASSETS_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ASSETS_ID) return generateModule()
    },
    configureServer(server) {
      const invalidate = (file) => {
        if (
          file.includes('/images/') ||
          file.includes('/music/') ||
          file.includes('\\images\\') ||
          file.includes('\\music\\')
        ) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ASSETS_ID)
          if (mod) server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
    buildStart() {
      const manifest = scanAssets(publicDir, base)
      const outPath = path.join(publicDir, 'asset-manifest.json')
      fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2))
    },
  }
}

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/gim-bdy/' : '/'

  return {
    plugins: [react(), assetManifestPlugin(base)],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  }
})
