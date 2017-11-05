//   @todo

"use strict";
import SetSessionStorage from './SetSessionStorage.js';

export default class EventHandler {
    constructor(year, day, month) {
        this.loadZipData();
        this.loadHills();
        this.loadLifts();
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
        this.handlePatrollers("statementTaker", 0);
        this.handlePatrollers("scenePatrollers", 0);
        this.handlePatrollers("transportPatrollers", 0);
        this.handlePatrollers("aidRoomPatrollers", 0);
        this.handleWitnesses(1);
        this.handlePatrollers("reportCompleter", 0);
        this.handleSubmit();
    }

    loadZipData() {
        this.performAjax("XHR0", 0, (response) => {
            this.zipData = JSON.parse(response);
        });
    }

    loadHills() {
        this.performAjax("XHR1", 0, (response) => {
            this.hills = JSON.parse(response);
        });
    }

    loadLifts() {
        this.performAjax("XHR2", 0, (response) => {
            this.lifts = JSON.parse(response);
        });
    }

    calculateAge(year, month, day) {
        document.getElementById("dob").addEventListener("blur", () => {
            let dobString = document.getElementById("dob").value;
            let birthDate = new Date(dobString);
            let age = year - birthDate.getFullYear();
            let birthMonth = (month - birthDate.getMonth());
            if (birthMonth < 0 || (birthMonth === 0 && day < birthDate.getDate())) {
                age--;
            }
            document.getElementById("age").value = age;
        });
    }

    handlePatientZip() {
        document.getElementById("patientZip").addEventListener("blur", () => {
            for (let element of this.zipData) {
                if (document.getElementById("patientZip").value === element[0]) {
                    document.getElementById("patientCity").value = element[1];
                    document.getElementById("patientState").value = element[2];
                    break;
                }
            }
        });
    }

    handleLocation() {
        document.getElementById("lifts").style.visibility = "hidden";
        document.getElementById("hills").style.visibility = "hidden";
        let locations = document.forms[0].elements["location"];
        locations[0].addEventListener("click", () => {
            document.getElementById("lifts").style.visibility = "visible";
            document.getElementById("hills").style.visibility = "hidden";
            document.getElementById("whichLift").options.length = 1;
            document.getElementById("whichHill").options.length = 1;
            for (let element of this.lifts) {
                let option = document.createElement("option");
                option.text = element;
                option.value = element;
                document.getElementById("whichLift").appendChild(option);
            }
            document.getElementById("whichLift").addEventListener("change", () => {
                document.getElementById("hillLift").value = document.getElementById("whichLift").options[document.getElementById("whichLift").selectedIndex].text;
                document.getElementById("difficulty").value = null;
            });
        });
        locations[1].addEventListener("click", () => {
            document.getElementById("lifts").style.visibility = "hidden";
            document.getElementById("hills").style.visibility = "visible";
            document.getElementById("whichLift").options.length = 1;
            document.getElementById("whichHill").options.length = 1;
            for (let element of this.hills) {
                let option = document.createElement("option");
                option.text = element[0];
                option.value = element[1];
                document.getElementById("whichHill").appendChild(option);
            }
            document.getElementById("whichHill").addEventListener("change", () => {
                document.getElementById("hillLift").value = document.getElementById("whichHill").options[document.getElementById("whichHill").selectedIndex].text;
                document.getElementById("difficulty").value = document.getElementById("whichHill").options[document.getElementById("whichHill").selectedIndex].value;
            });
        });
        locations[2].addEventListener("click", () => {
            document.getElementById("lifts").style.visibility = "hidden";
            document.getElementById("hills").style.visibility = "hidden";
        });
    }

    handleLesson() {
        document.getElementById("instYes").style.visibility = "hidden";
        let lesson = document.forms[0].elements["inLesson"];
        lesson[0].addEventListener("change", () => {
            alert("Remember: You must fill out an instructor witness statement form.");
            document.getElementById("instYes").style.visibility = "visible";
        });
        lesson[1].addEventListener("change", () => {
            document.getElementById("instructor").value = null;
            document.getElementById("instYes").style.visibility = "hidden";
        });
    }

    handleNumOther() {
        document.getElementById("otherNum").style.visibility = "hidden";
        const OTHER = 2;
        let other = document.forms[0].elements["numTimes"];
        other[OTHER].addEventListener("change", () => {
            document.getElementById("otherNum").style.visibility = "visible";
        });
        for (let i = 0; i < OTHER; i++) {
            other[i].addEventListener("change", () => {
                document.getElementById("otherNum").style.visibility = "hidden";
            });
        }
    }

    setEquipOther() {
        document.getElementById("otherEquipYes").style.visibility = "hidden";
        const OTHER = 3;
        let other = document.forms[0].elements["equipmentType"];
        other[OTHER].addEventListener("click", () => {
            document.getElementById("otherEquipYes").style.visibility = "visible";
        });
        other[OTHER].addEventListener("click", () => {
            document.getElementById("otherEquipYes").style.visibility = "visible";
        });
        for (let i = 0; i < OTHER; i++) {
            other[i].addEventListener("change", () => {
                document.getElementById("otherEquipYes").style.visibility = "hidden";
            });
        }
    }

    setDins() {
        document.getElementById("leftToeDin").style.visibility = "hidden";
        document.getElementById("leftHeelDin").style.visibility = "hidden";
        document.getElementById("rightToeDin").style.visibility = "hidden";
        document.getElementById("rightHeelDin").style.visibility = "hidden";
        document.getElementById("equipAlpine").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.visibility = "visible";
            document.getElementById("leftHeelDin").style.visibility = "visible";
            document.getElementById("rightToeDin").style.visibility = "visible";
            document.getElementById("rightHeelDin").style.visibility = "visible";
        });
        document.getElementById("equipNordic").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.visibility = "hidden";
            document.getElementById("leftHeelDin").style.visibility = "hidden";
            document.getElementById("rightToeDin").style.visibility = "hidden";
            document.getElementById("rightHeelDin").style.visibility = "hidden";
        });
        document.getElementById("equipSnowboard").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.visibility = "hidden";
            document.getElementById("leftHeelDin").style.visibility = "hidden";
            document.getElementById("rightToeDin").style.visibility = "hidden";
            document.getElementById("rightHeelDin").style.visibility = "hidden";
        });
        document.getElementById("equipOther").addEventListener("click", () => {
            document.getElementById("leftToeDin").style.visibility = "hidden";
            document.getElementById("leftHeelDin").style.visibility = "hidden";
            document.getElementById("rightToeDin").style.visibility = "hidden";
            document.getElementById("rightHeelDin").style.visibility = "hidden";
        });
    }

    handleRental() {
        const OWN = 0, AREA_RENT = 1, BORROWED = 2, DEMO = 3, OTHER_RENTAL = 4;
        document.getElementById("rentalEquip").style.visibility = "hidden";
        document.getElementById("rentalEquipNums").style.visibility = "hidden";
        let owner = document.forms[0].elements["owner"];
        owner[OWN].addEventListener("click", () => {
            document.getElementById("rentalEquip").style.visibility = "hidden";
            document.getElementById("rentalEquipNums").style.visibility = "hidden";
        });
        owner[AREA_RENT].addEventListener("click", () => {
            document.getElementById("rentalEquip").style.visibility = "hidden";
            document.getElementById("rentalEquipNums").style.visibility = "visible";
        });
        owner[BORROWED].addEventListener("click", () => {
            document.getElementById("rentalEquip").style.visibility = "hidden";
            document.getElementById("rentalEquipNums").style.visibility = "hidden";
        });
        owner[DEMO].addEventListener("click", () => {
            document.getElementById("rentalEquip").style.visibility = "hidden";
            document.getElementById("rentalEquipNums").style.visibility = "visible";
        });
        owner[OTHER_RENTAL].addEventListener("click", () => {
            document.getElementById("rentalEquip").style.visibility = "visible";
            document.getElementById("rentalEquipNums").style.visibility = "visible";
        });
    }

    handleHelmet() {
        const TRUE = 1;
        let helmet = document.forms[0].elements["helmet"];
        let rental = document.forms[0].elements["helmetRental"];
        document.getElementById("helmetYes").style.visibility = "hidden";
        document.getElementById("helmetRentalYep").style.visibility = "hidden";
        helmet[0].addEventListener("click", () => {
            document.getElementById("helmetYes").style.visibility = "hidden";
            document.getElementById("helmetRentalYep").style.visibility = "hidden";
        });
        helmet[TRUE].addEventListener("click", () => {
            document.getElementById("helmetYes").style.visibility = "visible";
            rental[0].addEventListener("click", () => {
                document.getElementById("helmetRentalYep").style.visibility = "hidden";
            });
            rental[TRUE].addEventListener("click", () => {
                document.getElementById("helmetRentalYep").style.visibility = "visible";
            });
        });
    }

    handleVideo() {
         let video = document.forms[0].elements["video"];
         document.getElementById("videoYes").style.visibility = "hidden";
         video[0].addEventListener("click", () => {
              document.getElementById("videoYes").style.visibility = "hidden";
         });
         video[1].addEventListener("click", () => {
              document.getElementById("videoYes").style.visibility = "visible";
         });
    }

    handlePatrollers(patrollerType, count) {
        let select = document.createElement("select");
        select.name = `${patrollerType}_${count}`;
        select.id = `${patrollerType}_${count}`;
        select.size = 1;
        let option = document.createElement("option");
        option.text = "CHOOSE PATROLLER";
        option.value = "";
        option.selected = true;
        document.getElementById(`${patrollerType}`).appendChild(select);
        document.getElementById(`${patrollerType}_${count}`).appendChild(option);
        this.performAjax("XHR3", 0, (response) => {
            this.patrollers = JSON.parse(response);
            document.getElementById(`${patrollerType}_${count}`).options.length = 1;
            for (let element of this.patrollers) {
                let option = document.createElement("option");
                element = element[1] + " " + element[0];
                option.text = element;
                option.value = element;
                document.getElementById(`${patrollerType}_${count}`).appendChild(option);
            }
        });
        if (patrollerType !== `reportCompleter` && patrollerType !== `statementTaker`) {
            let removeMe; //used in line below to create a named arrow func. that allows removeEventListener to work
            document.getElementById(`${patrollerType}_${count}`).addEventListener("change", removeMe = () => {
                document.getElementById(`${patrollerType}Count`).value = count;
                document.getElementById(`${patrollerType}_${count}`).removeEventListener("change", removeMe);
                count++;
                return this.handlePatrollers(patrollerType, count);
            });
        }
    }

    handleWitnesses(count) {
        let witness = `
                <div class="row">
                    <div class="small-2 columns">
                        <label class="radius secondary label">Witness ${count}</label>
                        <input name="w${count}LastName" id="w${count}LastName" type="text" placeholder="Last Name">
                    </div>
                    <div class="small-2 columns">
                    <br>
                        <input name="w${count}FirstName" id="w${count}FirstName" type="text" placeholder="First Name">
                    </div>
                    <div class="small-2 columns">
                    <br>
                        <input name="w${count}HomePhoneNum" id="w${count}HomePhoneNum" type="tel" placeholder="Phone number">
                    </div>
                    <div class="small-2 columns">
                    <br>
                        <input name="w${count}CellPhoneNum" id="w${count}CellPhoneNum" type="tel" placeholder="Cell number">
                    </div>
                    <div class="small-3 columns">
                    <br>
                        <input name="w${count}Street" id="w${count}Street" type="text" placeholder="Street number">
                    </div>
                        <div class="small-1 columns">
                    <br>
                        <input name="w${count}Zip" id="w${count}Zip" type="text" placeholder="Zip" required>
                    </div>
                    <input name="w${count}City" id="w${count}City" type="none" hidden>
                    <input name="w${count}" id="w${count}State" type="none" hidden>
                </div>
        `;
        document.getElementById("addWitness").addEventListener("click", () => {
            document.getElementById("witness").innerHTML += witness;
            count++;
            return this.handleWitnesses(count);
        });
    }

    handleSubmit() {
        document.getElementById("submit").addEventListener("click", () => {
            let data = new FormData(document.querySelector("#mainForm"));
            this.performAjax("XHR5", data, (response) => {
                console.log(response);
            });
            new SetSessionStorage();
            window.open('/public/views/results.html', '_blank', 'location=yes,height=800,width=600,scrollbars=yes,status=yes');
        });
    }

    performAjax(requestNum, sendToNode, callback) {
        let bustCache = "?" + new Date().getTime();
        const XHR = new XMLHttpRequest();
        XHR.open("POST", document.url + bustCache, true);
        XHR.setRequestHeader("X-Requested-with", requestNum);
        XHR.send(sendToNode);
        XHR.onload = () => {
            if (XHR.readyState === 4 && XHR.status === 200 && callback) {
                return callback(XHR.responseText);
            }
        };
    }
}