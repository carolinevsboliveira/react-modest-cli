export const javascriptTemplateMap = new Map<
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
          extension: 'jsx',
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
        { model: 'styled.ts.ejs', extension: 'js', fileName: 'style' },
        {
          model: 'component.ejs',
          extension: 'jsx',
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
          extension: 'jsx',
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
          extension: 'jsx',
        },
      ],
    },
  ],
])
