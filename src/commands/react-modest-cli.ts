import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'react-modest-cli',
  description: 'A small CLI to create standardized files faster.',
  run: async (toolbox) => {
    const { table } = toolbox.print
    table(
      [
        ['Command Name', 'Usage', 'Options'],
        ['Help', '-h | -help', 'x'],
        ['Version', '-v | -version', 'x'],
        [
          'Create',
          'c | create',
          '<name> <language> --type=<available_type> --path=<component_path> --test',
        ],
      ],
      {
        format: 'lean',
        style: { 'padding-left': 0, 'padding-right': 8 },
      }
    )
  },
}

module.exports = command
