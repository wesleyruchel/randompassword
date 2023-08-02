const rangeCustomInput = document.getElementById('range-custom-input')
const rangeOutput = document.getElementById('range-output')
const generateButton = document.getElementById('generate-button')
const copyButton = document.getElementById('copy-button')
const passwordInput = document.getElementById('password-input')

function updateSliderValue() {
  rangeOutput.innerHTML = rangeCustomInput.value
}

function showAlertMessage(message, type, element, timeout) {
  const alert = document.createElement('div')
  alert.classList.add('alert', type, 'mt-3')
  alert.innerHTML = message

  const container = document.getElementById(element)
  container.appendChild(alert)

  setTimeout(function () {
    alert.remove()
  }, timeout)
}

updateSliderValue()

//  *------ Listeners ------* //
document.addEventListener('DOMContentLoaded', () => {
  generateButton.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
  )
})

generateButton.addEventListener('click', () => {
  passwordInput.value = window.generatePassword()
})

copyButton.addEventListener('click', () => {
  const copy = document.getElementById('password-input')
  if (copy.value !== '') {
    copy.select()
    copy.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copy.value)
    showAlertMessage('Copied!', 'alert-success', 'context-body', 3000)
  }
})

rangeCustomInput.addEventListener('input', () => {
  updateSliderValue()
  passwordInput.value = window.generatePassword()
})
