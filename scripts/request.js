const URL_API = "https://api-enigma-tempo.onrender.com/api";

const name = document.getElementById('name');
const attack = document.getElementById('attack');
const health = document.getElementById('health');
const mana = document.getElementById('mana');
const description = document.getElementById('description');
const types = document.getElementById('types');
const classes = document.getElementById('classes');
const subclasses = document.getElementById('subclasses');
const rarities = document.getElementById('rarities');
const effect = document.getElementById('effect');
const params = document.getElementById('params');

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

function createDynamicSelect()
{ 
  const api_types = getRequest(URL_API.concat('/types'));
  const api_classes = getRequest(URL_API.concat('/classes'));
  const api_subclasses = getRequest(URL_API.concat('/subclasses'));
  const api_rarities = getRequest(URL_API.concat('/rarities'));

  api_types.then(res => {createElementChild(types, res.types)});
  api_classes.then(res => {createElementChild(classes, res.classes)});
  api_subclasses.then(res => {createElementChild(subclasses, res.subclasses)});
  api_rarities.then(res => {createElementChild(rarities, res.rarities)});
}

function createElementChild(fatherElement, array)
{
  for (const value of array){
    let option = document.createElement('option');
    option.value = value._id;
    option.text = value.name;
    fatherElement.appendChild(option);
  }
}

function postCard()
{
  const card = {
    name: name.value,
    attack: attack.value,
    health: health.value,
    description: description.value,
    type: types.value,
    rarity: rarities.value,
    class: classes.value,
    subclass: subclasses.value,
    effect: effect.value,
    params: params.value
  }

  postRequest(URL_API.concat('/cards'), card); 
}

window.onload = createDynamicSelect();



