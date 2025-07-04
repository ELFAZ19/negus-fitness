// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  initCursorAnimation();

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Toggle body scroll when menu is open
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize animations
  initAnimations();

  // Highlight active nav link on scroll
  highlightActiveNavLink();
});


// Cursor Animation Function
function initCursorAnimation() {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, input[type="submit"], input[type="button"], .program-card'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--crimson)';
            cursorOutline.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--gold)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
    
    // Hide cursor on touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}

// Highlight active nav link based on scroll position
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const headerHeight = document.querySelector(".header").offsetHeight;

      if (pageYOffset >= sectionTop - headerHeight - 50) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Button hover effect enhancement
function initButtonEffects() {
  const buttons = document.querySelectorAll(".cta-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function (e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;

      const ripples = document.createElement("span");
      ripples.style.left = x + "px";
      ripples.style.top = y + "px";
      this.appendChild(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 1000);
    });
  });
}

// Initialize animations on scroll
function initAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-up");

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}
