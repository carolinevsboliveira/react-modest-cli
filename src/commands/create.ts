import { GluegunToolbox } from 'gluegun'
import { typeTranslator } from '../helpers/template-map-generation'

const availableLanguages = ['ts', 'js', 'typescript', 'javascript']

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
      if (!availableLanguages.includes(parameters.second ?? 'ts'))
        throw new Error(`There's no template available for selected language.`)

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
