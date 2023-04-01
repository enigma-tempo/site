function getRequest(url) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.onload = () => {
      resolve(request.response);
    };
    request.send();
  });
}

function postRequest(url, json) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(json));
    resolve(request);
  });
}

function patchRequest(url, json) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.open('PATCH', url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(json));
    resolve(request);
  });
}

function deleteRequest(url, id) {
  return new Promise((resolve) => {
    console.log(url + id);
    let request = new XMLHttpRequest();
    request.open('DELETE', url + id, false);
    request.send();
    resolve(request);
  });
}

async function uploadImage(fileInput){
  let img = fileInput.files[0];
  if(img == undefined) return 1;
  let formData = new FormData();
  let fileName = new Date().getTime() +'.'+ img.name.split(".")[1];
  formData.append("sendimage", img);
  formData.append("fileName", fileName);
  result = await fetch('https://paneled-inception.000webhostapp.com/requests.php', {method: "POST", body: formData});
  if(result.status == 200){
    return 'https://paneled-inception.000webhostapp.com/uploads/'+fileName;
  }
  return 1;
}
