const myName = document.querySelector("#name");
const mySurname = document.querySelector("#surname");
const myNumber = document.querySelector("#number");
const mySex = document.querySelector("#sex");
const myVaccinated = document.querySelector("#vaccinated");
const myDateContact = document.querySelector("#dateContact");
const myDateSymptom = document.querySelector("#dateSymptom");
const myDateTest = document.querySelector("#dateTest");
const myDateActual = document.querySelector("#dateActual");
const result = document.querySelector("#result");
const myInfected = window.sessionStorage.getItem("infected");
const myTimeToQuarantine = window.sessionStorage.getItem("timeToQuarantine");

myName.value = window.sessionStorage.getItem("name");
mySurname.value = window.sessionStorage.getItem("surname");
myNumber.value = window.sessionStorage.getItem("number");
mySex.value = window.sessionStorage.getItem("sex");
myVaccinated.value = window.sessionStorage.getItem("vaccinated");
myDateContact.value = window.sessionStorage.getItem("dateContact");
myDateSymptom.value = window.sessionStorage.getItem("dateSymptom");
myDateTest.value = window.sessionStorage.getItem("dateTest");
myDateActual.value = window.sessionStorage.getItem("dateActual");

if (myInfected == "true") {
  result.innerHTML = "Masz kwarantanne do " + myTimeToQuarantine;
} else {
  result.innerHTML = "Nie masz kwarantanny";
}
