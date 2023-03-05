var itens = document.getElementsByClassName("update");

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