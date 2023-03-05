const urlBase = 'https://api-enigma-tempo.onrender.com/api/';


async function buttonClick(btn) {
  return new Promise((resolve) => (btn.onclick = () => resolve()));
}

window.onload = function () {
  $(document).ready(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
  });
  if (sessionStorage.getItem('user') != null) {
    document.getElementById('jogar').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
    document.getElementById('logout').classList.remove('d-none');
  }
  // let page_name = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  // if (page_name == 'jogo.html') {
  //   gamePage();
  // }
};


