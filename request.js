const { resolve } = require("path");

function getRequest(url){
    return new Promise(resolve=>{
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        resolve(request.responseText);
    });
}

function postRequest(url,body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.send(body);
    return request.responseText
}