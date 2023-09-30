document.addEventListener("DOMContentLoaded", () => {
  const input1 = document.querySelector("#phone-1");
  window.intlTelInput(input1, {
    separateDialCode: true,
    showFlags: false,
    preferredCountries: ["pl"],
    autoPlaceholder: "off",
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
  });

  const input2 = document.querySelector("#phone-2");
  window.intlTelInput(input2, {
    separateDialCode: true,
    showFlags: false,
    preferredCountries: ["pl"],
    autoPlaceholder: "off",
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
  });

  //slider
  new Swiper(".swiper", {
    pagination: {
      speed: 800,
      spaceBetween: 30,
      slidesPerView: 1,
      el: ".slider__pagination",
      clickable: true,
    },
  });

  //menu
  document.addEventListener("click", function (e) {
    if (e.target.closest(".icon-menu")) {
      document.documentElement.classList.toggle("menu-open");
    }
  });

  //form validation
  const forms = document.querySelectorAll("[data-form]");

  function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    if (small === null) {
      const newFormControl = formControl.parentElement;
      newFormControl.className = "form__line error";
      const newSmall = newFormControl.querySelector("small");
      newSmall.innerText = message;
    } else {
      formControl.className = "form__line error";
      small.innerText = message;
    }
  }

  function showSucces(input) {
    const formControl = input.closest(".form__line");
    formControl.classList.add("success");
    formControl.classList.remove("error");
  }

  function checkEmail(input) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSucces(input);
    } else {
      showError(input, "Email is not invalid");
    }
  }

  function checkPhone(input) {
    const re = /^[0-9]{10}$/;
    if (re.test(input.value.trim())) {
      showSucces(input);
    } else {
      showError(input, "Phone number is not valid. It should be 10 digits.");
    }
  }

  function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
      console.log(input);
      if (input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSucces(input);
      }
    });
  }

  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be les than ${max} characters`
      );
    } else {
      showSucces(input);
    }
  }

  function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
  }

  function validateForm(form) {
    const firstName = form.querySelector("[data-firstname]");
    const lastName = form.querySelector("[data-lastname]");
    const email = form.querySelector("[data-email]");
    const tel = form.querySelector("[data-tel]");

    checkRequired([firstName, lastName, email, tel]);
    checkLength(firstName, 3, 15);
    checkLength(lastName, 3, 15);
    checkEmail(email);
    checkPhone(tel);
  }

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      validateForm(form);
    });
  });

  //range
  const $range = $(".js-range-slider");
  const min = 1100;
  const max = 550000;
  
  $range.ionRangeSlider({
    skin: "big",
    type: "single",
    min: min,
    max: max,
    onStart: function (data) {
      addMarks(data.slider);
    },
    onChange: function (data) {
      const value = data.from * 7; // Multiply the value by 7
      $("#value").text(value + " PLN");
    },
  });
  

  function convertToPercent(num) {
    var percent = ((num - min) / (max - min)) * 100;

    return percent;
  }

  function addMarks($slider) {
    var html = "";
    var left = 0;
    var i;

    for (i = 0; i < marks.length; i++) {
      left = convertToPercent(marks[i]);
      html +=
        '<span class="mark" style="left: ' +
        left +
        '%">' +
        marks[i] +
        "</span>";
    }

    $slider.append(html);
  }
});
