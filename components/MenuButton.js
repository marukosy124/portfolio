class MenuButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="menu-btn">
      <div class="menu-btn-inner">
        <div class="menu-icon" class="" onclick="expandNavbar()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
  </div>`;
  }
}

customElements.define('menu-btn', MenuButton);
