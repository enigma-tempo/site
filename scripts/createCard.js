var itens = document.getElementsByClassName("update");

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

$(function() {
    createDynamicSelect();
});

for (i = 0; i < itens.length; i++) {
    // let item = document.getElementById(itens[i].id);
    itens[i].addEventListener('change', updateCard);
} 

function updateCard(){
    console.log(this.id+"Card");
    document.getElementById(this.id+"Card").innerHTML = document.getElementById(this.id).value;
}

function updateImage(){
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("sprite").files[0]);
    oFReader.onload = function (oFREvent) {
        document.getElementById("imageCard").src = oFREvent.target.result;
    };
}

function createDynamicSelect()
{ 
  const api_types = getRequest(urlBase+'types');
  const api_classes = getRequest(urlBase+'classes');
  const api_subclasses = getRequest(urlBase+'subclasses');
  const api_rarities = getRequest(urlBase+'rarities');

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
    card_class: classes.value,
    subclass: subclasses.value,
    effect: effect.value,
    params: params.value
  }

  postRequest(urlBase+'/cards', card); 
}

// window.onload = createDynamicSelect();



