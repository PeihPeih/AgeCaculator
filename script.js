const currentTime = new Date();
const inputs = document.querySelectorAll(".input");
const submitButton = document.querySelector(".icon");

const currentYear = currentTime.getFullYear();
const currentMonth = currentTime.getMonth() + 1;
const currentDay = currentTime.getDate();

submitButton.addEventListener("click", submit);

function submit() {
  CheckValidation();
  if (!document.querySelector(".errorText")) {
    Caculate();
  }
}

CheckValidation = () => {
  inputs.forEach((input) => {
    checkInput(input);
  });
};

checkInput = (input) => {
  if (emptyInput(input)) {
    setError(input);
    input.parentElement.querySelector(".errorText").innerHTML =
      "This field is required";
  } else {
    const year = parseInt(document.querySelector("#year").value.trim());
    const month = parseInt(document.querySelector("#month").value.trim());
    const day = parseInt(document.querySelector("#day").value.trim());
    if (input.id === "day") {
      if (!validDay(day, month, year)) {
        setError(input);
        input.parentElement.querySelector(".errorText").innerHTML =
          "Must be a valid day";
      } else removeError(input);
    } else if (input.id === "month") {
      if (!validMonth(month, year)) {
        setError(input);
        input.parentElement.querySelector(".errorText").innerHTML =
          "Must be a valid month";
      } else removeError(input);
    } else if (input.id === "year") {
      if (!validYear(year)) {
        setError(input);
        input.parentElement.querySelector(".errorText").innerHTML =
          "Must be in the past";
      } else removeError(input);
    }
  }
};

emptyInput = (input) => {
  return input.value.trim() === "" ? true : false;
};

validDay = (day, month, year) => {
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (day > 29) return false;
    } else {
      if (day > 28) return false;
    }
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    if (day > 30) return false;
  } else if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    if (day > 31) return false;
  }
  if (year === currentYear && month === currentMonth && day > currentDay) {
    return false;
  }
  return true;
};

validMonth = (month, year) => {
  if (month < 1 || month > 12) {
    return false;
  }
  if (year === currentYear && month > currentMonth) {
    return false;
  }
  return true;
};

validYear = (year) => {
  if (year > currentYear) {
    return false;
  }
  return true;
};

setError = (input) => {
  if (!input.parentElement.querySelector(".errorText")) {
    input.parentElement.querySelector(".errorText");
    const errorNode = document.createElement("div");
    const errorText = document.createTextNode("");
    errorNode.appendChild(errorText);
    errorNode.classList.add("errorText");
    input.parentElement.appendChild(errorNode);
  }
  input.parentElement.classList.add("error");
};

removeError = (input) => {
  if (input.parentElement.querySelector(".errorText")) {
    const errorNode = input.parentElement.querySelector(".errorText");
    input.parentElement.removeChild(errorNode);
  }
};

Caculate = () => {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => error.classList.remove("error"));

  const inputYear = parseInt(document.querySelector("#year").value.trim());
  const inputMonth = parseInt(document.querySelector("#month").value.trim());
  const inputDay = parseInt(document.querySelector("#day").value.trim());

  let diffDay, diffMonth, diffYear;
  let carry = 0;
  if (inputDay <= currentDay) {
    diffDay = currentDay - inputDay;
  } else {
    diffDay = currentDay + dayOfMonth(currentMonth - 1) - inputDay;
    carry = 1;
  }
  if (inputMonth <= currentMonth - carry) {
    diffMonth = currentMonth - carry - inputMonth;
    carry = 0;
  } else {
    diffMonth = currentMonth + monthOfYear(currentYear - carry) - inputMonth;
    carry = 1;
  }
  diffYear = currentYear - carry - inputYear;

  document.querySelector(".years").innerHTML = diffYear;
  document.querySelector(".months").innerHTML = diffMonth;
  document.querySelector(".days").innerHTML = diffDay;

  document.querySelector(".display").classList.add("OK");
};

dayOfMonth = (month, year) => {
  switch (month) {
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      }
      return 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
    default:
      return 31;
      break;
  }
};

monthOfYear = (year) => 12;
