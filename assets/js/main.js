/*=============== SIDEBAR SCROLL-SPY ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section, #home');
    const navLinks = document.querySelectorAll('.nav_link');

    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Set initial active state for home
    if (window.scrollY < 100) {
        const homeLink = document.querySelector('.nav_link[href="#home"]');
        if (homeLink) homeLink.classList.add('active-link');
    }

    const navMenu = document.getElementById('side');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    /*===== SIDEBAR SHOW =====*/
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-sidebar');
        });
    }

    /*===== SIDEBAR HIDE =====*/
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-sidebar');
        });
    }

    // Highlight the Home button when clicked and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            link.classList.add('active-link');

            // Close mobile menu when link is clicked
            if (window.innerWidth <= 1024) {
                navMenu.classList.remove('show-sidebar');
            }
        });
    });

    // Set initial active state for home
    if (window.scrollY < 100) {
        const homeLink = document.querySelector('.nav_link[href="#home"]');
        if (homeLink) homeLink.classList.add('active-link');
    }
});



/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */






/*=============== SKILLS ACCORDION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const skillsCategories = document.querySelectorAll('.skills_category');
    const skillsData = document.querySelectorAll('.skills_data');

    skillsCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.getAttribute('data-category');
            
            // Close all categories
            skillsCategories.forEach(cat => cat.classList.remove('active'));
            skillsData.forEach(data => data.classList.remove('active'));
            
            // Open clicked category
            category.classList.add('active');
            const targetData = document.querySelector(`.skills_data[data-content="${categoryName}"]`);
            if (targetData) {
                targetData.classList.add('active');
                
                // Animate progress bars
                setTimeout(() => {
                    const progressBars = targetData.querySelectorAll('.skills_progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = `${width}%`;
                    });
                }, 100);
            }
        });
    });

    // Initialize first category
    if (skillsCategories.length > 0) {
        skillsCategories[0].click();
    }
});
       

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerportfolio = mixitup('.work_container', {
    selectors: {
        target: '.work_card'
    },
    animation: {
        duration: 300
    }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work_item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work')); // Consistent class name
    this.classList.add('active-work'); // Consistent class name
}

linkWork.forEach(l => l.addEventListener('click', activeWork));










/*===== Work Popup =====*/
document.addEventListener("click",(e) =>{
    if(e.target.classList.contains("work_button")){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio_popup").classList.toggle("open")
}
document.querySelector(".portfolio_popup-close").addEventListener("click",togglePortfolioPopup)

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp_thumbnail img").src =portfolioItem.querySelector(".work_img").src; //for changing image
    document.querySelector(".portfolio_popup-subtitle span").innerHTML =portfolioItem.querySelector(".work_title").innerHTML;//changing the work title
    document.querySelector(".portfolio_popup-body").innerHTML =portfolioItem.querySelector(".portfolio_item-details").innerHTML;//changing the work title

}
/*=============== SERVICES MODAL ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const modalViews = document.querySelectorAll('.services_modal');
    const modalBtns = document.querySelectorAll('.services_button');
    const modalCloses = document.querySelectorAll('.services_modal-close');

    // Store original body overflow and position to restore later
    let originalBodyOverflow = '';
    let originalBodyPosition = '';
    let scrollY = 0;

    function openModal(index) {
        // Prevent multiple modals from opening
        closeAllModals();
        
        // Store current scroll position
        scrollY = window.scrollY;
        
        // Lock body scroll
        originalBodyOverflow = document.body.style.overflow;
        originalBodyPosition = document.body.style.position;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        
        // Open the selected modal
        if (modalViews[index]) {
            modalViews[index].classList.add('active-modal');
        }
    }

    function closeAllModals() {
        // Close all modals
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
        
        // Restore body scroll
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.position = originalBodyPosition || '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        if (scrollY !== 0) {
            window.scrollTo(0, scrollY);
        }
    }

    // Open modal on button click - ONLY for service buttons, not nav links
    modalBtns.forEach((modalBtn, i) => {
        modalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(i);
        });
    });

    // Close modal on close button click
    modalCloses.forEach((modalClose) => {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals();
        });
    });

    // Close modal on backdrop click
    modalViews.forEach((modalView) => {
        modalView.addEventListener('click', (e) => {
            // Only close if clicking the backdrop (not the content)
            if (e.target === modalView) {
                e.preventDefault();
                e.stopPropagation();
                closeAllModals();
            }
        });
        
        // Prevent modal content clicks from closing
        const modalContent = modalView.querySelector('.services_modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            closeAllModals();
        }
    });
});

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
const revealSections = document.querySelectorAll('.reveal-section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve after animation to prevent re-triggering
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Observe all reveal sections
revealSections.forEach(section => {
    revealObserver.observe(section);
});

/*=============== SWIPER TESTIMONIAL ===============*/
document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".testimonials_container", {
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
         },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      },
    });
  });
  

/*=============== INPUT ANIMATION ===============
const inputs =document.querySelectorAll(".input");

function focusFunc(){
    let parent =this.parentNode;
    parent.classList.add("focus");
}

function blurFunc(){
    let parent =this.parentNode;
    if(this.value == ""){
        parent.classList.remove("focus");
}
}

inputs.forEach((input) => {
    input.addEventListener("focus",focusFunc);
    input.addEventListener("blur",blurFunc);
}
)*/

/*=============== typewriting effect ===============*/
document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect function with a callback
    function typeWriter(element, text, delay = 100, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else if (callback) {
                setTimeout(callback, delay);  // Call the callback after a delay to make it more visible
            }
        }
        element.innerHTML = '';  // Clear the initial content before starting
        type();
    }

    // Apply the typewriter effect to home_title and home_name infinitely
    function startTypeWriter() {

        const homeTitle = document.querySelector('.home_title');
        const homeTitleText = homeTitle.getAttribute('data-text');
        homeTitle.innerHTML='';
        const homeName = document.querySelector('.home_name');
        const homeNameText = homeName.getAttribute('data-text');
        homeName.innerHTML='';
        typeWriter(homeTitle, homeTitleText, 100, function() {
            typeWriter(homeName, homeNameText, 100, function() {
                // Restart the typewriter effect for both elements
                setTimeout(startTypeWriter, 1000);  // Add a delay before restarting
            });
        });
    }

    // Start the typewriter effect initially
    startTypeWriter();
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add("active_link");
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove("active_link");
        }
    });
}

/*=============== SHOW SCROLL UP ===============*/


