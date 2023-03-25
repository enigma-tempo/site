var effectDefault = {'effects':
                    [
                        {
                            'id': 1,
                            'name': 'Inspirar',
                            'effect': 'buff',
                            'params': 'alieds:number,attack:number,health:number',
                            'description': 'Inspira um ou mais aliados aumentando o valor de ataque e vida deles'
                        },
                        {
                            'id': 2,
                            'name': 'Provocar',
                            'effect': 'taunt',
                            'params': '',
                            'description': 'Inimigos só podem atacar esta carta'
                        },
                        {
                            'id': 3,
                            'name': 'Invocar',
                            'effect': 'summon',
                            'params': 'card_name:text,quantity:number',
                            'description': 'Invoca uma ou mais cartas para o campo'
                        },
                        {
                            'id': 4,
                            'name': 'Comprar carta',
                            'effect': 'draw',
                            'params': 'quantity:number',
                            'description': 'Compra cartas para sua mão'
                        },
                        {
                            'id': 5,
                            'name': 'Escudo',
                            'effect': 'divineshield',
                            'params': '',
                            'description': 'Bloqueia o próximo ataque'
                        },
                        {
                            'id': 6,
                            'name': 'Agilidade',
                            'effect': 'charge',
                            'params': '',
                            'description': 'Pode atacar imediatamente'
                        },
                        {
                            'id': 7,
                            'name': 'Causar dano a personalidade inimiga',
                            'effect': 'dealDamageHero',
                            'params': 'damage:number',
                            'description': 'Causa dano direto à personalidade inimiga'
                        },
                        {
                            'id': 8,
                            'name': 'Curar personalidade aliada',
                            'effect': 'healHero',
                            'params': 'heal:number',
                            'description': 'Cura sua personalidade aliada'
                        },
                        {
                            'id': 9,
                            'name': 'Mudar vida da personalidade inimiga',
                            'effect': 'setAttib',
                            'params': 'attribute:text,value:number',
                            'description': 'Muda a vida da personalidade inimiga para o valor escolhido'
                        },
                        {
                            'id': 10,
                            'name': 'Intimidar',
                            'effect': 'damageEnemies',
                            'params': 'enemies:number,health:number',
                            'description': 'Causa dano em um ou mais inimigos em campo.'
                        }
                    ]
                };
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
const effects = document.getElementById('effect');
const divParams = document.getElementById('params');

var effectList;

$(function() {
    createDynamicSelect();
});

for (i = 0; i < itens.length; i++) {
    itens[i].addEventListener('change', updateCard);
} 

function updateCard(){
    if (this.id == "effect") showParams(this.options['selectedIndex']);
    console.log(this.id+"Card");
    document.getElementById(this.id+"Card").innerHTML = document.getElementById(this.id).value;
}

function showParams(id){
    let paramsDefault;
    divParams.innerHTML = "";
    effectList.effects.forEach(element => {
        if (element.id == id) {
            paramsDefault = element.params;
            document.getElementById("effectDescription").innerText = element.description;
        }
    });
    if (paramsDefault != "") {
        params = paramsDefault.split(",");
        params.forEach(element => {
            p = element.split(":");
            let div = document.createElement("div");
            div.classList.add("form-floating", "col-sm-4", "form-group");
            let input = document.createElement("input");
            input.name = p[0];
            input.id = p[0];
            input.placeholder = p[0];
            input.type = p[1];
            input.classList.add("form-control", "mb-3");
            let label = document.createElement("label");
            label.htmlFor = p[0];
            label.innerHTML = p[0];
            div.appendChild(input);
            div.appendChild(label);
            divParams.appendChild(div);
        });
    }
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
  const api_effects = getRequest(urlBase+'effects');

  api_types.then(res => {createElementChild(types, res.types)});
  api_classes.then(res => {createElementChild(classes, res.classes)});
  api_subclasses.then(res => {createElementChild(subclasses, res.subclasses)});
  api_rarities.then(res => {createElementChild(rarities, res.rarities)});
  api_effects.then(res => {
    effectList = res??effectDefault;
    createElementChild(effects, effectList.effects)});
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
    const file = document.getElementById("file")
    const sprite = uploadImage(file);
    let params = document.getElementById("params");
    let paramsTxt = "";
    if (params.children.length > 0) {
        for (let i = 0; i < params.children.length; i++) {
            paramsTxt += params.children[i].children[0].value;
            if (i != params.children.length-1) {
                paramsTxt += ",";
            }            
        }
    }
  const card = {
    name: name.value,
    attack: attack.value,
    health: health.value,
    description: description.value,
    type: types.value,
    sprite: sprite,
    rarity: rarities.value,
    card_class: classes.value,
    subclass: subclasses.value,
    effects: effect.options['selectedIndex'],
    params: paramsTxt
  }

  postRequest(urlBase+'/cards', card); 
}



