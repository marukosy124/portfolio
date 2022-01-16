class TypingText extends HTMLElement {
  constructor() {
    super();
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(newValue) {
    this.setAttribute('text', newValue);
  }

  get fontSize() {
    return this.getAttribute('fontSize');
  }

  set fontSize(newValue) {
    this.setAttribute('fontSize', newValue);
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="typing" style="width: ${this.text.length}ch; font-size: ${this.fontSize}em">
      ${this.text}
    </div>`;
  }
}

customElements.define('typing-text', TypingText);
