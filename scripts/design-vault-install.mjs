#!/usr/bin/env node

import { spawnSync } from 'node:child_process'

const target = process.argv[2]

if (!target || target === '--help' || target === '-h') {
  console.log('Usage: npm run design:install -- author/component')
  console.log('   or: npm run design:install -- https://21st.dev/r/author/component')
  process.exit(target ? 0 : 1)
}

const url = target.startsWith('https://21st.dev/r/')
  ? target
  : `https://21st.dev/r/${target.replace(/^\/+/, '')}`

if (!/^https:\/\/21st\.dev\/r\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(url)) {
  console.error(`Invalid 21st registry target: ${target}`)
  process.exit(1)
}

console.log(`Installing 21st component: ${url}`)
console.log('After install, preserve source/author attribution and run build + lint.')

const result = spawnSync('npx', ['shadcn@latest', 'add', url], {
  stdio: 'inherit',
  shell: false,
})

process.exit(result.status ?? 1)
