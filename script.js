//função criar drinks
function criarDrink() {
    const frutaSelecionada = document.getElementById("fruta").value;
    const destiladoSelecionado = document.getElementById("destilado").value;
  
    
    const drinkEncontrado = receitas.find(
      (receita) =>
        receita.fruta === frutaSelecionada &&
        receita.destilado === destiladoSelecionado
    );
  
   
    const resultadoDiv = document.getElementById("resultado");
    if (drinkEncontrado) {
      resultadoDiv.innerHTML = `
        <h3>${drinkEncontrado.nome}</h3>
        <p>${drinkEncontrado.descricao}</p>
      `;
    } else {
      resultadoDiv.innerHTML = `<p style="color: red;">Nenhum drink encontrado para essa combinação!</p>`;
    }
  }
  
 
  document.getElementById("criar-drink").addEventListener("click", criarDrink);



  //função alimentos
  function exibirAlimentos () {
    const categoriaSelecionada = document.getElementById('categoria').value;
    const alimentosDiv = document.getElementById('alimentos');

    let alimentosFiltrados;
    if (categoriaSelecionada === 'todos') {
        alimentosFiltrados = alimentos;
} else {
    alimentosFiltrados = alimentos.filter(alimento => alimento.categoria === categoriaSelecionada);
    }

    if (alimentosFiltrados.length > 0) {
        alimentosDiv.innerHTML = alimentosFiltrados.map(alimento => `<p>${alimento.nome}</p>`).join('');   
    } else {
        alimentosDiv.innerHTML = '<p> Não há alimentos para esta categoria. </p>';
    }
}

document.getElementById('categoria').addEventListener('change', exibirAlimentos);

exibirAlimentos();

import { alimentos } from './data.js';  
  

//função calculadora de calorias

let itensSelecionados = [];

// Atualiza o total de calorias exibido
function atualizarTotalCalorias() {
  const total = itensSelecionados.reduce((acc, item) => acc + item.calorias, 0);
  document.getElementById('total-calorias').innerText = total;
}

// Adiciona um item à lista
function adicionarItem(nome, calorias) {
  itensSelecionados.push({ nome, calorias });
  exibirItensSelecionados();
  atualizarTotalCalorias();
}

// Remove um item da lista
function removerItem(nome) {
  itensSelecionados = itensSelecionados.filter(item => item.nome !== nome);
  exibirItensSelecionados();
  atualizarTotalCalorias();
}

// Exibe os itens selecionados na lista
function exibirItensSelecionados() {
  const listaItens = document.getElementById('lista-itens');
  listaItens.innerHTML = ''; // Limpa a lista antes de exibir novamente

  itensSelecionados.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.nome} - ${item.calorias} Calorias`;

    const botaoRemover = document.createElement('button');
    botaoRemover.innerText = 'Remover';
    botaoRemover.onclick = () => removerItem(item.nome);

    li.appendChild(botaoRemover);
    listaItens.appendChild(li);
  });
}

// Configura os eventos de clique nos botões de alimentos
document.querySelectorAll('.alimento').forEach(botao => {
  botao.addEventListener('click', () => {
    const nome = botao.getAttribute('data-nome');
    const calorias = parseInt(botao.getAttribute('data-calorias'));
    adicionarItem(nome, calorias);
  });
});

// Inicializa o total de calorias
atualizarTotalCalorias();