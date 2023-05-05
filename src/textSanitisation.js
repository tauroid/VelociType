
// So the user doesn't have to type accents
const characterReplacements = {
  '\u00e9': 'e',
}
  
function transformCharacter (character) {
  if (character in characterReplacements) {
    return characterReplacements[character]
  }
  
  return character
}
  