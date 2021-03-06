import {matcherHint} from 'jest-matcher-utils'

import {checkHtmlElement, getMessage} from './utils'

export function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this)
  const tagName = htmlElement.tagName.toLowerCase()

  if (!['select', 'input', 'textarea'].includes(tagName)) {
    throw new Error(
      '.toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead.',
    )
  }

  if (tagName === 'input' && ['radio', 'checkbox'].includes(htmlElement.type)) {
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`,
    )
  }

  const value =
    tagName === 'select'
      ? Array.from(htmlElement)
          .filter(option => option.selected)
          .map(option => option.textContent)
          .toString()
      : htmlElement.value

  return {
    pass: value === expectedValue.toString(),
    message: () =>
      getMessage(
        matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveDisplayValue`,
          'element',
          '',
        ),
        `Expected element ${this.isNot ? 'not ' : ''}to have display value`,
        expectedValue,
        'Received',
        value,
      ),
  }
}
