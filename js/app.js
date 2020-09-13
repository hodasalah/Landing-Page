/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let sections = document.querySelectorAll('section');
let navList = document.querySelector('.navbar__list');
let navListMob = document.querySelector('.navbar__list__mob');
let menuBtn = document.querySelector('.btn-toggle');
let mybutton = document.getElementById("myBtn");
let links = document.getElementsByClassName('menu__link')
let navItem = "";
let navLink = "";
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// BUILD NAVIGATION MENU

for (let i = 0; i < sections.length; i++) {
	navItem = document.createElement('li');
	navLink = document.createElement('a');
	navLink.textContent = sections[i].getAttribute('data-nav')
	navLink.setAttribute('href', `#${sections[i].id}`);
	navLink.className = 'menu__link';
	navItem.appendChild(navLink);
	navList.appendChild(navItem);
}

// Add class 'active' to section when near top of viewport
let observer = new IntersectionObserver((entries) => {

	entries.forEach(entry => {
		if (entry.intersectionRatio > 0.00) {
			entry.target.classList.add('active')

		} else {
			entry.target.classList.remove('active')
		}

	})
})
sections.forEach(sec => {
	observer.observe(sec);
})
// add an active class to nav link when scroll to its section
function addActiveToNavOnScroll() {
	Array.from(sections).map(sec => {
		return Array.from(links).map(li => {
			if (sec.classList.contains('active')) {
				if (li.hash === `#${sec.id}`) {
					return li.parentElement.classList.add('activeLink')
				} else {
					return li.parentElement.classList.remove('activeLink')
				}
			}
		})

	})
}
window.addEventListener('scroll', addActiveToNavOnScroll)

// Scroll to anchor ID using scrollTO event
function scrollToTarget(e) {
	e.preventDefault()
	// loop on all sections 
	for (let i = 0; i < sections.length; i++) {

		if (sections[i].id === e.target.hash.slice(1)) {
			// make scroll slide effect 
			sections[i].style.transform = `translateY(${this.offsetTop})`;
			window.scrollTo({
				top: sections[i].offsetTop,
				behavior: 'smooth',
				left: 0
			})
			// add activeLink class to li in navbar
			e.target.parentElement.classList.add('activeLink');
			// remove activeLink class from other siblings
			let childrenLinks = e.target.parentElement.parentElement.children;
			Array.from(childrenLinks).map(li => {
				if (li.classList.contains('activeLink') && li !== e.target.parentElement) {
					return li.classList.remove('activeLink')
				}
			});
			// add active class to section when click on its link in navbar 
			sections[i].classList.add('active');
		} else {
			sections[i].classList.remove('active');
		}
	}
}

for (let i = 0; i < links.length; i++) {
	links[i].addEventListener('click', scrollToTarget);
}
/** SCROLL TO TOP FUNCTION */
window.onscroll = function () {
	scrollFunction()
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
mybutton.addEventListener('click', topFunction)

// TOGGLE NAV MENU BUTTON CLOSE OR OPEN
function toggleMenu() {
	navList.classList.toggle('open');
	menuBtn.classList.toggle('btn-close')
}

menuBtn.addEventListener('click', toggleMenu)
/**
 * End Main Functions
 * Begin Events
 * 
 */