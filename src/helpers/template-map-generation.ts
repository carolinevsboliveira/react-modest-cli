import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'
import { capitalizeFirtsLetter } from './capitalize-first-letter'

const templateMaps = new Map<
  string,
  {
    filesToCreate: {
      model: string
      extension: string
      fileName?: string
      importLines?: string[]
    }[]
  }
>([
  [
    'css',
    {
      filesToCreate: [
        { model: 'default.css.ejs', extension: 'css', fileName: 'style' },
        {
          extension: 'tsx',
          model: 'component-with-classname.ejs',
          importLines: [`import './style.css'`],
        },
      ],
    },
  ],
  [
    'styled',
    {
      filesToCreate: [
        { model: 'styled.ts.ejs', extension: 'ts', fileName: 'style' },
        {
          model: 'component.ejs',
          extension: 'tsx',
          importLines: [`import { Container } from './style'`],
        },
      ],
    },
  ],
  [
    'scss',
    {
      filesToCreate: [
        { model: 'default.css.ejs', fileName: 'style', extension: 'scss' },
        {
          model: 'component-with-classname.ejs',
          extension: 'tsx',
          importLines: [`import './style.scss'`],
        },
      ],
    },
  ],
  [
    'single',
    {
      filesToCreate: [
        {
          model: 'single-component.ejs',
          extension: 'tsx',
        },
      ],
    },
  ],
])

type typeTranslatorProps = {
  type: string
  generate: (options: GluegunTemplateGenerateOptions) => Promise<string>
  generatedName?: string
  generateTestFile?: boolean
}

const typeTranslator = ({
  type,
  generate,
  generatedName,
  generateTestFile,
}: typeTranslatorProps): {
  filesToCreate: Promise<string>[]
} => {
  const typeTranslator = templateMaps.get(type)

  if (!generatedName) throw new Error('A component name should be provided.')
  if (!typeTranslator)
    throw new Error(
      `Invalid type paramter. Try one of ${Array.from(templateMaps.keys()).join(
        ', '
      )}.`
    )

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
        target: `src/model/${generatedName}.spec.tsx`,
      })
    )
  }

  return {
    filesToCreate,
  }
}
export { typeTranslator }
