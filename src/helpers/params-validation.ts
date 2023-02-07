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

  if (!generatedName) throw new Error('A component name should be provided.')

  if (!supportedLanguages.includes(language))
    throw new Error(
      `Unsuported language. Please insert one of these keys: ${supportedLanguages.join(
        ', '
      )}.`
    )
  const validTypes = Array.from(template(language).keys())

  if (!type || !validTypes.includes(type))
    throw new Error(
      `Invalid type paramter. Try one of these keys: ${Array.from(
        validTypes
      ).join(', ')}.`
    )
}
