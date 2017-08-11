//   @todo

"use strict";

export default class EventHandler {
    constructor(year, day, month) {
        // this._zipData = null, this._hills = null, this._lifts = null, this._patrollers = null, this._difficulty = null;
        this.loadZipData();
        this.loadHills();
        this.loadLifts();
        this.loadPatrollers();
        this.calculateAge(year, month, day);
        this.handlePatientZip();
        this.handleLocation();
        this.handleLesson();
        this.handleNunOther();
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
                    console.log(document.getElementById('patientCity').value);
                    break;
                }
            }
        });
    }

    handleLocation() {
        let locations = document.forms[0].elements['location'];
        locations[0].addEventListener('click', () => {
            document.getElementById('lifts').style.display = 'block';
            document.getElementById('hills').style.display = 'none';
            document.getElementById('whichLift').options.length = 1;
            document.getElementById('whichHill').options.length = 1;
            for (let element of this.lifts) {
                let option = document.createElement('option');
                option.text = element;
                option.value = element;
                document.getElementById('whichLift').appendChild(option);
            }
            document.getElementById('whichLift').addEventListener('change', () => {
                document.getElementById('hillLift').value = document.getElementById('whichLift').options[document.getElementById('whichLift').selectedIndex].text;
                document.getElementById('difficulty').value = null;
            });
        });
        locations[1].addEventListener('click', () => {
            document.getElementById('lifts').style.display = 'none';
            document.getElementById('hills').style.display = 'block';
            document.getElementById('whichLift').options.length = 1;
            document.getElementById('whichHill').options.length = 1;
            for (let element of this.hills) {
                let option = document.createElement('option');
                option.text = element[0];
                option.value = element[1];
                document.getElementById('whichHill').appendChild(option);
            }
            document.getElementById('whichHill').addEventListener('change', () => {
                document.getElementById('hillLift').value = document.getElementById('whichHill').options[document.getElementById('whichHill').selectedIndex].text;
                document.getElementById('difficulty').value = document.getElementById('whichHill').options[document.getElementById('whichHill').selectedIndex].value;
            });
        });
        locations[2].addEventListener('click', () => {
            document.getElementById('lifts').style.display = 'none';
            document.getElementById('hills').style.display = 'none';
        });
    }

    handleLesson() {
        let lesson = document.forms[0].elements['inLesson'];
        lesson[0].addEventListener('change', () => {
            alert("Remember: You must fill out an instructor witness statement form.");
            document.getElementById('instYes').style.visibility = 'visible';
        });
        lesson[1].addEventListener('change', () => {
            document.getElementById('instructor').value = null;
            document.getElementById('instYes').style.visibility = 'hidden';
        });
    }

    handleNunOther() {
        const MAX = 1;
        let other = document.forms[0].elements['numTimes'];
        other[2].addEventListener('change', () => {
            document.getElementById('numOther').style.display = 'block';
        });
        for (let i = 0; i <= MAX; i++) {
            other[i].addEventListener('change', () => {
                document.getElementById('numOther').style.display = 'none';
            });
        }
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