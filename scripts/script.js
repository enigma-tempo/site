const urlBase = 'https://api-enigma-tempo.onrender.com/api/';
const raritiesOptions = { '6420514b3407ebcfe7c8bc01': 'comum', '642051513407ebcfe7c8bc03': 'raro', '642051683407ebcfe7c8bc05': 'epico', '6420516f3407ebcfe7c8bc07': 'lendario' };

$(function () {
  $('#header').load('header.html');
  $('#footer').load('footer.html');
  setTimeout(function () {
    if (sessionStorage.getItem('user') != null) {
      document.getElementById('jogar').classList.remove('d-none');
      document.getElementById('login').classList.add('d-none');
      document.getElementById('logout').classList.remove('d-none');
      document.getElementById('to_quiz').classList.remove('d-none');
    }
  }, 100);
});

function showAlert(id, tipo, titulo, mensagem) {
  let alert_element = document.getElementById(id);
  alert_element.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show"><strong>' + titulo + '</strong> ' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
}

async function buttonClick(btn) {
  return new Promise((resolve) => (btn.onclick = () => resolve()));
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}
