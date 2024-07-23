/* Scroll to Top button START */

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		document.getElementById('scrollBtn').style.display = 'flex';
		document.getElementById('scrollBtn').style.alignItems = 'center';
		document.getElementById('scrollBtn').style.justifyContent = 'center';
	} else {
		document.getElementById('scrollBtn').style.display = 'none';
	}
}

// When the user clicks on the button, scroll to the top of the document smoothly
function scrollToTop() {
	if (window.scrollTo) {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // Smooth scrolling
		});
	} else {
		// Old browsers support
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE и Opera
	}
}

/* Scroll to Top button END */

// Burger Menu START
const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 992px)');
const topNavMenu = document.querySelector('.main-menu-wrapper');
const main = document.querySelector('main');
const body = document.querySelector('body');
const scrollBtn = document.getElementById('scrollBtn');

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
	scrollBtn.style.display = 'none';
	btnClose.focus();
}

function closeMobileMenu() {
	btnOpen.setAttribute('aria-expanded', 'false');
	topNavMenu.setAttribute('inert', ' ');
	main.removeAttribute('inert');
	body.style.overflow = 'visible';
	scrollBtn.style.display = 'flex';
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
// Burger Menu END
