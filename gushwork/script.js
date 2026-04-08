// ================= STICKY HEADER FUNCTIONALITY =================
/**
 * Sticky Header Manager
 * Shows/hides sticky header based on scroll position
 * Implements smooth transitions and animations
 */

const stickyHeader = document.getElementById("stickyHeader");
const mainHeader = document.getElementById("mainHeader");
let lastScrollPosition = 0;

/**
 * Toggle sticky header visibility on scroll
 * Shows sticky header when scrolling beyond main header
 * Hides when scrolling back to top
 */
function handleStickyHeader() {
  const currentScroll = window.scrollY;

  // Show sticky header when scrolled past main header height (approximately 80px)
  if (currentScroll > 100) {
    stickyHeader.classList.add("visible");
  } else {
    stickyHeader.classList.remove("visible");
  }

  lastScrollPosition = currentScroll;
}

// Listen for scroll events to trigger sticky header
window.addEventListener("scroll", handleStickyHeader, { passive: true });

// ================= IMAGE CAROUSEL FUNCTIONALITY =================
/**
 * Carousel Manager
 * Handles main image display, thumbnail selection, and zoom preview
 */

const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const zoomPreview = document.getElementById("zoomPreview");
const zoomContainer = document.querySelector(".zoom-container");

// Array of image URLs for carousel
const images = [
  "https://picsum.photos/id/1/500/400",
  "https://picsum.photos/id/2/500/400",
  "https://picsum.photos/id/3/500/400",
  "https://picsum.photos/id/4/500/400",
  "https://picsum.photos/id/5/500/400",
  "https://picsum.photos/id/6/500/400",
];

let currentImageIndex = 0;

/**
 * Update main carousel image and active thumbnail
 * @param {number} index - Index of image to display
 */
function updateCarouselImage(index) {
  // Ensure index is within valid range
  currentImageIndex = (index + images.length) % images.length;

  // Update main image with smooth transition
  mainImage.style.opacity = "0.8";
  mainImage.src = images[currentImageIndex];
  mainImage.style.opacity = "1";

  // Update thumbnail active state
  thumbs.forEach((thumb) => thumb.classList.remove("active"));
  thumbs[currentImageIndex].classList.add("active");
}

// Next button click handler
nextBtn.addEventListener("click", () => {
  updateCarouselImage(currentImageIndex + 1);
});

// Previous button click handler
prevBtn.addEventListener("click", () => {
  updateCarouselImage(currentImageIndex - 1);
});

// Thumbnail click handler - allow direct image selection
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateCarouselImage(index);
  });
});

// ================= ZOOM PREVIEW FUNCTIONALITY =================
/**
 * Image Zoom Preview
 * Shows zoomed preview box when hovering over carousel image
 * Allows users to see details of products
 */

const carouselImage = document.querySelector(".carousel-image");

/**
 * Handle mouse movement for zoom preview
 * Updates zoom preview position based on mouse coordinates
 */
function handleZoomPreview(event) {
  const rect = zoomContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Calculate zoom preview position
  let previewX = x - 50; // Preview is 100x100, so center it
  let previewY = y - 50;

  // Constrain preview to image boundaries
  previewX = Math.max(0, Math.min(previewX, rect.width - 100));
  previewY = Math.max(0, Math.min(previewY, rect.height - 100));

  // Update zoom preview position
  zoomPreview.style.left = previewX + "px";
  zoomPreview.style.top = previewY + "px";

  // Update main image to show zoomed area
  const zoomLevel = 2; // 2x zoom
  const offsetX = (previewX / rect.width) * 100;
  const offsetY = (previewY / rect.height) * 100;

  carouselImage.style.transformOrigin = offsetX + "% " + offsetY + "%";
  carouselImage.style.transform = `scale(${zoomLevel})`;
}

/**
 * Reset zoom on mouse leave
 */
function resetZoom() {
  carouselImage.style.transform = "scale(1)";
  carouselImage.style.transformOrigin = "center";
}

// Add hover event listeners for zoom effect
zoomContainer.addEventListener("mousemove", handleZoomPreview);
zoomContainer.addEventListener("mouseleave", resetZoom);

// ================= FAQ ACCORDION FUNCTIONALITY =================
/**
 * FAQ Accordion Manager
 * Allows users to expand/collapse FAQ items
 * Only one item can be open at a time (optional)
 */

const faqQuestions = document.querySelectorAll(".faq-question");

/**
 * Toggle FAQ item open/closed state
 * Adds animation for smooth transitions
 */
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqBox = question.parentElement;

    // Toggle active class
    faqBox.classList.toggle("active");

    // Optional: Close other FAQ items
    // faqQuestions.forEach((q) => {
    //   if (q !== question) {
    //     q.parentElement.classList.remove("active");
    //   }
    // });
  });
});

// ================= APPLICATIONS SLIDER FUNCTIONALITY =================
/**
 * Applications Slider Manager
 * Horizontal scrolling slider for application cards
 * Uses smooth scroll behavior
 */

const slider = document.getElementById("slider");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

/**
 * Scroll slider left - shows previous applications
 */
leftBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -320,
    behavior: "smooth",
  });
});

/**
 * Scroll slider right - shows next applications
 */
rightBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: 320,
    behavior: "smooth",
  });
});

// ================= PROCESS TABS FUNCTIONALITY =================
/**
 * Process Tabs Manager
 * Switches between different manufacturing process steps
 * Updates text and images based on selected tab
 */

const tabs = document.querySelectorAll(".tab");
const processTitle = document.getElementById("processTitle");
const processDescription = document.getElementById("processDescription");

// Process data for each manufacturing step
const processData = [
  {
    title: "High-Grade Raw Material Selection",
    description:
      "PE100 grade virgin resin is carefully selected and prepared. Optimal molecular weight distribution ensures superior performance and consistency.",
    image: "https://picsum.photos/id/1011/500/300",
  },
  {
    title: "Advanced Extrusion Process",
    description:
      "Material is heated and extruded through precision dies. Advanced extrusion technology ensures consistent diameter and wall thickness throughout.",
    image: "https://picsum.photos/id/1012/500/300",
  },
  {
    title: "Cooling and Sizing",
    description:
      "Hot pipes pass through vacuum sizing tanks that ensure precise outer diameter. Internal pressure maintains perfect roundness and uniformity.",
    image: "https://picsum.photos/id/1013/500/300",
  },
  {
    title: "Final Sizing and Calibration",
    description:
      "Pipes are carefully sized and calibrated to meet exact specifications. Dimensional accuracy is verified at multiple points in the process.",
    image: "https://picsum.photos/id/1015/500/300",
  },
  {
    title: "Quality Control Testing",
    description:
      "Comprehensive testing ensures all pipes meet international standards. Pressure testing, dimension checks, and material analysis are performed.",
    image: "https://picsum.photos/id/1016/500/300",
  },
  {
    title: "Marking and Identification",
    description:
      "Pipes are marked with specifications, certifications, and batch information. Clear labeling ensures proper identification and traceability.",
    image: "https://picsum.photos/id/1017/500/300",
  },
  {
    title: "Cutting to Length",
    description:
      "Pipes are precisely cut to specified lengths. Computer-controlled cutting ensures accurate dimensions for all orders.",
    image: "https://picsum.photos/id/1018/500/300",
  },
  {
    title: "Professional Packaging",
    description:
      "Finished pipes are carefully packaged to prevent damage during transportation. Protective wrapping and secure bundling ensure safe delivery.",
    image: "https://picsum.photos/id/1019/500/300",
  },
];

/**
 * Handle tab click and update process information
 */
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove("active"));

    // Add active class to clicked tab
    tab.classList.add("active");

    // Update process information
    const data = processData[index];
    processTitle.textContent = data.title;
    processDescription.textContent = data.description;
    document.getElementById("procMain").src = data.image;
  });
});

// ================= PROCESS CAROUSEL FUNCTIONALITY =================
/**
 * Process Carousel Manager
 * Handles navigation through process step images
 */

const procImages = [
  "https://picsum.photos/id/1011/500/300",
  "https://picsum.photos/id/1012/500/300",
  "https://picsum.photos/id/1013/500/300",
  "https://picsum.photos/id/1015/500/300",
];

let procIndex = 0;
const procMain = document.getElementById("procMain");
const procPrev = document.getElementById("procPrev");
const procNext = document.getElementById("procNext");

/**
 * Update process carousel image
 * @param {number} index - Index of image to display
 */
function updateProcImage(index) {
  procIndex = (index + procImages.length) % procImages.length;
  procMain.src = procImages[procIndex];
}

// Process carousel navigation
procNext.addEventListener("click", () => {
  updateProcImage(procIndex + 1);
});

procPrev.addEventListener("click", () => {
  updateProcImage(procIndex - 1);
});

// ================= TESTIMONIALS SLIDER FUNCTIONALITY =================
/**
 * Testimonials Slider Manager
 * Horizontal scrolling slider for customer testimonials
 * Smooth navigation with arrow buttons
 */

const testSlider = document.getElementById("testSlider");
const testLeft = document.getElementById("testLeft");
const testRight = document.getElementById("testRight");

/**
 * Scroll testimonial slider left
 */
testLeft.addEventListener("click", () => {
  testSlider.scrollBy({
    left: -350,
    behavior: "smooth",
  });
});

/**
 * Scroll testimonial slider right
 */
testRight.addEventListener("click", () => {
  testSlider.scrollBy({
    left: 350,
    behavior: "smooth",
  });
});

// ================= KEYBOARD NAVIGATION =================
/**
 * Keyboard Navigation Support
 * Allows accessibility with keyboard-only users
 */

/**
 * Handle keyboard events for navigation
 */
document.addEventListener("keydown", (e) => {
  // Arrow left on carousel
  if (e.key === "ArrowLeft") {
    const activeElement = document.activeElement;
    if (activeElement.closest(".carousel") || activeElement === prevBtn) {
      prevBtn.click();
    }
  }

  // Arrow right on carousel
  if (e.key === "ArrowRight") {
    const activeElement = document.activeElement;
    if (activeElement.closest(".carousel") || activeElement === nextBtn) {
      nextBtn.click();
    }
  }

  // Enter on FAQ questions
  if (e.key === "Enter") {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains("faq-question")) {
      activeElement.click();
    }
  }
});

// ================= INTERSECTION OBSERVER FOR LAZY ANIMATIONS =================
/**
 * Intersection Observer
 * Triggers animations when elements come into view
 * Improves performance for long pages
 */

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all feature cards for lazy animation
document.querySelectorAll(".feature-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.6s ease-out";
  observer.observe(card);
});

// ================= SMOOTH SCROLL BEHAVIOR =================
/**
 * Smooth Scroll Navigation
 * Smooth scrolling to anchors on same page
 */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Don't smooth scroll for empty hrefs or data attributes
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ================= FORM SUBMISSION HANDLER =================
/**
 * Form Submission Manager
 * Handles form submissions with validation
 */

const contactForm = document.querySelector(".cta-form");
const emailForm = document.querySelector(".faq-cta .cta-form");

/**
 * Validate form inputs
 * @param {HTMLElement} form - Form element to validate
 * @returns {boolean} - True if form is valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll("input, select");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }

    // Email validation
    if (
      input.type === "email" &&
      input.value &&
      !input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      input.style.borderColor = "#ef4444";
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Handle contact form submission
 */
if (contactForm) {
  const submitBtn = contactForm.querySelector("button");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (validateForm(contactForm)) {
      // Show success message
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "✓ Request Sent!";
      submitBtn.style.background = "#10b981";

      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
      }, 2000);
    }
  });
}

/**
 * Handle email catalogue request
 */
if (emailForm) {
  const submitBtn = emailForm.querySelector("button");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (validateForm(emailForm)) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "✓ Catalogue Sent!";
      submitBtn.style.background = "#10b981";

      setTimeout(() => {
        emailForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
      }, 2000);
    }
  });
}

// ================= RESPONSIVE BEHAVIOR =================
/**
 * Handle responsive behavior on window resize
 */

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Adjust carousel height for mobile
    const carousel = document.querySelector(".carousel-image");
    if (window.innerWidth < 768) {
      carousel.style.height = "250px";
    } else {
      carousel.style.height = "350px";
    }
  }, 250);
});

// ================= PERFORMANCE OPTIMIZATION =================
/**
 * Preload images for better performance
 */

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

// Preload carousel images
images.forEach((url) => preloadImage(url));

// ================= INITIALIZATION =================
/**
 * Page Initialization
 * Runs when DOM is fully loaded
 */

document.addEventListener("DOMContentLoaded", () => {
  // Log initialization
  console.log("✓ Mangalam HDPE Pipes website loaded successfully");
  console.log("✓ All interactive features initialized");

  // Add loading state to buttons
  document.querySelectorAll(".btn.primary").forEach((btn) => {
    btn.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)";
    });

    btn.addEventListener("mouseup", function () {
      this.style.transform = "";
    });
  });
});

// ================= ERROR HANDLING =================
/**
 * Global error handler
 */

window.addEventListener("error", (e) => {
  console.error("Error occurred:", e.message);
  // Could send error logs to server for monitoring
});

// ================= SCROLL-TO-TOP BUTTON =================
/**
 * Optional: Scroll to top button functionality
 * Creates a scroll-to-top button for better UX on long pages
 */

function createScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #1d4ed8;
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 99;
    font-size: 18px;
    font-weight: bold;
  `;

  document.body.appendChild(scrollBtn);

  /**
   * Show/hide scroll to top button based on scroll position
   */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }
  });

  /**
   * Handle scroll to top click
   */
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Uncomment to enable scroll-to-top button
// createScrollToTopButton();
