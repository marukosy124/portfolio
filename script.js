/*************************************************
 * cursor
 **************************************************/
let lights = document.querySelectorAll('.light');

document.body.onmousemove = (e) => moveLight(e);
document.onclick = (e) => applyCursorRippleEffect(e);

function moveLight(e) {
  // set light positions
  for (let i = 0; i < lights.length; i++) {
    lights[i].style.left = `${e.clientX - 13}px`;
    lights[i].style.top = `${e.clientY - 13}px`;
  }
}

function applyCursorRippleEffect(e) {
  // remove light classes
  for (let i = 0; i < lights.length; i++) {
    lights[i].className = '';
  }

  // create and apply ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'light-ripple';
  document.body.appendChild(ripple);
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.style.animation = 'ripple-effect .4s linear';

  // set light back to original class (need refactor later)
  ripple.onanimationend = () => {
    document.body.removeChild(ripple);
    lights[0].className = 'light';
    lights[1].className = 'light light-tail';
    lights[2].className = 'light';
    lights[3].className = 'light light-tail';
  };
}

/*************************************************
 * navbar
 **************************************************/
function expandNavbar() {
  const pageContainer = document.getElementById('page-container');
  const navbar = document.getElementById('navbar');
  if (navbar.className === 'navbar-default') {
    navbar.className = 'navbar-expand';
  } else {
    navbar.className = 'navbar-default';
  }
  pageContainer.classList.toggle('open');

  const navTitles = document.getElementsByClassName('nav-title');
  for (let i = 0; i < navTitles.length; i++) {
    if (navTitles[i].className === 'nav-title nav-title-in') {
      navTitles[i].className = 'nav-title nav-title-out';
    } else {
      navTitles[i].className = 'nav-title nav-title-in';
    }
  }

  const menuIcons = document.getElementsByClassName('menu-icon');
  for (let i = 0; i < menuIcons.length; i++) {
    menuIcons[i].classList.toggle('open');
  }

  const navMobile = document.querySelector('nav');
  navMobile.classList.toggle('open');
}
