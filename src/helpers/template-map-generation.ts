import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'

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
          importLines: [],
        },
      ],
    },
  ],
])

const typeTranslator = (
  type: string,
  generate: (options: GluegunTemplateGenerateOptions) => Promise<string>,
  generatedName?: string
): {
  //importsLine: string[]
  filesToCreate: Promise<string>[]
} => {
  const typeTranslator = templateMaps.get(type)

  if (!typeTranslator)
    throw new Error(
      `Invalid type paramter. Try one of ${Array.from(templateMaps.keys()).join(
        ', '
      )}`
    )
  return {
    //importsLine: selectedType.importsLine,
    filesToCreate: typeTranslator?.filesToCreate.map((file) => {
      console.log(file.importLines)
      return generate({
        props: {
          name: generatedName
            ? generatedName.charAt(0).toUpperCase() + generatedName.slice(1)
            : '',
          imports: file.importLines ?? [],
        },
        template: file.model,
        target: `src/model/${file.fileName ?? generatedName}.${file.extension}`,
      })
    }),
  }
}
export { typeTranslator }
