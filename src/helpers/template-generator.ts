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
  path: string
}

const typeTranslator = ({
  type,
  generate,
  generatedName,
  generateTestFile,
  language,
  path,
}: typeTranslatorProps): {
  filesToCreate: Promise<string>[]
} => {
  validateInputedParams({
    generatedName,
    type,
    language,
  })

  const typeTranslator = template(language).get(type)

  const filesToCreate = typeTranslator?.filesToCreate.map((file) => {
    return generate({
      props: {
        name: capitalizeFirtsLetter(generatedName),
        imports: file.importLines ?? [],
      },
      template: file.model,
      target: `${path}/${file.fileName ?? generatedName}.${file.extension}`,
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
            ? `${path}/${generatedName}.spec.jsx`
            : `${path}/${generatedName}.spec.tsx`,
      })
    )
  }

  return {
    filesToCreate,
  }
}
export { typeTranslator }
