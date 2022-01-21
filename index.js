//zmienne podstawowe
const nameInput = document.querySelector("#nameInput");
const nameInputR = document.querySelector("#nameInputR");
const surnameInput = document.querySelector("#surnameInput");
const numberInput = document.querySelector("#numberInput");
const sexInput = document.querySelector("#sexInput");
const vaccinnedInput = () => {
  return document.querySelector("input[name='radioVaccined']:checked");
};
const checkStatusInput = document.querySelector("#checkStatiut");
const myButt = document.querySelector("#myButton");
var isInfected = false;
var daysToQuarantine = 0;

//zmienne datowe
const dateContact = document.querySelector("#firstContactDate");
const dateSymptop = document.querySelector("#firstSumptomDate");
const dateTest = document.querySelector("#testsDate");
const actualDate = document.querySelector("#actualDate");

//zmienne do obslugi daty testu
const numberOfDay = (obj, numberOfDay) => {
  let myDate = null;
  let multiplicateDays = 0;
  let returnFullDate = null;
  switch (numberOfDay) {
    case 0: {
      multiplicateDays = 0;
      myDate = new Date(obj.valueAsNumber + multiplicateDays);

      myDate.getDate() <= 9
        ? (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            "0" +
            myDate.getDate())
        : (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            myDate.getDate());
      break;
    }
    case 1: {
      multiplicateDays = 86400000;
      myDate = new Date(obj.valueAsNumber + multiplicateDays);

      myDate.getDate() <= 9
        ? (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            "0" +
            myDate.getDate())
        : (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            myDate.getDate());
      break;
    }
    case 10: {
      multiplicateDays = 864000000;
      myDate = new Date(obj.valueAsNumber + multiplicateDays);

      myDate.getDate() <= 9
        ? (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            "0" +
            myDate.getDate())
        : (returnFullDate =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            myDate.getDate());
      break;
    }
  }

  return returnFullDate;
};

//Sprawdzenie poprawnosci name
function nameFocus() {
  const regex = new RegExp(/^[A-Za-z]{3,18}$/);

  if (
    nameInput.value.length >= 3 &&
    nameInput.value.length <= 18 &&
    nameInput.value.match(regex)
  ) {
    nameInput.classList.remove("wrongInput");
    nameInput.classList.add("correctInput");
    myButt.disabled = false;
  } else {
    nameInput.classList.remove("correctInput");
    nameInput.classList.add("wrongInput");
    myButt.disabled = true;
  }
}

//Sprawdzenie poprawnosci surname
function surnameFocus() {
  const regex = new RegExp(/^[A-Za-z]{3,18}$/);

  if (
    surnameInput.value.length >= 3 &&
    surnameInput.value.length <= 18 &&
    surnameInput.value.match(regex)
  ) {
    surnameInput.classList.remove("wrongInput");
    surnameInput.classList.add("correctInput");
    myButt.disabled = false;
  } else {
    surnameInput.classList.remove("correctInput");
    surnameInput.classList.add("wrongInput");
    myButt.disabled = true;
  }
}

//Sprawdzenie poprawnosci numeru
function numberFocus() {
  if (numberInput.value.length == 9) {
    numberInput.classList.remove("wrongInput");
    numberInput.classList.add("correctInput");
    myButt.disabled = false;
  } else {
    numberInput.classList.remove("correctInput");
    numberInput.classList.add("wrongInput");
    myButt.disabled = true;
  }
}

// Ustawienie zakres w dacie symptomu 0 - aktualna data, 10 - 10 dni(okres inkubacji)
function contactDateFocus() {
  if (dateContact.value != 0) {
    dateSymptop.setAttribute("min", numberOfDay(dateContact, 0));
    dateSymptop.setAttribute("max", numberOfDay(dateContact, 10));
    actualDate.setAttribute("min", numberOfDay(dateContact, 0));
    dateSymptop.disabled = false;
    dateContact.classList.remove("wrongInput");
    dateContact.classList.add("correctInput");
  } else {
    dateContact.classList.remove("correctInput");
    dateContact.classList.add("wrongInput");
  }
}

// Ustawienie zakresów w dacie testu 0 - aktualna data, 1 - nastepny dzien
function sumptomDateFocus() {
  if (
    dateSymptop.value != 0 &&
    numberOfDay(dateSymptop, 0) >= numberOfDay(dateContact, 0)
  ) {
    dateTest.setAttribute("min", numberOfDay(dateSymptop, 0));
    dateTest.setAttribute("max", numberOfDay(dateSymptop, 1));
    actualDate.setAttribute("min", numberOfDay(dateSymptop, 0));
    dateTest.disabled = false;
    dateSymptop.classList.remove("wrongInput");
    dateSymptop.classList.add("correctInput");
  } else {
    dateSymptop.classList.remove("correctInput");
    dateSymptop.classList.add("wrongInput");
    myButt.disabled = true;
  }
}

function infected() {
  if (numberOfDay(actualDate, 0) <= numberOfDay(dateContact, 10)) {
    isInfected = true;
    daysToQuarantine = numberOfDay(actualDate, 10);
  } else isInfected = false;
}

// Ustawienie onBlur i poprawnego sprawdzenia daty
function testDateFocus() {
  if (
    numberOfDay.value != 0 &&
    numberOfDay(dateTest, 0) >= numberOfDay(dateSymptop, 0)
  ) {
    dateTest.classList.remove("wrongInput");
    dateTest.classList.add("correctInput");
    actualDate.setAttribute("min", numberOfDay(dateTest, 0));
    myButt.disabled = false;
  } else {
    dateTest.classList.remove("correctInput");
    dateTest.classList.add("wrongInput");
    myButt.disabled = true;
  }
}

//// Ustawienie onBlur i poprawnego sprawdzenia daty
function actualDateFocus() {
  if (
    actualDate.value != 0 &&
    numberOfDay(actualDate, 0) >= numberOfDay(dateTest, 0)
  ) {
    actualDate.classList.add("correctInput");
    actualDate.classList.remove("wrongInput");
  } else {
    actualDate.classList.remove("correctInput");
    actualDate.classList.add("wrongInput");
  }
}
//Funkca do zwiekszania pierwszej litery(potrzebne do name oraz surname)
function firstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

//wyswietlenie wyniku
myButt.addEventListener("click", function () {
  infected();
  if (
    nameInput.classList.contains("correctInput") &&
    surnameInput.classList.contains("correctInput") &&
    numberInput.classList.contains("correctInput") &&
    dateContact.classList.contains("correctInput") &&
    dateSymptop.classList.contains("correctInput") &&
    dateTest.classList.contains("correctInput") &&
    actualDate.classList.contains("correctInput") &&
    checkStatusInput.checked == true
  ) {
    //alert("Dobrze!");
    window.sessionStorage.setItem("name", firstLetter(nameInput.value));
    window.sessionStorage.setItem("surname", firstLetter(surnameInput.value));
    window.sessionStorage.setItem("number", numberInput.value);
    window.sessionStorage.setItem("sex", sexInput.value);
    window.sessionStorage.setItem("vaccinated", vaccinnedInput().value);
    window.sessionStorage.setItem("dateContact", dateContact.value);
    window.sessionStorage.setItem("dateSymptom", dateSymptop.value);
    window.sessionStorage.setItem("dateTest", dateTest.value);
    window.sessionStorage.setItem("dateActual", actualDate.value);
    window.sessionStorage.setItem("infected", isInfected);
    window.sessionStorage.setItem("timeToQuarantine", daysToQuarantine);
    window.open("./report.html");
  } else {
    alert(
      "Niektóre pola są puste lub źle uzupełnione popraw to aby dowiedzieć się o swoim wyniku."
    );
  }
});
