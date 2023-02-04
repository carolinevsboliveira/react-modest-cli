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
      print: { error, info },
    } = toolbox

    try {
      const path = parameters.options.path ?? 'src/components'

      const typeTranslated = typeTranslator({
        type: parameters.options.type,
        generate,
        generatedName: parameters.first,
        generateTestFile: parameters.options.test,
        language: parameters.second ?? 'ts',
        path,
      })

      await Promise.all(typeTranslated.filesToCreate)
      info(`Template generated successfully at folder ${path}.`)
    } catch (err) {
      error(err.message)
    }
  },
}
