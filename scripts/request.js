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

function uploadImage(fileInput) {
  files = fileInput.files[0];
  const token = {};
  const client = filestack.init('AzheqOZy3Txuu4dgJPuRJz');
  return new Promise((resolve) => {
    client
      .upload(files, {}, {}, token)
      .then((res) => {
        resolve(res.url);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}
