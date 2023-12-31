export const getErrorMessage = (error: unknown) => {
    return (typeof error === 'object' && error !== null && 'message' in error)
        ? error.message as string
        : 'An unknown arror occured.'
}