let tarefas = [
    {
        id: 1,
        texto: 'Escovar os dentes',
        prioridade: 3,
        feito: true
    },
    {
        id: 2,
        texto: 'Gravar vídeos',
        prioridade: 1,
        feito: true
    },
    {
        id: 3,
        texto: 'Fazer almoço',
        prioridade: 2,
        feito: false
    },
    {
        id: 4,
        texto: 'Pagar escolas',
        prioridade: 3,
        feito: false
    },
]

const render = t => {
    // Capturar o elemento que contém a lista de tarefas
    let table = document.getElementById('table');
    table.innerHTML = '';

    // Criando a lista de tarefas
    for (const tarefa of t) {
        
        // Criar uma linha de tabela
        let row = document.createElement('tr');

        // Criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        // Criar a célula que vai conter o checkbox
        let tdCheck = document.createElement('td');
        tdCheck.appendChild(checkbox);

        // Adicionar tdCheck a row
        row.appendChild(tdCheck);

        // Criar td de texto
        let tdTexo = document.createElement('td');
        tdTexo.innerText = tarefa.texto;
        row.appendChild(tdTexo);

        // Criar td de prioridade
        let tdPrioridade = document.createElement('td');
        if (tarefa.prioridade == 3) tdPrioridade.innerText = '[alta]'
        if (tarefa.prioridade == 2) tdPrioridade.innerText = '[média]'
        if (tarefa.prioridade == 1) tdPrioridade.innerText = '[baixa]'
        row.appendChild(tdPrioridade);

        // Criar td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = 'delete';
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);

        // Adicionar a linha à tabela
        table.appendChild(row);
    }
}

const create = (texto, prioridade) => {
    return { 
        id: tarefas[tarefas.length - 1].id + 1,
        texto,
        prioridade,
        feito: false
    }
}

// Capturar form
let form = document.getElementById('form');

// Adicionae evento
form.addEventListener('submit', (e) => {

    // Evitar comportamento padrao do evento
    e.preventDefault();

    // Capturar texto digitado pelo usuário
    let texto = document.getElementById("tf_2do").value;

    // Verifica se o texto está settado
    if (!texto.trim()) return;

    // Verificar se existe prioridade settada nesse texto
    let strInicio = texto.substring(0, 3);
    let prioridade;
    switch (strInicio) {
        case '#1 ':
            prioridade = 1;
            texto = texto.slice(3);
            break;
        case '#2 ':
            prioridade = 2;
            texto = texto.slice(3);
            break;
        case '#3 ':
            prioridade = 3;
            texto = texto.slice(3);
            break;
        default:
            prioridade = 1;
    }

    // Criar o objeto de tarefa sabendo o texto e a prioridade
    let tarefa = create(texto, prioridade);
    
    // Adicionar o objeto tarefa ao array de tarefas
    tarefas.push(tarefa);

    // Renderizar a minha lista novamente
    render(tarefas);

    // Limpar campo de texto
    document.getElementById('td_2do').value = '';
});

render(tarefas);