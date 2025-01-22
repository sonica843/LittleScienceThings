// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const animatedTitle = document.querySelector(".animated-title");
  animatedTitle.classList.add("start-animation");

  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section");

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight the active section in the navbar
  const handleScroll = () => {
    const scrollPos = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // Adjust for header height
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-menu a[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  };

  // Debounce scroll event
  let isScrolling;
  document.addEventListener("scroll", () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 100); // Limit scroll updates
  });

  // Trigger on page load to highlight correct section
  handleScroll();
});
