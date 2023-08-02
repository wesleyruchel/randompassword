const rangeCustomInput = document.getElementById("range-custom-input");
const rangeOutput = document.getElementById("range-output");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");
const passwordInput = document.getElementById("password-input");

function updateSliderValue() {
    rangeOutput.innerHTML = rangeCustomInput.value;
}

updateSliderValue();

//  *------ Listeners ------* //
generateButton.addEventListener("click", () => {
    passwordInput.value = window.generatePassword();
})

copyButton.addEventListener("click", () => {
    const copy = document.getElementById("password-input");
    copy.select();
    copy.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copy.value);
    $('.alert').alert()
})

rangeCustomInput.addEventListener("input", updateSliderValue);
rangeCustomInput.addEventListener("input", () => {
    passwordInput.value = window.generatePassword();
});