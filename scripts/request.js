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
function uploadImage(file){
  const formdata = new FormData()
  formdata.append("image", file.target.files[0])
  fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
          Authorization: "Client-ID b37dc6409000178"
      },
      body: formdata
  }).then(data => data.json()).then(data => {
      return data.data.link;
  })
}