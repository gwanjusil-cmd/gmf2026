import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function githubPagesFallback(): Plugin {
  let outDir = 'dist'
  let base = '/'

  return {
    name: 'github-pages-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      base = config.base
    },
    closeBundle() {
      const segments = base.split('/').filter(Boolean).length
      const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>GMF 뮤지션</title>
    <script>
      (function () {
        var segmentsToKeep = ${segments}
        var location = window.location
        var parts = location.pathname.split('/')
        var kept = parts.slice(0, 1 + segmentsToKeep).join('/')
        var rest = parts.slice(1 + segmentsToKeep).join('/').replace(/&/g, '~and~')
        var search = location.search ? '&' + location.search.slice(1).replace(/&/g, '~and~') : ''
        location.replace(
          location.protocol + '//' + location.hostname +
          (location.port ? ':' + location.port : '') +
          kept + '/?/' + rest + search + location.hash
        )
      })()
    </script>
  </head>
  <body></body>
</html>
`
      writeFileSync(resolve(outDir, '404.html'), html)
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  plugins: [react(), githubPagesFallback()],
  server: {
    host: true,
  },
})
