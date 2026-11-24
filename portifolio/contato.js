// ==========================================
// CONFIGURAÇÃO DO EMAILJS (Automação)
// ==========================================
const SERVICE_ID = "service_9xruimp";
const TEMPLATE_ID = "template_0rlfg3w";
const PUBLIC_KEY = "aNHpFF_blG0g8wht3";

// Inicializa o EmailJS
if (PUBLIC_KEY !== "SUA_PUBLIC_KEY_AQUI") {
  emailjs.init(PUBLIC_KEY);
}

// ==========================================
// LÓGICA DO FORMULÁRIO DE CONTATO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const feedback = document.getElementById("feedback-contato");

  form.addEventListener("submit", (e) => {
    // ISSO É O QUE IMPEDE A PÁGINA DE VOLTAR PARA CIMA!
    e.preventDefault(); 
    
    // Validação do Bootstrap
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // Pega os valores
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    const data = new Date().toLocaleString('pt-BR');

    // --- 1. SALVAR NO LOCALSTORAGE ---
    const novaMsg = {
      id: Date.now(),
      nome: nome,
      email: email,
      mensagem: mensagem,
      data: data
    };

    let listaMensagens = obterMensagens();
    listaMensagens.unshift(novaMsg); 
    salvarMensagens(listaMensagens);

    // --- 2. ENVIAR E-MAIL (EMAILJS) ---
    if (PUBLIC_KEY !== "SUA_PUBLIC_KEY_AQUI") {
      const templateParams = {
        nome: nome,
        email: email,
        mensagem: mensagem
      };

      feedback.innerHTML = `<div class="alert alert-info">Enviando e-mail...</div>`;

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(() => {
          mostrarSucesso(form, feedback);
        }, (error) => {
          console.error("Erro no EmailJS:", error);
          mostrarSucesso(form, feedback, " (Salvo localmente, mas o e-mail falhou)");
        });
    } else {
      mostrarSucesso(form, feedback, " (Apenas salvo localmente)");
    }
  });
});

// Função para limpar o form e mostrar mensagem de sucesso
function mostrarSucesso(form, feedback, extraMsg = "") {
  form.reset();
  form.classList.remove("was-validated");
  
  feedback.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Mensagem enviada!</strong> Ela já está salva no painel administrativo. ${extraMsg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;

  setTimeout(() => {
    feedback.innerHTML = "";
  }, 5000);
}