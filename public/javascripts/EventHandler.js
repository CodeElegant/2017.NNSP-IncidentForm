//   @todo

"use strict";

export default class EventHandler {
    constructor(year, day, month) {
        this._zipData = null, this._hills = null, this._lifts = null, this._patrollers = null;
        this.loadZipData();
        this.loadHills();
        // this.loadLifts();
        // this.loadPatrollers();
        this.calculateAge(year, month, day);
        // this.handlePatientZip();
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