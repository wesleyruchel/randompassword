function generatePassword() {
  const length = document.getElementById('range-custom-input').value
  const includeNumbers = document.getElementById('numbers-check-input').checked
  const includeUppercase = document.getElementById(
    'uppercase-check-input'
  ).checked
  const includeLowercase = document.getElementById(
    'lowercase-check-input'
  ).checked
  const includeSymbols = document.getElementById('symbols-check-input').checked
  return generateRandomValue(
    length,
    includeNumbers,
    includeUppercase,
    includeLowercase,
    includeSymbols
  )
}

function generateRandomValue(
  length,
  includeNumbers,
  includeUppercase,
  includeLowercase,
  includeSymbols
) {
  const numbers = '0123456789'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let allowedChars = ''
  if (includeNumbers) allowedChars += numbers
  if (includeUppercase) allowedChars += uppercaseLetters
  if (includeSymbols) allowedChars += symbols
  if (includeLowercase) allowedChars += lowercaseLetters

  const charArray = allowedChars.split('')
  const charArrayLength = charArray.length
  let randomValue = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInRange(0, charArrayLength)
    randomValue += charArray[randomIndex]
  }

  return randomValue
}

function getRandomInRange(min, max) {
  const range = max - min
  const bitsNeeded = Math.ceil(Math.log2(range))
  const bytesNeeded = Math.ceil(bitsNeeded / 8)
  const randomBytes = new Uint8Array(bytesNeeded)

  let randomValue
  do {
    window.crypto.getRandomValues(randomBytes)
    randomValue = 0
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = (randomValue << 8) + randomBytes[i]
    }
    randomValue %= range
  } while (randomValue >= range)

  return min + randomValue
}
