// wrap all the js codes inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Lightbox functionality
  const meetBtn = document.getElementById("meetBtn");
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("close-btn");

  // hamburger menu
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbar = document.getElementById("navbar");

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
  console.log({ meetBtn, lightbox, closeBtn });

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
  // Accessibility: Make sections focusable // Deleted by QW: this function is redundant

  // Added by QW: focus section after clicking the link
  const asideLinks = document.querySelectorAll("aside a[href^='#']");
  console.log(asideLinks);
  
  asideLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").substring(1);
      console.log("targeId:", targetId);
      
      const targetSection = document.getElementById(targetId);
      console.log("targetSection: ", targetSection);
      
      if (targetSection) {
        targetSection.focus();
      }
    });
  });
  

// "Schedule a Call" page
  const textArea = document.getElementById("textarea-div");
  const speakerCheckbox = document.getElementById("check-2");

  const form = document.querySelector("form");

  console.log({ textArea, speakerCheckbox });

  // Fixed by QW: the check box event is now functioning
  if (speakerCheckbox && textArea) {
    textArea.style.display = speakerCheckbox.checked ? "block" : "none";

    speakerCheckbox.addEventListener("change", () => {
      console.log("checkbox is changed");

      textArea.style.display = speakerCheckbox.checked ? "block" : "none";
      
      console.log("checkbox event works");
    });
  }
  
  // Added by QW: Form validation feedback
  const businessNameField = document.getElementById("businessName");
  const phoneField = document.getElementById("phoneNum");
  const emailField = document.getElementById("email");

  const businessNameError = document.getElementById("name-error");
  const phoneError = document.getElementById("phone-error");
  const emailError = document.getElementById("email-error");

  const submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", () => {
      let isValid = true;

      // business name validation
      if (!businessNameField.ariaValueMax.trim()) {
        businessNameError.textContent = "Please enter a valid business name.";
        businessNameError.style.display = "inline-block";
        isValid = false;
      } else {
        businessNameError.style.display = "none";
      }

      // Phone number validation
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneField.value.trim()) {
        phoneError.textContent = "Phone number is required.";
        phoneError.style.display = "inline-block";
        isValid = false;
      } else if (!phonePattern.test(phoneField.value.trim())) {
        phoneError.textContent = "Phone number must be in the format 613-123-1234.";
        phoneError.style.display = "inline-block";
        isValid = false;
      } else {
        phoneError.style.display = "none";
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim()) {
        emailError.textContent = "Email address is required.";
        emailError.style.display = "inline-block";
        isValid = false;
      } else if (!emailPattern.test(emailField.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "inline-block";
        isValid = false;
      } else {
        emailError.style.display = "none";
      }

    });
  }

  // Added by QW: switch image function
  const switchImage = document.getElementById("switch-img");
  const switchBtn = document.getElementById("switch-btn");

  let isOn = false;

  switchBtn.addEventListener("click", () => {
    isOn = !isOn;
    console.log("image button is clicked, is on: ", isOn);

    if (isOn) {
      switchImage.src = "./images/toggle-on.png";
      switchImage.alt = "Switch is on, receiving emails";
      switchBtn.setAttribute("aria-pressed", true);
    } else {
      switchImage.src = "./images/toggle-off.png";
      switchImage.alt = "Switch is off, not receiving emails";
      switchBtn.setAttribute("aria-pressed", false);
    }
  });

  // Smooth scrolling for navigation links (optional enhancement)
  // Deleted by QW: delete the optional enhancement, not functioned and no need for that

  console.log("JavaScript executed after DOM is fully loaded");
});



