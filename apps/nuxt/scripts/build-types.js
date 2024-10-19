import glob from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// The goal of this build step is to generate two artifacts (per dependency):
// 1. Metadata: version + file list of dependency (meta.js)
// 2. Data: A key-value store from file names to file content (data.js)
//
// Both of these will be dynamically required by the TS editor.

// Dependencies that artifacts need to be generated for
const dependencies = {
    // Core TS libs
    typescript: {
        version: '5.6.3',
        base:"lib",
        src: ['lib/*.d.ts'],
    },
    "xstate":{
        version:"5.18.2",
        base:"dist/declarations/src",
        src: ["dist/declarations/src/**/*.d.ts"]
    }
    // Node libs
    // '@types/node': {
    //   version: '14', // Because this is the version of Node on Vercel
    //   src: ['*.d.ts'],
    // },
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DEST_ROOT = path.resolve(__dirname, '..',  'types')
console.log(DEST_ROOT)
const DISCLAIMER = '// This file was generated, do not edit manually\n\n'

// Clean out the destination
fs.rmSync(DEST_ROOT, { recursive: true, force: true })
fs.mkdirSync(DEST_ROOT, { recursive: true })

console.log('Prebuilding types')



for (const [dep, { version, src, base }] of Object.entries(dependencies)) {
    console.log(`Using ${dep} version: ${version}`)

    // Prepare destination for this dependency
    fs.mkdirSync(path.join(DEST_ROOT, dep), { recursive: true })
    const dependencySource=path.join(__dirname, '../', 'node_modules', dep)
    function toName(f) {
        return path.relative(path.join(dependencySource,base || "."),f);
    }
    console.log("dep", path.join(DEST_ROOT, dep), "\t dir", dependencySource)
    
    // Get a list of files in this dependency
    const files = await glob(
        src,
        { absolute: true, cwd: dependencySource },
    )

    console.log(files.length)
    const metaFile = path.join(DEST_ROOT, dep, 'meta.js')
    // Generate artifact 1: Metadata
    fs.writeFileSync(
        metaFile,
        `${DISCLAIMER}export const version = "${version}"`,
    )
    const metaStream = fs.createWriteStream(metaFile)
    metaStream.write(DISCLAIMER)
    metaStream.write(`export const version = "${version}"\n\n`)
    metaStream.write('export const files = [')
    files.forEach(f => {
        const name = toName(f)
        console.log(name) 
        metaStream.write(`\n  "${name}",`)
    })
    metaStream.write('\n]\n')
    metaStream.end()
    // Generate typedefs so Vite can import it with types
    fs.writeFileSync(
        path.join(DEST_ROOT, dep, 'meta.d.ts'),
        `${DISCLAIMER}export const version: string;\nexport const files: string[];`,
    )

    // Generate artifact 2: A KV pair from file names to file content
    const dataStream = fs.createWriteStream(path.join(DEST_ROOT, dep, 'data.js'))
    dataStream.write(DISCLAIMER)
    dataStream.write(`export const version = "${version}"\n\n`)
    dataStream.write('export const files = {')
    files.forEach(f => {
        const name = toName(f)
        const content = fs.readFileSync(path.resolve(f), 'utf8')
        dataStream.write(`\n"${name}": `)
        dataStream.write(`${JSON.stringify(content)},`)
    })
    dataStream.write('\n}\n')
    dataStream.end()
    // Generate typedefs so Vite can import it with types
    fs.writeFileSync(
        path.join(DEST_ROOT, dep, 'data.d.ts'),
        `${DISCLAIMER}export const version: string;\nexport const files: Record<string,string>;`,
    )
}