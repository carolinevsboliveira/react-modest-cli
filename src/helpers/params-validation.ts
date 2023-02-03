type validateInputedParamsProps = {
  generatedName?: string
  typeTranslatorExists?: boolean
  typeTranslatorKeys: Array<string>
}

export function validateInputedParams({
  generatedName,
  typeTranslatorExists,
  typeTranslatorKeys,
}: validateInputedParamsProps): void {
  if (!generatedName) throw new Error('A component name should be provided.')
  if (!typeTranslatorExists)
    throw new Error(
      `Invalid type paramter. Try one of ${typeTranslatorKeys.join(', ')}.`
    )
}
