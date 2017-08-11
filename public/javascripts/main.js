//   @todo

'use strict';
import EventHandler from './EventHandler.js';

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
        document.getElementById('personalInfo').style.display = 'none';
        document.getElementById('patientHistory').style.display = 'none';
        document.getElementById('locations').style.display = 'none';
        document.getElementById('lifts').style.display = 'none';
        document.getElementById('hills').style.display = 'none';
        document.getElementById('instYes').style.visibility = 'hidden';
        document.getElementById('numOther').style.display = 'none';
        document.getElementById('history').style.display = 'none';
        document.getElementById('equipment').style.display = 'block';
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

/*    setDifficulty(value) {
        let difficultyList = ["Easier", "More Difficult", "Most Difficult", "Experts Only"];
        document.getElementById("difficulty").value = difficultyList[value - 1];
    }*/

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

window.addEventListener('load', () => {
    new main();
});