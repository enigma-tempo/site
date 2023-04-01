if (sessionStorage.getItem('role') !== 'admin') {
    window.location.href = 'index.html';
}

const theme = document.getElementById('theme');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
let loading = document.getElementById('loading');

async function postQuiz()
{
    loading.classList.remove('d-none');
    let opcoes = '';
    for (let index = 1; index <= 4; index++) {
        let inputOpcoes = document.getElementById("option_"+index);
        if(inputOpcoes!=""){
            opcoes+=inputOpcoes.value;
        }
        if (index != 4) {
            opcoes += ";";
        } 
    }

    console.log(answer.value);
    const quiz = {
        theme: theme.value,
        question: question.value,
        options: opcoes,
        answer: answer.value,
    }
    setTimeout(async function () {
        let result = await postRequest(urlBase+'quizzes', quiz);
        loading.classList.add('d-none');
        if (result.status == 201) {
            showAlert('alertCard', 'success', 'Pergunta cadastrada com sucesso!', 'Você será redirecionado.');
            window.location.href = 'quiz.html';
        } else {
            showAlert('alertCard', 'danger', 'Erro!', 'Ocorreu um erro ao criar a pergunta. Tente novamente mais tarde.');
        }
    }, 400);
    
}

