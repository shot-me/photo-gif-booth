export function onShotMeKeyboardClick(currentPhoneNumber, phoneDigitChar) {
  switch (phoneDigitChar) {
    case "clear":
      return "";
    case "backspace":
      return currentPhoneNumber.substring(0, currentPhoneNumber.length - 1);
    default:
      if (currentPhoneNumber.length === 9) {
        return currentPhoneNumber;
      }
      return currentPhoneNumber + phoneDigitChar;
  }
}
