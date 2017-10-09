//   @todo

'use strict';

class results {
    constructor() {
        this.populateResults();
    }

    populateResults() {
        this.performAjax('XMLHttpRequest1', 0, (response) => {
            let tempList = JSON.parse(response);
            for (let i = 0; i < Object.keys(tempList).length; i++) {

            }
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

window.addEventListener('load', () => {
    new results();
});