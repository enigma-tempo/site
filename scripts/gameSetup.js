if (sessionStorage.getItem('token') === '' || sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined ) {
    window.location.href = 'login.html';
}


let gameConfig = { id_jogador: sessionStorage.getItem('user'), id_personalidade: '', id_baralho: '', id_oponente: '' };

gamePage();

function createItem(element, tipo) {
    let item = document.createElement('li');
    let input = document.createElement('input');
    input.type = 'radio';
    input.name = tipo;
    input.id = element._id;
    input.value = element._id;
    input.classList.add('btn-check');
    let label = document.createElement('label');
    label.htmlFor = element._id;
    label.classList.add('btn', 'btn-dark', 'p-2');
    let image = document.createElement('img');
    if(tipo == "baralho") image.src = 'imagens/cardback.png';
    else image.src = element.sprite;
    
    
    let name = document.createElement('p');
    name.innerText = element.name;
    label.appendChild(image);
    label.appendChild(name);
    label.appendChild(name);
    item.appendChild(input);
    item.appendChild(label);
    return item;
}

async function gamePage() {
    getPersonalidades();
    let proximo = document.getElementById('next');
    while (gameConfig['id_personalidade'] == '') {
        await setEscolha(proximo, 'personalidade');
    }
    getBaralho(gameConfig['id_personalidade']);
    while (gameConfig['id_baralho'] == '') {
        await setEscolha(proximo, 'baralho');
    }
    getOponente(gameConfig['id_personalidade']);
    while (gameConfig['id_oponente'] == '') {
        await setEscolha(proximo, 'oponente');
    }
    window.location.href = 'https://enigma-tempo.github.io/jogo?id_jogador=' + gameConfig['id_jogador'] + '&id_personalidade=' + gameConfig['id_personalidade'] + '&id_baralho=' + gameConfig['id_baralho'] + '&id_oponente=' + gameConfig['id_oponente'];
}

async function setEscolha(proximo, tipo) {
    await buttonClick(proximo);
    let itemEscolhido = document.querySelector('input:checked');
    let alert_element = document.getElementById('alert');
    if (itemEscolhido != null) {
        alert_element.classList.add('d-none');
        itemEscolhido = itemEscolhido.value;
        gameConfig['id_' + tipo] = itemEscolhido;
        return new Promise((resolve) => {
        resolve(gameConfig['id_' + tipo]);
        });
    } else {
        alert_element.classList.remove('d-none');
    }
}

async function getPersonalidades() {
    return new Promise((resolve) => {
        setTimeout(async function(){
            let personalidades= [];
            await getRequest(urlBase+"heroes").then(item =>{
                personalidades = item['heroes'];
            });
            let lista = document.getElementById('lista');
            lista.innerHTML = '';
            let tipo = 'personalidade';
            personalidades.forEach((element) => {
                let personalidade = createItem(element, tipo);
                lista.appendChild(personalidade);
            });
            lista.innerHTML += '<li><input type="radio" class="btn-check" name="personalidade" id="locked" disabled><label class="btn btn-dark p-2" for="locked"><img src="imagens/locked.png" alt=""><span class="mt-auto">Bloqueado</span></label></li>';
            resolve();
        },100);
    });
}
  
async function getBaralho(id_personalidade) {
    let baralhos;
    await getRequest(urlBase+"decks/"+gameConfig['id_jogador']+"/"+id_personalidade).then(item =>{
        baralhos = item['deck'];
    });
    document.getElementById('titulo').innerText = 'Selecione um baralho';
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
    let tipo = 'baralho';
    if(baralhos != null){
        baralhos.forEach((element) => {
            let baralho = createItem(element, tipo);
            lista.appendChild(baralho);
        });
    }
    link = "createDeck.html?id_personalidade="+id_personalidade;
    lista.innerHTML += '<li><a href="'+link+'" class="btn btn-dark p-2"><img src="imagens/create.png" alt=""><p>Criar</p></a></li>';
}
  
async function getOponente(id_personalidade) {
    document.getElementById('titulo').innerText = 'Selecione um oponente';
    await getPersonalidades().then(e => {
        let player = document.getElementById(id_personalidade);
        player.disabled = true;
    });


}
