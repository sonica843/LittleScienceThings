document.addEventListener("DOMContentLoaded", () => {
  const animatedTitle = document.querySelector(".animated-title");
  const banner = document.getElementById("banner");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector(".header");

  animatedTitle.classList.add("start-animation");

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href").substring(1);

      // If the link is for the timeline page, redirect instead of scrolling
      if (targetId === "timeline") {
        return; // Allow the default behavior (opening the timeline page)
      }

      event.preventDefault(); // Prevent default behavior for internal links
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight the active section in the navbar and animate sections
  const setActiveLink = () => {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust for fixed navbar
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  };

  // Show progress bar on page load
  window.addEventListener("load", () => {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "100%";
    setTimeout(() => {
      document.getElementById("progress-bar-container").style.display = "none";
    }, 1000);
  });

  // Scroll event to highlight active navbar link
  window.addEventListener("scroll", setActiveLink);

  // Funzione per la gestione dello scroll
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scroll verso il basso (applica l'effetto di riduzione)
      banner.classList.add("shrink");
      banner.classList.remove("shrink-reversed");
    } else {
      // Scroll verso l'alto (applica l'effetto di reingrandimento)
      banner.classList.add("shrink-reversed");
      banner.classList.remove("shrink");
    }

    // Aggiorna la posizione dello scroll
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Animazione del canvas del banner
  const canvas = document.getElementById('bannerCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const numberOfParticles = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5; // Dimensione delle particelle ridotta
      this.speedX = Math.random() * 1.5 - 0.75; // Velocità ridotta
      this.speedY = Math.random() * 1.5 - 0.75; // Velocità ridotta
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Rigenera la particella se esce dallo schermo
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Dimensione delle particelle ridotta
        this.speedX = Math.random() * 1.5 - 0.75; // Velocità ridotta
        this.speedY = Math.random() * 1.5 - 0.75; // Velocità ridotta
      }
    }
    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();

  // Toggle menu for mobile devices
  const menuToggle = document.createElement('div');
  menuToggle.classList.add('menu-toggle');
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  banner.appendChild(menuToggle);

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Rimuovi la classe 'initial' dopo un breve ritardo per mostrare l'effetto di ingrandimento iniziale
  setTimeout(() => {
    banner.classList.remove("initial");
  }, 2000); // 2 secondi di ritardo

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
      banner.classList.add("shrink");
      navMenu.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
      banner.classList.remove("shrink");
      navMenu.classList.remove("shrink");
    }
  });
});
