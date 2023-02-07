import { javascriptTemplateMap } from './javascript-map-files'
import { typescriptTemplateMap } from './typescript-map-files'

export const template = (language: string) => {
  if (language === 'js' || language === 'javascript')
    return javascriptTemplateMap

  return typescriptTemplateMap
}
