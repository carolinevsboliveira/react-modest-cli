import { GluegunToolbox } from 'gluegun'
import { typeTranslator } from '../helpers/template-generator'

module.exports = {
  name: 'create',
  alias: ['c'],
  description: 'Create standart files according to type',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { error },
    } = toolbox

    try {
      const typeTranslated = typeTranslator({
        type: parameters.options.type,
        generate,
        generatedName: parameters.first,
        generateTestFile: parameters.options.test,
        language: parameters.second ?? 'ts',
      })

      await Promise.all(typeTranslated.filesToCreate)
    } catch (err) {
      error(err.message)
    }
  },
}
