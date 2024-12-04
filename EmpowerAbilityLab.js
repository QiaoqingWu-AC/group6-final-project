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
  // const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // no need

  console.log({ meetBtn, lightbox, closeBtn, speakerCheckbox, textArea, sections, form });

// Navbar links functions
  // Added by QW: function for hamburger menu
  hamburgerMenu.addEventListener("click", () => {
    const isExpanded = hamburgerMenu.getAttribute("aria-expanded") === "true";
    // toggle "show"
    navbar.classList.toggle("show");
    // update aria-expanded
    hamburgerMenu.setAttribute("aria-expanded", !isExpanded);
    console.log("hamburger menu works.");
  });

// "Home" page
  // Fixed by QW: deleted the dynamical function of adding a close button, it is unnecessary
  if (meetBtn && closeBtn && lightbox) {
    console.log("entering function for meetbtn");
    
    // Function to open the lightbox
    // Fixed by QW: solved a css issue, simplify the js codes
    function openLightbox() {
      lightbox.style.display = "block";
      lightbox.setAttribute("aria-hidden", "false");
      meetBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus(); // Focus on the close button for accessibility
    }

    // Function to close the lightbox
    // Fixed by QW: solved a css issue, simplify the js codes
    function closeLightbox() {
      lightbox.style.display = "none"
      lightbox.setAttribute("aria-hidden", "true");
      meetBtn.setAttribute("aria-expanded", "false");
      meetBtn.focus(); // Return focus to the button for accessibility
    }

    // Toggle lightbox visibility when the "Meet the Empower Community" button is clicked
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

    // Trap focus within the lightbox when it is open // Deleted by QW: The focus-trapping function is redundant

  }

// "Services" page
  // Accessibility: Make sections focusable
  sections.forEach((section) => {
    console.log("section is focused");
    section.setAttribute("tabindex", "0"); // Allow keyboard users to focus on sections
  });

// "Schedule a Call" page
  // Fixed by QW: the check box event is now functioning
  if (speakerCheckbox && textArea) {
    textArea.style.display = speakerCheckbox.checked ? "block" : "none";

    speakerCheckbox.addEventListener("change", () => {
      console.log("checkbox is changed");

      textArea.style.display = speakerCheckbox.checked ? "block" : "none";
      
      console.log("checkbox event works");
    });
  }
  
  // Form validation feedback
  if (form && emailField) {
    form.addEventListener("submit", (event) => {
      const emailValue = emailField.value.trim();
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  
      if (!isEmailValid) {
        event.preventDefault();
        alert("Please enter a valid email address.");
        emailField.focus();
      }
    });
  }

  // Smooth scrolling for navigation links (optional enhancement)
  // Fixed by QW: delete the optional enhancement, not functioned and no need for that

  console.log("JavaScript executed after DOM is fully loaded");
});



