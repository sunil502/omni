

document.addEventListener("DOMContentLoaded", () => {

  
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
    

    menuToggle.textContent = menuToggle.classList.contains("active") ? "✕" : "☰";
  });

  
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });


  const quotes = document.querySelectorAll(".quote");
  const nextBtn = document.querySelector(".next-quote");
  const prevBtn = document.querySelector(".prev-quote");

  let currentIndex = 0;
  const totalQuotes = quotes.length;
  let autoSlide;

  function showQuote(index) {
    quotes.forEach((quote, i) => {
      quote.classList.toggle("active", i === index);
    });
  }

  function nextQuote() {
    currentIndex = (currentIndex + 1) % totalQuotes;
    showQuote(currentIndex);
  }

  function prevQuote() {
    currentIndex = (currentIndex - 1 + totalQuotes) % totalQuotes;
    showQuote(currentIndex);
  }


  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextQuote();
      restartAutoSlide();
    });
    prevBtn.addEventListener("click", () => {
      prevQuote();
      restartAutoSlide();
    });
  }


  function startAutoSlide() {
    autoSlide = setInterval(nextQuote, 5000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();

  
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".step, .feature, .integration-card, blockquote").forEach(el => {
    observer.observe(el);
  });

});
