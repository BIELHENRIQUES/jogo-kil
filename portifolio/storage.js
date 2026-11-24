// Chave que usaremos para salvar no LocalStorage
const STORAGE_KEY = "mensagens_portfolio";

// 1. Verifica se o LocalStorage está vazio e cria os 20 registros de teste
function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const mensagensTeste = [];
    for (let i = 1; i <= 20; i++) {
      mensagensTeste.push({
        id: Date.now() + i, // Cria um ID único
        nome: `Usuário Teste ${i}`,
        email: `teste${i}@exemplo.com`,
        mensagem: `Esta é a mensagem de teste número ${i}. O CRUD está funcionando!`,
        data: new Date().toLocaleString('pt-BR')
      });
    }
    // Converte para JSON e salva
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mensagensTeste));
  }
}

// 2. Lê os dados do LocalStorage (transforma de JSON para Objeto JS)
function obterMensagens() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// 3. Salva a lista atualizada de volta no LocalStorage
function salvarMensagens(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// 4. Renderiza a tabela no Painel Admin
function renderizarAdmin() {
  const container = document.getElementById("admin-lista");
  const mensagens = obterMensagens();

  if (mensagens.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">Nenhuma mensagem encontrada.</p>`;
    return;
  }

  // Monta o HTML da tabela
  let html = `
    <table class="table table-striped table-hover mt-3">
      <thead class="table-dark">
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Mensagem</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Passa por cada mensagem e cria uma linha
  mensagens.forEach(msg => {
    html += `
      <tr>
        <td>${msg.nome}</td>
        <td>${msg.email}</td>
        <td><div style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${msg.mensagem}</div></td>
        <td><small>${msg.data}</small></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarMensagem(${msg.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deletarMensagem(${msg.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// 5. Deletar Mensagem
function deletarMensagem(id) {
  if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
    let mensagens = obterMensagens();
    mensagens = mensagens.filter(msg => msg.id !== id); // Remove pelo ID
    salvarMensagens(mensagens);
    renderizarAdmin(); // Atualiza a tabela na tela
  }
}

// 6. Editar Mensagem
function editarMensagem(id) {
  let mensagens = obterMensagens();
  const index = mensagens.findIndex(msg => msg.id === id);
  if (index === -1) return;

  const msgAtual = mensagens[index];

  // Usa prompts simples do navegador para editar (para manter o código limpo)
  const novoNome = prompt("Editar Nome:", msgAtual.nome);
  if (novoNome === null) return; // Se cancelar, para a edição

  const novoEmail = prompt("Editar E-mail:", msgAtual.email);
  if (novoEmail === null) return;

  const novaMensagem = prompt("Editar Mensagem:", msgAtual.mensagem);
  if (novaMensagem === null) return;

  // Atualiza o objeto
  mensagens[index].nome = novoNome;
  mensagens[index].email = novoEmail;
  mensagens[index].mensagem = novaMensagem;
  mensagens[index].data = new Date().toLocaleString('pt-BR') + " (Editado)";

  salvarMensagens(mensagens);
  renderizarAdmin(); // Atualiza a tabela
}

// Inicializa o storage assim que a página carrega
inicializarStorage();