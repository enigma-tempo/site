let gameConfig = { id_jogador: '', id_personalidade: '', id_baralho: '', id_oponente: '' };

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
    image.src = element.name.replace(' ', '-') + '.png';
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
    window.location.href = 'enigmatempo.html?id_jogador=' + gameConfig['id_jogador'] + '&id_personalidade=' + gameConfig['id_personalidade'] + '&id_baralho=' + gameConfig['id_baralho'] + '&id_oponente=' + gameConfig['id_oponente'];
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

function getPersonalidades() {
    // let data = getRequest(urlBase+"personalidades"); //getAllPersonalidades
    let data = {
    personalidades: [
        { _id: '1', name: 'Dom Pedro I' },
        { _id: '2', name: 'Zumbi dos Palmares' },
        { _id: '5', name: 'Zumbi dos Palmares' },
        { _id: '3', name: 'Zumbi dos Palmares' },
        { _id: '4', name: 'Zumbi dos Palmares' },
    ],
    };
    // data = JSON.parse(data);
    let personalidades = data['personalidades'];
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
    let tipo = 'personalidade';
    personalidades.forEach((element) => {
        let personalidade = createItem(element, tipo);
        lista.appendChild(personalidade);
    });
    lista.innerHTML += '<li><input type="radio" class="btn-check" name="personalidade" id="locked" disabled><label class="btn btn-dark p-2" for="locked"><img src="imagens/locked.png" alt="">Bloqueado</label></li>';
}
  
function getBaralho(id_personalidade) {
    // let data = getRequest(urlBase+"deck/personalidade/"+id_personalidade); //getDeckByIdPersonalidade
    // data = JSON.parse(data);
    let data = {
        decks: [
        { _id: '1', name: 'Deck Principal' },
        { _id: '2', name: 'Deck secundário' },
        ],
    };
    let baralhos = data['decks'];
    document.getElementById('titulo').innerText = 'Selecione um baralho';
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
    let tipo = 'baralho';
    baralhos.forEach((element) => {
        let baralho = createItem(element, tipo);
        lista.appendChild(baralho);
    });
    lista.innerHTML += '<li><button class="btn btn-dark p-2"><img src="imagens/create.png" alt=""><p>Criar</p></button></li>';
}
  
function getOponente(id_personalidade) {
    document.getElementById('titulo').innerText = 'Selecione um oponente';
    getPersonalidades();
    let player = document.getElementById(id_personalidade);
    player.disabled = true;
}