/**
* Template Name: Yummy - v1.3.0
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

/** 
 * FUNGSI UPLOAD FILE & SCAN PASSPORT
 * 
 * 
*/
document.addEventListener("DOMContentLoaded", () => {
  const dropArea = document.getElementById("drop-area");
  const fileListDiv = document.getElementById("file-list");

  const fileInput = document.querySelector('input[type="file"]');

  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add("active");
  }

  function unhighlight(e) {
    dropArea.classList.remove("active");
  }

  dropArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const files = e.dataTransfer.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    fileInput.files = files;

    fileListDiv.innerHTML = "";

    for (const file of files) {
      const fileItem = document.createElement("div");
      fileItem.textContent = file.name;
      fileListDiv.appendChild(fileItem);

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "100px"; // Sesuaikan ukuran pratinjau gambar
        fileListDiv.appendChild(img);
      }
    }
  }
});


// Function to show notification when image is uploaded successfully
function showNotification() {
  alert('Image uploaded successfully!');
}

// Function to submit the form using AJAX
function submitForm() {
  // Get the form element
  const form = document.querySelector('form');

  // Create a FormData object to send the form data
  const formData = new FormData(form);

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the XMLHttpRequest object
  xhr.open('POST', '/', true);

  // Set the event listener to handle the response
  xhr.onload = function () {
      if (xhr.status === 200) {
          // If the request is successful, parse the JSON response
          const responseData = JSON.parse(xhr.responseText);

          // Update the result section on the page
          const resultSection = document.getElementById('result-section');
          resultSection.innerHTML = '';

          for (const result of responseData) {
              const fileResultDiv = document.createElement('div');
              fileResultDiv.classList.add('file-result');

              const mrzCodeHeading = document.createElement('h2');
              mrzCodeHeading.textContent = `MRZ Code for ${result.filename}:`;

              const mrzCodeParagraph = document.createElement('p');
              mrzCodeParagraph.textContent = result.code;

              fileResultDiv.appendChild(mrzCodeHeading);
              fileResultDiv.appendChild(mrzCodeParagraph);

              if (result.fields) {
                  const mrzFieldsHeading = document.createElement('h2');
                  mrzFieldsHeading.textContent = 'MRZ Fields:';

                  fileResultDiv.appendChild(mrzFieldsHeading);

                  for (const [key, value] of Object.entries(result.fields)) {
                      const fieldParagraph = document.createElement('p');
                      fieldParagraph.textContent = `${key}: ${value}`;
                      fileResultDiv.appendChild(fieldParagraph);
                  }
              }

              resultSection.appendChild(fileResultDiv);
          }
      } else {
          // If the request fails, show an error message
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = 'Failed to detect MRZ code. Please try again.';
      }
  };

  // Set the event listener to handle errors
  xhr.onerror = function () {
      // Show an error message
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'An error occurred. Please try again later.';
  };

  // Send the form data
  xhr.send(formData);
}

// Add event listener to the "Upload" button
const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function () {
  showNotification();
});

// Add event listener to the "Detect" button
const detectButton = document.getElementById('detect-button');
detectButton.addEventListener('click', function () {
  submitForm();
});
