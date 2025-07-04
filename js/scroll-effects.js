// Scroll-triggered animations using Intersection Observer API
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the 'reveal' class
  const revealElements = document.querySelectorAll(".reveal");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the 'active' class when element is in view
          entry.target.classList.add("active");

          // Optionally stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px", // Adjust the root margin for better timing
    }
  );

  // Observe each reveal element
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // Parallax effect for hero section
  const heroBg = document.querySelector(".hero-bg-image");
  if (heroBg) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }

  // Animate elements with different directions
  const fadeLeftElements = document.querySelectorAll(".fade-left");
  const fadeRightElements = document.querySelectorAll(".fade-right");
  const fadeBottomElements = document.querySelectorAll(".fade-bottom");

  fadeLeftElements.forEach((el) => {
    el.style.transform = "translateX(-50px)";
    el.style.opacity = "0";
  });

  fadeRightElements.forEach((el) => {
    el.style.transform = "translateX(50px)";
    el.style.opacity = "0";
  });

  fadeBottomElements.forEach((el) => {
    el.style.transform = "translateY(50px)";
    el.style.opacity = "0";
  });

  // Additional scroll effects for specific sections
  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const statNumbers = document.querySelectorAll(".stat-number");

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statNumbers.forEach((number, index) => {
              const target = +number.innerText;
              const increment = target / 30;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  number.innerText = target;
                  clearInterval(timer);
                } else {
                  number.innerText = Math.floor(current);
                }
              }, 30);
            });

            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }
});
