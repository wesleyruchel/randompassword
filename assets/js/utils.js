const rangeCustomInput = document.getElementById('range-custom-input')
const rangeOutput = document.getElementById('range-output')
const generateButton = document.getElementById('generate-button')
const copyButton = document.getElementById('copy-button')
const passwordInput = document.getElementById('password-input')
const options = document.querySelectorAll(
  'input[type="checkbox"][data-control-checked="true"]'
)
const darkModeToggleButton = document.getElementById('dark-mode-toggle-button')

function updateSliderValue() {
  rangeOutput.innerHTML = rangeCustomInput.value
}

function countOptionsChecked() {
  let c = 0
  options.forEach((checkbox) => {
    if (checkbox.checked) c++
  })
  return c
}

function showAlertMessage(message, type, timeout) {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)

  setTimeout(function () {
    wrapper.remove()
  }, timeout)
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-bs-theme', newTheme)
}

updateSliderValue()
countOptionsChecked()

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
    copy.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copy.value)
    showAlertMessage('Copied to clipboard!', 'success', 3000)
  }
})

rangeCustomInput.addEventListener('input', () => {
  updateSliderValue()
  passwordInput.value = window.generatePassword()
})

options.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (countOptionsChecked() === 0) checkbox.checked = 'checked'
  })
})

darkModeToggleButton.addEventListener('click', toggleDarkMode)
