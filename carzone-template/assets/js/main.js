/**
 * Carzone - Car Detailing & Auto Repair Template
 * Main JavaScript File
 */

(function () {
  "use strict";

  // DOM Content Loaded
  document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
  });

  function initializeApp() {
    // Initialize all components
    initNavbar();
    initHeroSlider();
    initScrollAnimations();
    initContactForm();
    initBookingForm();
    initGalleryFilter();
    initLightbox();
    initTestimonialCarousel();
    initCounters();
    initSmoothScroll();
    initBackToTop();
    initPreloader();
  }

  // Navbar functionality
  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    // Navbar scroll effect
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function () {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }

  // Hero Slider
  function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const indicators = document.querySelectorAll(".carousel-indicators button");
    let currentSlide = 0;
    const slideInterval = 5000;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // Auto slide
    setInterval(nextSlide, slideInterval);

    // Manual controls
    document
      .querySelector(".carousel-control-next")
      ?.addEventListener("click", nextSlide);
    document
      .querySelector(".carousel-control-prev")
      ?.addEventListener("click", prevSlide);

    // Indicator controls
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document
      .querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .slide-in-up"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  }

  // Contact Form
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showAlert("Please fill in all required fields.", "danger");
        return;
      }

      if (!isValidEmail(data.email)) {
        showAlert("Please enter a valid email address.", "danger");
        return;
      }

      // Simulate form submission
      showAlert(
        "Thank you for your message! We will get back to you soon.",
        "success"
      );
      contactForm.reset();
    });
  }

  // Booking Form
  function initBookingForm() {
    const bookingForm = document.getElementById("bookingForm");
    if (!bookingForm) return;

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.phone || !data.service) {
        showAlert("Please fill in all required fields.", "danger");
        return;
      }

      // Simulate booking submission
      showAlert(
        "Your booking request has been submitted! We will contact you shortly.",
        "success"
      );
      bookingForm.reset();
    });
  }

  // Gallery Filter
  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".gallery-filter button");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Filter items
        galleryItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });

    // Gallery Modal
    const galleryModal = document.getElementById("galleryModal");
    const galleryModalImage = document.getElementById("galleryModalImage");
    const galleryModalLabel = document.getElementById("galleryModalLabel");

    if (galleryModal) {
      // Handle modal trigger buttons
      document
        .querySelectorAll('[data-bs-target="#galleryModal"]')
        .forEach((button) => {
          button.addEventListener("click", function () {
            const imageSrc = this.getAttribute("data-image");
            const imageTitle = this.getAttribute("data-title");

            if (galleryModalImage && imageSrc) {
              galleryModalImage.src = imageSrc;
              galleryModalImage.alt = imageTitle || "Gallery Image";
            }

            if (galleryModalLabel && imageTitle) {
              galleryModalLabel.textContent = imageTitle;
            }
          });
        });
    }
  }

  // Lightbox
  function initLightbox() {
    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        openLightbox(this.src, this.alt);
      });
    });
  }

  function openLightbox(src, alt) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}">
            </div>
        `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";

    // Close lightbox
    lightbox.addEventListener("click", function (e) {
      if (
        e.target === lightbox ||
        e.target.classList.contains("lightbox-close")
      ) {
        closeLightbox(lightbox);
      }
    });

    // ESC key to close
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox(lightbox);
      }
    });
  }

  function closeLightbox(lightbox) {
    document.body.removeChild(lightbox);
    document.body.style.overflow = "auto";
  }

  // Testimonial Carousel
  function initTestimonialCarousel() {
    const carousel = document.querySelector(".testimonial-carousel");
    if (!carousel) return;

    const items = carousel.querySelectorAll(".testimonial-item");
    const indicators = carousel.querySelectorAll(".carousel-indicators button");
    let currentItem = 0;

    function showTestimonial(index) {
      items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
    }

    // Auto rotate testimonials
    setInterval(() => {
      currentItem = (currentItem + 1) % items.length;
      showTestimonial(currentItem);
    }, 4000);
  }

  // Counter Animation
  function initCounters() {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  }

  // Smooth Scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Back to Top Button
  function initBackToTop() {
    const backToTop = document.querySelector(".back-to-top");
    if (!backToTop) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Preloader
  function initPreloader() {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Utility Functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showAlert(message, type = "info") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText =
      "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
    alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
})();
