//   @todo

"use strict";

export default class EventHandler {
    constructor(year, day, month) {
        this.loadZipData();
        this.loadHills();
        this.loadLifts();
        this.loadPatrollers();
        this.calculateAge(year, month, day);
        this.handlePatientZip();
        this.handleLocation();
        this.handleLesson();
        this.handleNumOther();
        this.setEquipOther();
        this.setDins();
        this.handleRental();
        this.handleHelmet();
        this.handleVideo();
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
        document.getElementById('instYes').style.visibility = 'hidden';
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

    handleNumOther() {
        document.getElementById('numOther').style.display = 'none';
        const OTHER = 2;
        let other = document.forms[0].elements['numTimes'];
        other[OTHER].addEventListener('change', () => {
            document.getElementById('numOther').style.display = 'block';
        });
        for (let i = 0; i < OTHER; i++) {
            other[i].addEventListener('change', () => {
                document.getElementById('numOther').style.display = 'none';
            });
        }
    }

    setEquipOther() {
        document.getElementById("otherEquipYes").style.visibility = "hidden";
        const OTHER = 3;
        let other = document.forms[0].elements["equipmentType"];
        other[OTHER].addEventListener('click', () => {
            document.getElementById("otherEquipYes").style.visibility = "visible";
        });
        other[OTHER].addEventListener('click', () => {
            document.getElementById("otherEquipYes").style.visibility = "visible";
        });
        for (let i = 0; i < OTHER; i++) {
            other[i].addEventListener('change', () => {
                document.getElementById("otherEquipYes").style.visibility = "hidden";
            });
        }
    }

    setDins() {
        document.getElementById("leftToeDin").style.display = "none";
        document.getElementById("leftHeelDin").style.display = "none";
        document.getElementById("rightToeDin").style.display = "none";
        document.getElementById("rightHeelDin").style.display = "none";
        document.getElementById("equipAlpine").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.display = "block";
            document.getElementById("leftHeelDin").style.display = "block";
            document.getElementById("rightToeDin").style.display = "block";
            document.getElementById("rightHeelDin").style.display = "block";
        });
        document.getElementById("equipNordic").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.display = "none";
            document.getElementById("leftHeelDin").style.display = "none";
            document.getElementById("rightToeDin").style.display = "none";
            document.getElementById("rightHeelDin").style.display = "none";
        });
        document.getElementById("equipSnowboard").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.display = "none";
            document.getElementById("leftHeelDin").style.display = "none";
            document.getElementById("rightToeDin").style.display = "none";
            document.getElementById("rightHeelDin").style.display = "none";
        });
        document.getElementById("equipOther").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.display = "none";
            document.getElementById("leftHeelDin").style.display = "none";
            document.getElementById("rightToeDin").style.display = "none";
            document.getElementById("rightHeelDin").style.display = "none";
        });
    }

    handleRental() {
        const OTHER_RENTAL = 4;
        document.getElementById("rentalEquip").style.display = "none";
        let owner = document.forms[0].elements["owner"];
        owner[OTHER_RENTAL].addEventListener('click', () => {
            document.getElementById("rentalEquip").style.display = "block";
        });
        for (let i = 0; i < OTHER_RENTAL; i++) {
            owner[i].addEventListener('click', () => {
                document.getElementById("rentalEquip").style.display = "none";
            });
        }
    }

    handleHelmet() {
        const TRUE = 1;
        let helmet = document.forms[0].elements["helmet"];
        let rental = document.forms[0].elements["helmetRental"];
        document.getElementById("helmetYes").style.display = "none";
        document.getElementById("helmetRentalYep").style.display = "none";
        helmet[0].addEventListener('click', () => {
            document.getElementById("helmetYes").style.display = "none";
            document.getElementById("helmetRentalYep").style.display = "none";
        });
        helmet[TRUE].addEventListener('click', () => {
            document.getElementById("helmetYes").style.display = "block";
            rental[0].addEventListener('click', () => {
                document.getElementById("helmetRentalYep").style.display = "none";
            });
            rental[TRUE].addEventListener('click', () => {
                document.getElementById("helmetRentalYep").style.display = "block";
            });
        });
    }

    handleVideo() {
         let video = document.forms[0].elements["video"];
         document.getElementById("videoYes").style.display = "none";
         video[0].addEventListener('click', () => {
              document.getElementById("videoYes").style.display = "none";
         });
         video[1].addEventListener('click', () => {
              document.getElementById("videoYes").style.display = "block";
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
}