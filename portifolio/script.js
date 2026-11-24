document.addEventListener("DOMContentLoaded", () => {
  
    // 1. Destacar link da navbar conforme o scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  
    // 2. Abrir o Painel Oculto Admin
    // Você pode clicar no "ponto" no rodapé OU usar o atalho Ctrl + Shift + A
    const adminTrigger = document.getElementById("admin-trigger");
    const modalAdmin = new bootstrap.Modal(document.getElementById("modalAdmin"));
  
    function abrirAdmin(e) {
      if (e) e.preventDefault();
      modalAdmin.show();
      // Se a função de renderizar as mensagens existir no storage.js, chama ela
      if (typeof renderizarAdmin === "function") {
        renderizarAdmin();
      }
    }
  
    adminTrigger.addEventListener("click", abrirAdmin);
  
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        abrirAdmin();
      }
    });
  
  });