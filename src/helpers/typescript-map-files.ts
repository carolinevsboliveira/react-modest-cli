export const typescriptTemplateMap = new Map<
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
