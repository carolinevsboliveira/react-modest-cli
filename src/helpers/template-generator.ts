import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'
import { capitalizeFirtsLetter } from './capitalize-first-letter'
import { template } from './map-template-according-to-language'
import { validateInputedParams } from './params-validation'

type typeTranslatorProps = {
  type: string
  generate: (options: GluegunTemplateGenerateOptions) => Promise<string>
  generatedName?: string
  generateTestFile?: boolean
  language: string
}

type availableLanguages = 'ts' | 'js' | 'javascript' | 'typescript'

const typeTranslator = ({
  type,
  generate,
  generatedName,
  generateTestFile,
  language,
}: typeTranslatorProps): {
  filesToCreate: Promise<string>[]
} => {
  const typeTranslator = template[language as availableLanguages].get(type)

  validateInputedParams({
    generatedName,
    typeTranslatorExists: Boolean(typeTranslator),
    typeTranslatorKeys: Array.from(template[language].keys()),
  })

  const filesToCreate = typeTranslator?.filesToCreate.map((file) => {
    return generate({
      props: {
        name: capitalizeFirtsLetter(generatedName),
        imports: file.importLines ?? [],
      },
      template: file.model,
      target: `src/model/${file.fileName ?? generatedName}.${file.extension}`,
    })
  })

  if (generateTestFile) {
    filesToCreate.push(
      generate({
        template: 'test.tsx.ejs',
        props: {
          name: capitalizeFirtsLetter(generatedName),
        },
        target:
          language === 'js' || language === 'javascript'
            ? `src/model/${generatedName}.spec.jsx`
            : `src/model/${generatedName}.spec.tsx`,
      })
    )
  }

  return {
    filesToCreate,
  }
}
export { typeTranslator }
