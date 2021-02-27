'use strict';

let inputGrn = document.querySelector('.Grn'),
    inputUsd = document.querySelector('.Usd');

// inputGrn.addEventListener('input', () => {
//     let request = new XMLHttpRequest();
//     request.open('GET', 'js/current.json');
//     request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
//     request.send();
//     request.addEventListener('readystatechange', function() {
//         if (request.readyState === 4 && request.status == 200) {
//             let data = JSON.parse(request.response);
//             inputUsd.value = inputGrn.value / data.usd;
//         } else {
//             inputUsd.value = "Щось пішло не так!";
//         }
//     });
// });

inputGrn.addEventListener('input', () => {
    function postData() {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.send();
            request.onload = function() {
                if (request.readyState === 4) {
                    if (request.status == 200) {
                        resolve(this.response)
                    }
                } 
                 else {
                    reject()
                }
            }
        });
    }

    postData()
    .then(response => {
        let data = JSON.parse(response);
        inputUsd.value = inputGrn.value/data.usd;
    })
    .catch(() => {
        inputUsd.value = 'Щось пішло не так...';
    });

});