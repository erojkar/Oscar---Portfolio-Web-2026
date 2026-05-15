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