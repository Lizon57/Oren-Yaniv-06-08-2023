export const convertDateToDayName = (date: Date) => {
    const option = { weekday: 'short' } as const
    const formatter = new Intl.DateTimeFormat('en', option)

    return formatter.format(date)
}