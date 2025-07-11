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

function initCursorAnimation() {
  // Create royal cursor container
  const royalCursor = document.createElement("div");
  royalCursor.classList.add("royal-cursor");

  // Create cursor elements
  const cursorCore = document.createElement("div");
  cursorCore.classList.add("cursor-core");

  const cursorCrown = document.createElement("div");
  cursorCrown.classList.add("cursor-effect", "cursor-crown");

  const cursorSparkle = document.createElement("div");
  cursorSparkle.classList.add("cursor-effect", "cursor-sparkle");

  // Assemble cursor
  royalCursor.appendChild(cursorCore);
  royalCursor.appendChild(cursorCrown);
  royalCursor.appendChild(cursorSparkle);
  document.body.appendChild(royalCursor);

  // Track mouse movement with smoother follow
  let posX = 0,
    posY = 0;
  let mouseX = 0,
    mouseY = 0;

  const updateCursor = () => {
    posX += (mouseX - posX) / 6;
    posY += (mouseY - posY) / 6;

    royalCursor.style.left = `${posX}px`;
    royalCursor.style.top = `${posY}px`;

    requestAnimationFrame(updateCursor);
  };

  updateCursor();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Add special effects to interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .nav-link, input[type="submit"], input[type="button"], .program-card, .trainer-card'
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      royalCursor.style.width = "40px";
      royalCursor.style.height = "40px";
    });

    element.addEventListener("mouseleave", () => {
      royalCursor.style.width = "24px";
      royalCursor.style.height = "24px";
    });
  });

  // Special effect for CTA buttons
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      cursorSparkle.style.opacity = "0.8";
    });

    button.addEventListener("mouseleave", () => {
      cursorSparkle.style.opacity = "0";
    });
  });

  // Special effect for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursorCrown.style.opacity = "1";
    });

    link.addEventListener("mouseleave", () => {
      cursorCrown.style.opacity = "0";
    });
  });
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
