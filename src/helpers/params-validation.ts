import { template } from './map-template-according-to-language'

type validateInputedParamsProps = {
  language: string
  type: string
  generatedName?: string
}

export function validateInputedParams({
  language,
  type,
  generatedName,
}: validateInputedParamsProps): void {
  const supportedLanguages = ['ts', 'typescript', 'js', 'javascript']

  if (!supportedLanguages.includes(language))
    throw new Error(
      `Unsuported language. Please insert one of these keys: ${supportedLanguages.join(
        ', '
      )}.`
    )

  if (!generatedName) throw new Error('A component name should be provided.')

  const typeTranslator = template[language].get(type)

  if (!typeTranslator)
    throw new Error(
      `Invalid type paramter. Try one of these keys: ${Array.from(
        typeTranslator.keys()
      ).join(', ')}.`
    )
}
