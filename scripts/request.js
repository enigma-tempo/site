function getRequest(url) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.onload = () => {
      resolve(request.response);
    }
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

function uploadImage(fileInput){
  files = fileInput.files[0];
  const token = {}
  const client = filestack.init("AzheqOZy3Txuu4dgJPuRJz");

  client.upload(files, {}, {}, token)
    .then(res => {
      return res.url;
    })
    .catch(err => {
      console.log(err)
    });
}