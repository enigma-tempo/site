if (sessionStorage.getItem('role') !== 'admin') {
  document.getElementById('criar_quiz_btn').remove();
}
if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === '') {
  window.location.href = 'login.html';
}

$(function () {
  document.getElementById('play_quiz').addEventListener('click', startQuiz);
});

var perguntas = {"quizzes":[{
                        "theme":"Tema teste",
                        "question":"Pergunta teste 1",
                        "options":"resposta1;resposta2;resposta3;resposta4",
                        "answer":1
                    },
                    {
                        "theme":"Tema teste",
                        "question":"Pergunta teste 2",
                        "options":"resposta1;resposta2;resposta3;resposta4",
                        "answer":2
                    },
                    {
                        "theme":"Tema teste",
                        "question":"Pergunta teste 3",
                        "options":"resposta1;resposta2;resposta3;resposta4",
                        "answer":3
                    }
                    ,
                    {
                        "theme":"Tema teste",
                        "question":"Pergunta teste 4",
                        "options":"resposta1;resposta2;resposta3;resposta4",
                        "answer":4
                    },
                    {
                        "theme":"Tema teste",
                        "question":"Pergunta teste 5",
                        "options":"resposta1;resposta2;resposta3;resposta4",
                        "answer":1
                    }
]};
var quizzes;
var questions;
var pontos = 0;
var button = document.createElement("button");
var resultadoDiv = document.getElementById('resultado');
var resultado = document.getElementById('resultado-valor');
var divQuiz = document.getElementById('quiz');

async function startQuiz() {
    document.getElementById('inicio').classList.add('d-none');
    questions = await getQuestions();
    var divTimer = document.getElementById("divTimer");
    divQuiz.classList.remove('d-none');
    button.id = "responder";
    button.classList.add("btn", "btn-dark", "m-2");
    button.innerHTML = "Responder";
    button.addEventListener("click", validarRespostas);

  questions.forEach(async (q, index) => {
    let divQuestion = document.createElement("div");
    let tema = document.createElement('h2');
    tema.innerHTML = "Tema: "+q.theme;
    tema.classList.add("text-center", "m-3");
    let pergunta = document.createElement('h4');
    pergunta.innerHTML = "Pergunta "+(index+1)+": "+q.question;
    pergunta.classList.add("m-3");
    let optionsList = document.createElement("ol");
    optionsList.type = "a";
    optionsList.id = "respostas"+index;
    optionsList.classList.add("mx-3");
    q.options.split(';').forEach((o, index) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "radio";
        input.name = optionsList.id;
        input.id = optionsList.id+index;
        input.value = index+1;
        label.htmlFor = optionsList.id+index;
        label.innerHTML = o;
        li.appendChild(input);
        li.appendChild(label);
        optionsList.appendChild(li);
    });
    divQuestion.appendChild(tema);
    divQuestion.appendChild(pergunta);
    divQuestion.appendChild(optionsList);
    divQuiz.appendChild(divQuestion);
  });
  divQuiz.appendChild(button);
  divTimer.classList.remove("d-none");
  contagemRegressiva();
}
async function getQuestions() {
    return new Promise((resolve) => {
        loading.classList.remove('d-none');
        var questions = [];
        setTimeout(async function () {
            let data = await getRequest(urlBase + 'quizzes');
            if (data['message'] == 'Erro inesperado. Bad Request ') {
            alert('Não foi possível conectar ao banco de dados... Tente novamente mais tarde');
            return false;
            }
            quizzes = data['quizzes'].length>0 ? data['quizzes'] : perguntas['quizzes'];
            const N = quizzes.length;
            let n_questions = data['quizzes'].length < 5 ? data['quizzes'].length : 5;
            let random_quiz_list = [];
            for (let i = 0; i < n_questions; i++) {
            let num;
            do {
                num = Math.floor(Math.random() * N);
            } while (random_quiz_list.filter((n) => n === num).length >= 1);
            random_quiz_list.push(num);
            }

            random_quiz_list.forEach((element) => {
            questions.push(quizzes[element]);
            });
            loading.classList.add('d-none');
            resolve(questions);
        }, 500);
    });
}

function contagemRegressiva(){
    var tempoTimer = 5 * 60; //timer de 5 minutos em segundos
    function atualizarContagem(){
        tempoTimer--;
        var minutos = Math.floor(tempoTimer/60);
        var segundos = (tempoTimer%60).toString().padStart(2,"0");
        var timerView = document.getElementById("timer");
        timerView.textContent = minutos+":"+segundos;
        if(tempoTimer<=0){
            clearInterval(intervalo);
            timerView.textContent = "0:00";
            button.click();
        }
    }
    var intervalo = setInterval(atualizarContagem,1000);
}

function validarRespostas(){
    questions.forEach(async (q, index) => {
        if(document.querySelector('input[name="respostas'+index+'"]:checked') !== null){
            pontos += document.querySelector('input[name="respostas'+index+'"]:checked').value == q.answer ? 5:0;
        } 
    });
    divQuiz.classList.add("d-none");
    resultado.innerHTML = "Você fez "+pontos+" pontos!";
    resultadoDiv.classList.remove("d-none");
    setTimeout(async function(){
        let pontosAtuais = await getRequest(urlBase+"user/"+sessionStorage.getItem('user'));
        pontos += pontosAtuais.me.question_points;
        let json = {question_points:pontos};
        let result = await patchRequest(urlBase+"user/"+sessionStorage.getItem('user'), json);

        if (result.status == 200) {
            showAlert('alertDiv', 'success', 'Pontos contabilizados com sucesso!', 'Você será redirecionado.');
            window.location.href = 'quiz.html';
          } else {
            showAlert('alertDiv', 'danger', 'Erro!', 'Ocorreu um erro ao salvar os pontos. Tente novamente mais tarde.');
          }
    },500);
}
