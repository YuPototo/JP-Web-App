/**
 * Format time in seconds to min:sec
 * @param time Time in seconds
 * @param decimalPlaces Number of decimal places to round to
 */
export default function formatTime(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = seconds.toString().padStart(2, '0')
    return `${minutesString}:${secondsString}`
}
