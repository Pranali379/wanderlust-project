// Bootstrap validation (KEEP THIS)
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


// ⭐ Star Rating Logic (ADD THIS BELOW)
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating-input");

if (stars.length > 0) {
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      let value = index + 1;

      ratingInput.value = value;

      stars.forEach(s => {
        s.classList.remove("fa-solid", "active");
        s.classList.add("fa-regular");
      });

      for (let i = 0; i < value; i++) {
        stars[i].classList.remove("fa-regular");
        stars[i].classList.add("fa-solid", "active");
      }
    });
  });
}