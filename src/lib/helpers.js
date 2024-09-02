export function shuffleArray(array) {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }

  return shuffledArray
}

export function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}
