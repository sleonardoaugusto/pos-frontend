const invalidFeedback = (wrapper, fieldId) =>
  wrapper
    .find(fieldId)
    .element.parentElement.parentElement.parentElement.querySelector(
      '.v-messages__message'
    ).textContent

export { invalidFeedback }
