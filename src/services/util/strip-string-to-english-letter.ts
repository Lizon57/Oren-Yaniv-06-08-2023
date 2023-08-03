export const stripStringToEnglishLetter = (string: string) => {
    const englishRegex = /[^A-Za-z\s]/g
    const strippedString = string.replace(englishRegex, '')
    const trimmedString = strippedString.replace(/\s+/g, ' ').trim()
    return trimmedString
}