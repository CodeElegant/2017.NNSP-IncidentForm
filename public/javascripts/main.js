//   @todo

"use strict";

class main {
     constructor() {
          let date = new Date();
          this._date = null;
          this._month = null;
          this._day = null;
          this._year = null;
          this._weekday = null;
          this._fullDate = null;
          this.date = date;
          this.month = this.date.getMonth() + 1;
          this.day = this.date.getDate();
          this.year = this.date.getFullYear();
          this.weekday = this.date.getDay();
          this.fullDate = `${this.month}/${this.day}/${this.year}`;
          this.populateDate();
          this.eventHandler = new EventHandler(this.year, this.month, this.day);
          this.prepApp();
     }

     prepApp() {
          document.getElementById('noPrint').style.display = 'none';
          document.getElementById('personalInfo').style.display = 'block';
          document.getElementById('patientHistory').style.display = 'none';
          document.getElementById('locations').style.display = 'none';
          document.getElementById('history').style.display = 'none';
          document.getElementById('equipment').style.display = 'none';
          document.getElementById('incidentDesc').style.display = 'none';
          document.getElementById('conditions').style.display = 'none';
          document.getElementById('injury').style.display = 'none';
          document.getElementById('injuryZone').style.display = 'none';
          document.getElementById('firstAid').style.display = 'none';
          document.getElementById('patrollers').style.display = 'none';
          document.getElementById('transportDestination').style.display = 'none';
          document.getElementById('witness').style.display = 'none';
          document.getElementById('completer').style.display = 'none';
          main.setRequired();
     }

     static setRequired() {
          let required = document.getElementById('mainForm').querySelectorAll('[required]');
          for (let element of required) {
               element.style.backgroundColor = 'yellow';
          }
     }

     populateDate() {
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          document.getElementById('day').value = days[this.weekday];
          document.getElementById('date').value = this.fullDate;
     }

     setDifficulty(value) {
          let difficultyList = ["Easier", "More Difficult", "Most Difficult", "Experts Only"];
          document.getElementById("difficulty").value = difficultyList[value - 1];
     }

     get date() {
          return this._date;
     }

     set date(value) {
          this._date = value;
     }

     get month() {
          return this._month;
     }

     set month(value) {
          this._month = value;
     }

     get day() {
          return this._day;
     }

     set day(value) {
          this._day = value;
     }

     get year() {
          return this._year;
     }

     set year(value) {
          this._year = value;
     }

     get weekday() {
          return this._weekday;
     }

     set weekday(value) {
          this._weekday = value;
     }

     get fullDate() {
          return this._fullDate;
     }

     set fullDate(value) {
          this._fullDate = value;
     }
}

//======================================================================================================================

class EventHandler {
     constructor(year, day, month) {
          this._zipData = null, this._hills = null, this._lifts = null, this._patrollers = null;
          this.loadZipData();
          this.loadHills();
          this.loadLifts();
          this.loadPatrollers();
          this.calculateAge(year, month, day);
          this.handlePatientZip();
     }

     loadZipData() {
          this.performAjax('XHR0', 0, (response) => {
               this.zipData = JSON.parse(response);
          });
     }

     loadHills() {
          this.performAjax('XHR1', 0, (response) => {
               this.hills = JSON.parse(response);
          });
     }

     loadLifts() {
          this.performAjax('XHR2', 0, (response) => {
               this.lifts = JSON.parse(response);
          });
     }

     loadPatrollers() {
          this.performAjax('XHR3', 0, (response) => {
               this.patrollers = JSON.parse(response);
          });
     }

     calculateAge(year, month, day) {
          document.getElementById('dob').addEventListener('blur', () => {
               let dobString = document.getElementById('dob').value;
               let birthDate = new Date(dobString);
               let age = year - birthDate.getFullYear();
               let birthMonth = (month - birthDate.getMonth());
               if (birthMonth < 0 || (birthMonth === 0 && day < birthDate.getDate())) {
                    age--;
               }
               document.getElementById('age').value = age;
          });
     }

     handlePatientZip() {
          document.getElementById('patientZip').addEventListener('blur', () => {
               for (let element of this.zipData) {
                    if (document.getElementById('patientZip').value === element[0]) {
                         document.getElementById('patientCity').value = element[1];
                         document.getElementById('patientState').value = element[2];
                         break;
                    }
               }
          });
     }

     performAjax(requestNum, sendToNode, callback) {
          let bustCache = '?' + new Date().getTime();
          const XHR = new XMLHttpRequest();
          XHR.open('POST', document.url + bustCache, true);
          XHR.setRequestHeader('X-Requested-with', requestNum);
          XHR.send(sendToNode);
          XHR.onload = () => {
               if (XHR.readyState === 4 && XHR.status === 200 && callback) {
                    return callback(XHR.responseText);
               }
          };
     }

     get zipData() {
          return this._zipData;
     }

     set zipData(value) {
          this._zipData = value;
     }

     get lifts() {
          return this._lifts;
     }

     set lifts(value) {
          this._lifts = value;
     }
     get hills() {
          return this._hills;
     }

     set hills(value) {
          this._hills = value;
     }

     get patrollers() {
          return this._patrollers;
     }

     set patrollers(value) {
          this._patrollers = value;
     }
}

window.addEventListener('load', () => {
     new main();
});