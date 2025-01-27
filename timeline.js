document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Aggiungi interattività agli elementi della timeline
  timelineItems.forEach((item) => {
    const content = item.querySelector(".timeline-content");

    item.addEventListener("click", () => {
      // Alterna la visibilità del contenuto
      content.classList.toggle("active");

      // Scorri dolcemente fino all'elemento cliccato
      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  // Evidenzia il link attivo nella navbar
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section");

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
