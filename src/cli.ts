import { build } from 'gluegun'

async function run(argv) {
  const cli = build()
    .brand('react-modest-cli')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'react-modest-cli-*', hidden: true })
    .help()
    .version()
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
