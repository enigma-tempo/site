var deck = [];

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
            button.setAttribute('onclick', addCard(element.id));
            let img = document.createElement('img');
            img.setAttribute('src', 'imagens/create.png');
            button.appendChild(img);
            lista.appendChild(button);
        });
        loading.classList.add('d-none');
    },500);
}