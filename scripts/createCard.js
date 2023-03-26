// var effectDefault = {'effects':
//                     [
//                         {
//                             'id': 1,
//                             'name': 'Inspirar',
//                             'effect': 'buff',
//                             'params': 'alieds:number,attack:number,health:number,posture:text',
//                             'description': 'Inspira um ou mais aliados aumentando o valor de ataque e vida deles'
//                         },
//                         {
//                             'id': 2,
//                             'name': 'Provocar',
//                             'effect': 'taunt',
//                             'params': '',
//                             'description': 'Inimigos só podem atacar esta carta'
//                         },
//                         {
//                             'id': 3,
//                             'name': 'Invocar',
//                             'effect': 'summon',
//                             'params': 'card_name:text,quantity:number',
//                             'description': 'Invoca uma ou mais cartas para o campo'
//                         },
//                         {
//                             'id': 4,
//                             'name': 'Comprar carta',
//                             'effect': 'draw',
//                             'params': 'quantity:number',
//                             'description': 'Compra cartas para sua mão'
//                         },
//                         {
//                             'id': 5,
//                             'name': 'Escudo',
//                             'effect': 'divineshield',
//                             'params': '',
//                             'description': 'Bloqueia o próximo ataque'
//                         },
//                         {
//                             'id': 6,
//                             'name': 'Agilidade',
//                             'effect': 'charge',
//                             'params': '',
//                             'description': 'Pode atacar imediatamente'
//                         },
//                         {
//                             'id': 7,
//                             'name': 'Causar dano a personalidade inimiga',
//                             'effect': 'dealDamageHero',
//                             'params': 'damage:number',
//                             'description': 'Causa dano direto à personalidade inimiga'
//                         },
//                         {
//                             'id': 8,
//                             'name': 'Curar personalidade aliada',
//                             'effect': 'healHero',
//                             'params': 'heal:number',
//                             'description': 'Cura sua personalidade aliada'
//                         },
//                         {
//                             'id': 9,
//                             'name': 'Mudar vida da personalidade inimiga',
//                             'effect': 'setAttib',
//                             'params': 'value:number',
//                             'description': 'Muda a vida da personalidade inimiga para o valor escolhido'
//                         },
//                         {
//                             'id': 10,
//                             'name': 'Motivação',
//                             'effect': 'buffSelf',
//                             'params': 'attack:number,health:number',
//                             'description': 'Aumenta o valor de ataque e vida de si mesmo.'
//                         },
//                         {
//                             'id': 11,
//                             'name': 'Intimidar',
//                             'effect': 'damageEnemies',
//                             'params': 'enemies:number,health:number',
//                             'description': 'Causa dano em um ou mais inimigos em campo.'
//                         }
//                     ]
//                 };

const paramsNames = {'alieds':'Quantidade de aliados','attack':'Ataque','health':'Vida','card_name':'Nome da carta','quantity':'Quantidade','damage':'Valor do dano','heal':'Valor da cura','value':'Valor','enemies':'Quantidade de inimigos','posture':'Postura afetada'};

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
    let item = document.getElementById(this.id+"Card");
    if (this.id == "effect") showParams(this.selectedOptions[0].textContent);
    if (this.id == "rarities") {
        item.className = 'cards d-flex flex-column';
        item.classList.add(raritiesOptions[this.selectedOptions[0].value]);
        return;
    }
    if (this.id == "classes") {
        item.src = 'imagens/'+this.selectedOptions[0].textContent+'.png';
        return;
    }

    if (this.id == 'subclasses') {
        item.innerHTML = document.getElementById(this.id).selectedOptions[0].text;
        return;
    }
    if (this.id == 'types'){
        if (this.selectedOptions[0].textContent == 'Efeito'){
            document.getElementById('divAgente').classList.add("d-none");
            return;
        }else{
            document.getElementById('divAgente').classList.remove("d-none");
            return;
        }
    }
    item.innerHTML = document.getElementById(this.id).value;

}

function showParams(name){
    let paramsDefault;
    divParams.innerHTML = "";
    // paramsDefault = effectList.effects[id].params
    effectList.effects.forEach(element => {
        if (element.name == name) {
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
            input.placeholder = paramsNames[p[0]];
            input.type = p[1];
            input.classList.add("form-control", "mb-3");
            let label = document.createElement("label");
            label.htmlFor = p[0];
            label.innerHTML = paramsNames[p[0]];
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
    effectList = res.effects.length==0?effectDefault:res;
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

async function postCard()
{
    loading.classList.remove('d-none');
    const file = document.getElementById("sprite")
    const sprite = await uploadImage(file);
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
        mana: mana.value,
        description: description.value,
        type: types.value,
        sprite: sprite,
        rarity: rarities.value,
        acting: classes.value,
        category: subclasses.value,
        effect: effects.value,
        params: paramsTxt
    }
    setTimeout(async function () {
        let result = await postRequest(urlBase+'cards', card);
        loading.classList.add('d-none');
        console.log(result)
        if (result.status == 201) {
            showAlert('alertCard', 'success', 'Carta cadastrada com sucesso!', 'Você será redirecionado.');
            // window.location.href = 'cartas.html';
        } else {
            showAlert('alertCard', 'danger', 'Erro!', 'Ocorreu um erro ao criar a carta. Tente novamente mais tarde.');
        }
    }, 400);
    
}



