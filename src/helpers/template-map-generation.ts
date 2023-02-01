import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'

const templateMaps = new Map([
  [
    'css',
    {
      filesToCreate: [
        { model: 'default.css.ejs', fileName: 'style.css' },
        {
          model: 'component-with-classname.ejs',
          fileName: '%name%.ts',
          importLines: [`import './style.css'`],
        },
      ],
    },
  ],
  [
    'styled',
    {
      filesToCreate: [
        { model: 'styled.ts.ejs', fileName: 'style.ts' },
        {
          model: 'component.ejs',
          fileName: '%name%.ts',
          importLines: [`import { Container } from './style'`],
        },
      ],
    },
  ],
  [
    'scss',
    {
      filesToCreate: [
        { model: 'default.css.ejs', fileName: 'style.scss' },
        {
          model: 'component-with-classname.ejs',
          fileName: '%name%.ts',
          importLines: [`import './style.scss'`],
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
          name: generatedName ? generatedName : '',
          imports: file.importLines ?? [],
        },
        template: file.model,
        target: `src/model/${file.fileName.replace('%name%', generatedName)}`,
      })
    }),
  }
}
export { typeTranslator }
