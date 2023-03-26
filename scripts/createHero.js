const paramsNames = {'alieds':'Quantidade de aliados','attack':'Ataque','health':'Vida','card_name':'Nome da carta','quantity':'Quantidade','damage':'Valor do dano','heal':'Valor da cura','value':'Valor','enemies':'Quantidade de inimigos'};

var itens = document.getElementsByClassName("update");

const name = document.getElementById('name');
const description = document.getElementById('description');
const mana = document.getElementById('mana');
const effects = document.getElementById('effect');
const hero_lines = document.getElementById('hero_lines');
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
    if (this.id == "effect") showParams(this.options['selectedIndex']);
    if (this.id == "rarities") {
        item.className = 'cards d-flex flex-column';
        item.classList.add(raritiesOptions[this.selectedIndex]);
        return;
    }
    if (this.id == "classes") {
        item.src = 'imagens/'+this.selectedOptions[0].textContent+'.png';
        return;
    }

    if (this.type == 'select-one') {
        item.innerHTML = document.getElementById(this.id).selectedOptions[0].text;
        return;
    }
    item.innerHTML = document.getElementById(this.id).value;

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
  const api_effects = getRequest(urlBase+'hero_effects');

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

async function postHero()
{
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
    const hero = {
        name: name.value,
        mana: mana.value,
        hero_lines: hero_lines.value,
        description: description.value,
        sprite: sprite,
        effects: effect.options['selectedIndex'],
        params: paramsTxt
    }
    setTimeout(async function () {
        let result = await postRequest(urlBase+'heroes', hero);
        console.log(result)
        if (result.status == 201) {
            showAlert('alertCard', 'success', 'Personalidade cadastrada com sucesso!', 'Você será redirecionado.');
            // window.location.href = 'cartas.html';
            console.log(sprite)
        } else {
            showAlert('alertCard', 'danger', 'Erro!', 'Ocorreu um erro ao criar a personalidade. Tente novamente mais tarde.');
        }
    }, 400);
    
}



