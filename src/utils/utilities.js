const HOUR = 3600
const MINUTES = 60

export const ageFromSeconds = seconds => {
  const time = []
  const hours = Math.floor(seconds / HOUR)
  const minutes = Math.floor((seconds % HOUR) / MINUTES)
  if (hours) { time.push(`${hours} hours`) }
  if (minutes) { time.push(`${minutes} minutes`) }
  return time.join(' ')
}
