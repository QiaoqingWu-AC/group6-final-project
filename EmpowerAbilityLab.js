// wrap all the js codes inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Lightbox functionality
  const meetBtn = document.getElementById("meetBtn");
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("close-btn");

  // hamburger menu
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbar = document.getElementById("navbar");

  const form = document.querySelector("form");
  const textArea = document.getElementById("textarea-div");
  const speakerCheckbox = document.getElementById("check-2");
  const emailField = document.getElementById("email");

  // Services page functionality
  const sections = document.querySelectorAll(".container section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  console.log({ meetBtn, lightbox, closeBtn, speakerCheckbox, textArea, sections, form });

  // Added by QW: function for hamburger menu
  hamburgerMenu.addEventListener("click", () => {
    const isExpanded = hamburgerMenu.getAttribute("aria-expanded") === "true";
    // toggle "show"
    navbar.classList.toggle("show");
    // update aria-expanded
    hamburgerMenu.setAttribute("aria-expanded", !isExpanded);
    console.log("hamburger menu works.");
  });

  // Fixed by QW: the check box event is now functioning
  if (speakerCheckbox & textArea) {
    speakerCheckbox.addEventListener("change", () => {
      console.log("checkbox is changed");
      if (speakerCheckbox.checked) {
        textArea.style.display = "block";
      } else {
        textArea.style.display = "none";
      }
      
      console.log("checkbox event works");
    
    });

    if (speakerCheckbox.checked) {
      textArea.style.display = "block";
    } else {
      textArea.style.display = "none";
    }
  }
  
  // Fixed by QW: deleted the dynamical function of adding a close button, it is unnecessary
  if (meetBtn & closeBtn & lightbox) {
    console.log("entering function for meetbtn");
    
    // Function to open the lightbox
    function openLightbox() {
      lightbox.classList.remove("invisible");
      lightbox.classList.add("visible");
      lightbox.setAttribute("aria-hidden", "false");
      meetBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus(); // Focus on the close button for accessibility
    }

    // Function to close the lightbox
    function closeLightbox() {
      lightbox.classList.remove("visible");
      lightbox.classList.add("invisible");
      lightbox.setAttribute("aria-hidden", "true");
      meetBtn.setAttribute("aria-expanded", "false");
      meetBtn.focus(); // Return focus to the button for accessibility
    }

    // Toggle lightbox visibility when the "Meet the Empower Community" button is clicked
    // ERROR for the meetBtn needs to fix: Cannot read properties of null (reading 'addEventListener')
    meetBtn.addEventListener("click", () => {
      const isHidden = lightbox.getAttribute("aria-hidden") === "true";
      isHidden ? openLightbox() : closeLightbox();
    });

    // Close the lightbox when the close button is clicked
    closeBtn.addEventListener("click", closeLightbox);

    // Close the lightbox when the Escape key is pressed
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });

    // Trap focus within the lightbox when it is open
    // TO DO: this function seems not work
    lightbox.addEventListener("keydown", (event) => {
      const focusableElements = lightbox.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArray = Array.from(focusableElements);
      const currentIndex = focusableArray.indexOf(document.activeElement);

      if (focusableArray.length > 0) {
        // Arrow Down or Arrow Right: Move focus to the next element
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableArray.length;
          focusableArray[nextIndex].focus();
        }

        // Arrow Up or Arrow Left: Move focus to the previous element
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          const prevIndex =
            (currentIndex - 1 + focusableArray.length) % focusableArray.length;
          focusableArray[prevIndex].focus();
        }
      }
    });
  }

  // Enable keyboard navigation for navigation links (ArrowLeft/ArrowRight)
  // TO DO: This function not work
  navLinks.forEach((link, index) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (index + 1) % navLinks.length; // Wrap to the first link
        navLinks[nextIndex].focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = (index - 1 + navLinks.length) % navLinks.length; // Wrap to the last link
        navLinks[prevIndex].focus();
      }
    });
  });

  // Smooth scrolling for navigation links (optional enhancement)
  // Fixed by QW: delete the optional enhancement, not functioned and no need for that

  // Accessibility: Make sections focusable
  // TO DO: The focus is invisible, not sure if the function works
  sections.forEach((section) => {
    console.log("section is focused");
    section.setAttribute("tabindex", "0"); // Allow keyboard users to focus on sections
  });

  // Form validation feedback
  form.addEventListener("submit", (event) => {
    const emailValue = emailField.value.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!isEmailValid) {
      event.preventDefault();
      alert("Please enter a valid email address.");
      emailField.focus();
    }
  });

  console.log("JavaScript executed after DOM is fully loaded");
});



