const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 120) {
    header?.classList.add('hide');
  } else {
    header?.classList.remove('hide');
  }

  lastScroll = currentScroll;
});

const modal = document.querySelector('#projectModal');
const modalImg = document.querySelector('#modalImg');
const modalTitle = document.querySelector('#modalTitle');
const modalDesc = document.querySelector('#modalDesc');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    const title = tile.dataset.title || '';
    const desc = tile.dataset.desc || '';
    const full = tile.dataset.full || tile.querySelector('img')?.src;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = full;
    modalImg.alt = title;

    /* Siempre abrir arriba del todo */
    modal.scrollTop = 0;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    /* Reforzamos el scroll arriba después de abrir */
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
    });
  });
});

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  /* Reset de imagen y scroll */
  modal.scrollTop = 0;
  modalImg.src = '';

  document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if(event.target === modal){
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape' && modal?.classList.contains('open')){
    closeModal();
  }
});
/* ============================= */
/* DROPDOWN WORK */
/* ============================= */

const navDropdown = document.querySelector('.nav-dropdown');
const navDropdownTrigger = document.querySelector('.nav-dropdown-trigger');
const navDropdownLinks = document.querySelectorAll('.nav-dropdown-menu a');

/* Mobile: abrir/cerrar al clicar Work */
navDropdownTrigger?.addEventListener('click', () => {
  if (window.innerWidth <= 640) {
    const isOpen = navDropdown.classList.toggle('open');
    navDropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
});

/* Al clicar una opción: cerrar menú */
navDropdownLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navDropdown?.classList.add('force-close');
    navDropdown?.classList.remove('open');
    navDropdownTrigger?.setAttribute('aria-expanded', 'false');
    navDropdownTrigger?.blur();
  });
});

/* En desktop: no volver a abrir hasta que el ratón salga del bloque Work */
navDropdown?.addEventListener('mouseleave', () => {
  navDropdown.classList.remove('force-close');
});

/* En mobile: si cambia el tamaño de pantalla, reset */
window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    navDropdown?.classList.remove('open');
    navDropdownTrigger?.setAttribute('aria-expanded', 'false');
  }
});