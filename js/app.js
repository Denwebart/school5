// Burger Menu
const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 992px)');
const topNavMenu = document.querySelector('.main-menu-wrapper');
const main = document.querySelector('main');
const body = document.querySelector('body');

function setupTopNav(e) {
	if (e.matches) {
		// is mobile
		topNavMenu.setAttribute('inert', ' ');
		topNavMenu.style.transition = 'none';
	} else {
		// is tablet/desktop
		topNavMenu.removeAttribute('inert');
	}
}

function openMobileMenu() {
	btnOpen.setAttribute('aria-expanded', 'true');
	topNavMenu.removeAttribute('inert');
	topNavMenu.removeAttribute('style');
	main.setAttribute('inert', ' ');
	body.style.overflow = 'hidden';
	// body.setAttribute('overflow', 'hidden');
	btnClose.focus();
}

function closeMobileMenu() {
	btnOpen.setAttribute('aria-expanded', 'false');
	topNavMenu.setAttribute('inert', ' ');
	main.removeAttribute('inert');
	body.style.overflow = 'visible';
	// body.removeAttribute('overflow');
	btnOpen.focus();

	setTimeout(() => {
		topNavMenu.style.transition = 'none';
	}, 500);
}

setupTopNav(media);

btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

media.addEventListener('change', function (e) {
	setupTopNav(e);
});
