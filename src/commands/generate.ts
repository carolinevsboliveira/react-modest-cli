import { GluegunToolbox } from 'gluegun'
import { typeTranslator } from '../helpers/template-map-generation'

module.exports = {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { error },
    } = toolbox

    const name = parameters.first

    try {
      const typeTranslated = typeTranslator(
        parameters.options.type,
        generate,
        name
      )

      await Promise.all(typeTranslated.filesToCreate)
    } catch (err) {
      error(err.message)
    }
  },
}
