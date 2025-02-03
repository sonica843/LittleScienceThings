document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    animatedTitle: document.querySelector(".animated-title"),
    banner: document.getElementById("banner"),
    navMenu: document.querySelector(".nav-menu"),
    navLinks: document.querySelectorAll(".nav-menu a"),
    sections: document.querySelectorAll("section"),
    header: document.querySelector(".header")
  };

  elements.animatedTitle.classList.add("start-animation");

  // Banner starts with 'initial' class for a reduced state on load
  elements.banner.classList.add('initial');

  // Immediately expand the banner to full screen
  setTimeout(() => {
    elements.banner.classList.remove('initial');
    elements.banner.classList.add('expanded');
    elements.navMenu.style.display = "flex"; // Show the navigation menu
  }, 0);

  // Smooth scroll for navigation links
  elements.navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Highlight the active section in the navbar and animate sections
  const setActiveLink = () => {
    let index = elements.sections.length;

    while (--index && window.scrollY + 50 < elements.sections[index].offsetTop) {}

    elements.navLinks.forEach((link) => link.classList.remove("active"));
    if (elements.navLinks[index]) {
      elements.navLinks[index].classList.add("active");
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 50;
    
    // Gestiamo lo shrink del banner
    if (isScrolled) {
      elements.banner.classList.add("banner-shrink");
      elements.banner.classList.remove("expanded");
      elements.navMenu.classList.add('fixed'); // Aggiungi la classe 'fixed' per renderla fissa
    } else {
      elements.banner.classList.remove("banner-shrink");
      elements.banner.classList.add("expanded");
      elements.navMenu.classList.remove('fixed'); // Rimuovi la classe quando torni in alto
    }
  
    setActiveLink();
  };
  

  // Use one scroll event listener for all scroll-related actions
  window.addEventListener("scroll", handleScroll);

  // Show progress bar on page load
  window.addEventListener("load", handleScroll);

  // Animazione del canvas del banner
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray;

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  };

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5; // Reduce particle size further
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 2) - 1;
      let directionY = (Math.random() * 2) - 1;
      let color = '#ffffff';

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
  }

  init();
  animate();


});

