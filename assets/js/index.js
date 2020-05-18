let tarefas = [
    {
        id: 1,
        texto: 'Escovar os dentes',
        prioridade: 3,
        feito: false
    },
    {
        id: 2,
        texto: 'Gravar vídeos',
        prioridade: 1,
        feito: false
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

const render = tarefas => {
    // Capturar o elemento que contém a lista de tarefas
    let table = document.getElementById('table');
    table.innerHTML = '';

    // Criando a lista de tarefas
    for (const tarefa of tarefas) {
        
        // Criar a row (linha) da tabela
        let row = document.createElement('tr');
        if (tarefa.feito) {
            row.classList.add('done');
        }

        // Criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = tarefa.feito;
        checkbox.id = 'chk' + tarefa.id;
        checkbox.addEventListener('click', onCheckClick);

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
        let prioridades = {1: 'baixa', 2: 'média', 3: 'alta'};
        let tdPrioridade = document.createElement('td');
        tdPrioridade.innerText = prioridades[tarefa.prioridade];
        row.appendChild(tdPrioridade);

        // Criar td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = 'delete';
        i.addEventListener('click', onDeleteClick);
        i.setAttribute('id', tarefa.id);
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);
        
        // Adicionar a linha à tabela
        table.appendChild(row);
    }
}

const onDeleteClick = e => {
    console.log(e.target);
    
    // Capturando o id da tarefa a ser removida
    let id = Number(e.target.id);

    // Confirmar a exclusão
    if(!window.confirm('Tem certeza que deseja excluir a tarefa?')) {
        return; // abortando...
    }

    // Remover a tarefa do array 
    remove(id);

    // Renderizar a lista novamente
    render(tarefas);
}

const onCheckClick = e => {
    // Capturando o id da tarefa clicada
    let id = Number(e.target.id.replace('chk', ''));
    
    // Levantar tarefa do id capturado
    let tarefa = tarefas.find(t => t.id == id);
    
    // Alterar o campo feito
    tarefa.feito = !tarefa.feito;

    // Alterar a classe da tr que contepm o td que contém o checkbox;
    e.target.parentNode.parentNode.classList.toggle('done');

    console.log(tarefas);
}

const create = (texto, prioridade) => {
    
    // Determinando o novo id da tarefa
    let id = tarefas.length == 0 ? 1 : tarefas[tarefas.length - 1].id + 1;
    
    // Retornando a tarefa
    return { 
        id,
        texto,
        prioridade,
        feito: false
    }
}

const remove = id => {
    tarefas = tarefas.filter(t => t.id != id);
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