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
<<<<<<< HEAD

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
=======
function uploadImage(file){
  return new Promise((resolve) => {
    const formdata = new FormData()
    formdata.append("image", file.files[0])
    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID b37dc6409000178"
        },
        body: formdata
    }).then(data => data.json()).then(data => {
        console.log(data)
        resolve(data.data.link);
    });
  });
>>>>>>> 9893029239f2982d8665bf5c8fa72786c1afd929
}