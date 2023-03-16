const urlBase = 'https://api-enigma-tempo.onrender.com/api/';


async function buttonClick(btn) {
  return new Promise((resolve) => (btn.onclick = () => resolve()));
}

window.onload = function () {
  $(document).ready(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    createDynamicSelect();
  });
  setTimeout(function(){
    if (sessionStorage.getItem('user') != null) {
      document.getElementById('jogar').classList.remove('d-none');
      document.getElementById('login').classList.add('d-none');
      document.getElementById('logout').classList.remove('d-none');
    }
  },50);
};

function logout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}


