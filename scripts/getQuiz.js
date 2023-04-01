if (sessionStorage.getItem('role') !== 'admin') {
  document.getElementById('criar_quiz_btn').remove();
}
if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === '') {
  window.location.href = 'login.html';
}

$(function () {
  document.getElementById('play_quiz').addEventListener('click', startQuiz);
});

startQuiz();

function startQuiz() {
  var questions = getQuestions();
  var pontuação = 0;

  document.getElementById('inicio').classList.add('d-none');
  document.getElementById('quiz').classList.remove('d-none');

  questions.forEach(async (q, index) => {
    //define a pergunta
    document.getElementById('pergunta').innerHTML = q.question;
    //define o tema
    document.getElementById('tema').innerHTML = q.theme;
    q.options.split(';').forEach((o, index) => {
      document.getElementById(index + '-option').innerHTML = o;
    });
    let proximo = document.getElementById('responder');
    proximo.addEventListener('click', () => {
      pontuação += document.querySelector('input[name="resposta"]:checked').value == q.answer ? 5 : 0;
    });
    timer = setTimeout(() => {
      proximo.click();
    }, 120000);
    await buttonClick(proximo);
    clearTimeout(timer);
  });
  document.getElementById('resultado').classList.remove('d-none');
  document.getElementById('resultado-valor').innerHTML = pontuação;
}

async function getQuestions() {
  var questions = [];
  setTimeout(async function () {
    let data = await getRequest(urlBase + 'quizzes');
    if (data['message'] == 'Erro inesperado. Bad Request ') {
      alert('Não foi possível conectar ao banco de dados... Tente novamente mais tarde');
      return false;
    }
    let quizzes = data['quizzes'];
    const N = quizzes.length;
    const n_questions = 5;
    let random_quiz_list = [];
    for (let i = 0; i < n_questions; i++) {
      let num;
      do {
        num = Math.floor(Math.random() * N);
      } while (random_quiz_list.filter((n) => n === num).length >= 1);
      random_quiz_list.push(num);
    }

    random_quiz_list.forEach((element) => {
      let quiz = createQuiz(quizzes[element]);
      questions.push(quiz);
    });
    loading.classList.add('d-none');
    return questions;
  }, 500);
}
