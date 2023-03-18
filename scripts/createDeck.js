var deck = [];
var nome_deck = document.getElementById("deck_name");
var lista = document.getElementById("cardsDeck");
showCards();
async function showCards(){
    setTimeout(async function(){
        let data = await getRequest(urlBase+"cards");
        if(data['message'] == 'Erro inesperado. Bad Request '){
            alert("Não foi possível conectar ao banco de dados... Tente novamente mais tarde");
            return false;
        }
        let cards = data['cards'];
        cards.forEach(element => {
            let card = createCard(element);
            lista.appendChild(card);
            let button = document.createElement('button');
            button.setAttribute('onclick', "addCard('"+element._id+"');");
            let img = document.createElement('img');
            img.setAttribute('src', 'imagens/create.png');
            button.appendChild(img);
            lista.appendChild(button);
        });
        loading.classList.add('d-none');
    },500);
}

function addCard(id)
{
    deck.push(id);
}

function postDeck()
{
    const urlParams = new URLSearchParams(window.location.search);
    const id_jogador = urlParams.get('id_jogador');
    const id_personalidade = urlParams.get('id_personalidade');

    const post_deck = {
        name: nome_deck.value,
        player: id_jogador,
        hero: id_personalidade,
        cards: deck
    }

    postRequest(urlBase+'decks', post_deck); 
}