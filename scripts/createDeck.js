var deck = [];
var nome_deck = document.getElementById("deck_name");
var numCardsDeck = document.getElementById("numCardsDeck");
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
            let div = document.createElement('div');
            div.classList.add("d-flex", "flex-column");
            let card = createCard(element);
            let div2 = document.createElement("d-flex", "flex-row", "justify-content-center", "mx-5");
            let del = document.createElement('button');
            del.classList.add("btn", "btn-danger");
            del.setAttribute('onclick', "delCard('"+element._id+"');");
            del.disabled = true;
            let iconDel = document.createElement('i');
            iconDel.classList.add("bi", "bi-dash-circle");
            del.appendChild(iconDel);
            let numCard = document.createElement('span');
            numCard.classList.add("text-center", "my-auto", "mx-4");
            numCard.setAttribute('id','numCard-'+element._id);
            numCard.innerText = "0";
            let add = document.createElement('button');
            add.classList.add("btn", "btn-success");
            add.setAttribute('onclick', "addCard('"+element._id+"');");
            let iconAdd = document.createElement('i');
            iconAdd.classList.add("bi", "bi-plus-circle");
            add.appendChild(iconAdd);
            div2.appendChild(del);
            div2.appendChild(numCard);
            div2.appendChild(add);
            div.appendChild(card);
            div.appendChild(div2);      
            lista.appendChild(div);
        });
        loading.classList.add('d-none');
    },500);
}

function addCard(id)
{
    let item = document.getElementById("numCard-"+id);
    let num = parseInt(item.textContent);
    num +=1;
    item.innerText = num;
    item.previousSibling.disabled = false;
    if(num >= 3){
        item.nextSibling.disabled = true;
    }
    deck.push(id);
    numCardsDeck.textContent = deck.length;
}
function delCard(id)
{
    let item = document.getElementById("numCard-"+id);
    let num = parseInt(item.textContent);
    num -=1;
    item.innerText = num;
    item.nextSibling.disabled = false;
    if(num <= 0){
        item.previousSibling.disabled = true;
    }
    let index = deck.indexOf(id);
    deck.splice(index,1);
    numCardsDeck.textContent = deck.length;
}

function postDeck()
{
    if(deck.length != 30){
        showAlert('alertError', 'warning', 'Atenção!', 'O baralho precisa ter 30 cartas.');
        return;
    }
    if(nome_deck.value == ""){
        showAlert('alertError', 'warning', 'Atenção!', 'O nome do baralho não pode ficar vazio.');
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const id_jogador = sessionStorage.getItem('user').replaceAll('"', '');
    const id_personalidade = urlParams.get('id_personalidade');
    const post_deck = {
        name: nome_deck.value,
        player: id_jogador,
        hero: id_personalidade,
        cards: deck
    }
    setTimeout(async function () {
        let result = await postRequest(urlBase+'decks', post_deck);
        loading.classList.add('d-none');
        if (result.status == 201) {
            showAlert('alertError', 'success', 'Baralho cadastrado com sucesso!', 'Você será redirecionado.');
            window.location.href = 'jogo.html';
        } else {
            showAlert('alertError', 'danger', 'Erro!', 'Ocorreu um erro ao criar o baralho. Tente novamente mais tarde.');
        }
    }, 400);
}