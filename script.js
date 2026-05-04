// Seleção de elementos do DOM
const inputVisor = document.querySelector('#text input');
const pCalculoAnterior = document.querySelector('#calculos p');
const spanSinal = document.querySelector('#sinal');

let valorAtual = '0';
let valorAnterior = '';
let operacaoPendente = null;

// Atualiza a tela da calculadora
function atualizarVisor() {
    inputVisor.value = valorAtual;
}

// Lógica para inserir números e ponto decimal
function enterNummber(num) {
    if (num === '.') {
        if (valorAtual.includes('.')) return; // Evita múltiplos pontos
    }

    if (valorAtual === '0' && num !== '.') {
        valorAtual = num.toString();
    } else {
        valorAtual += num.toString();
    }
    atualizarVisor();
}

// Lógica para as operações básicas e botões de limpeza
function operacao(tipo) {
    switch (tipo) {
        case 'C': // Limpa tudo
            valorAtual = '0';
            valorAnterior = '';
            operacaoPendente = null;
            pCalculoAnterior.innerText = '';
            spanSinal.innerText = '';
            break;

        case 'CE': // Limpa apenas a entrada atual
            valorAtual = '0';
            break;

        case 'del': // Apaga o último caractere
            valorAtual = valorAtual.length > 1 ? valorAtual.slice(0, -1) : '0';
            break;

        case 'MoM': // Inverte o sinal (+/-)
            valorAtual = (parseFloat(valorAtual) * -1).toString();
            break;

        default: // Operações matemáticas (+, -, *, /)
            processarOperador(tipo);
            break;
    }
    atualizarVisor();
}

function processarOperador(op) {
    const sinais = { 'soma': '+', 'sub': '-', 'mult': '*', 'div': '/' };
    
    if (valorAnterior !== '') {
        igual(); // Calcula o resultado parcial antes de mudar de operador
    }

    operacaoPendente = op;
    valorAnterior = valorAtual;
    pCalculoAnterior.innerText = valorAnterior;
    spanSinal.innerText = sinais[op];
    valorAtual = '0';
}

// Lógica do botão de igualdade
function igual() {
    if (!operacaoPendente || valorAnterior === '') return;

    const numAnterior = parseFloat(valorAnterior);
    const numAtual = parseFloat(valorAtual);
    let resultado = 0;

    switch (operacaoPendente) {
        case 'soma': resultado = numAnterior + numAtual; break;
        case 'sub':  resultado = numAnterior - numAtual; break;
        case 'mult': resultado = numAnterior * numAtual; break;
        case 'div':  
            resultado = numAtual !== 0 ? numAnterior / numAtual : 'Erro'; 
            break;
    }

    valorAtual = resultado.toString();
    operacaoPendente = null;
    valorAnterior = '';
    
    // Limpa o histórico superior após o cálculo
    pCalculoAnterior.innerText = '';
    spanSinal.innerText = '';
    atualizarVisor();
}