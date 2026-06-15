// === CADASTRAR ===

// Senha Padrão:
const btnImgOlhoFechado = document.getElementById("ImgOlhoFechadoS")
const btnImgOlhoAberto = document.getElementById("ImgOlhoAbertoS")
const txtSenha = document.getElementById("TxtSenha")

// Confirmar Senha:
const btnImgOlhoFechadoCS = document.getElementById("ImgOlhoFechadoCS");
const btnImgOlhoAbertoCS = document.getElementById("ImgOlhoAbertoCS")
const TxtConfSenha = document.getElementById("TxtConfSenha")

// Eventos:

// =-=-= Senha Padrão: =-=-=

// Mostrar Senha:
btnImgOlhoAberto.addEventListener("click", function () {
    esconderSenha(btnImgOlhoAberto);
    alterarTipoSenhaTexto(txtSenha);
    mostrarSenha(btnImgOlhoFechado);
})
// Ocultar Senha:
btnImgOlhoFechado.addEventListener("click", function () {
   esconderSenha(btnImgOlhoFechado);
   alterarTipoSenhaOculto(txtSenha);
   mostrarSenha(btnImgOlhoAberto);
})

// =-=-= Confirmar Senha: =-=-=

// Mostrar Confirmar Senha:
btnImgOlhoAbertoCS.addEventListener("click", function () {
    esconderSenha(btnImgOlhoAbertoCS);
    alterarTipoSenhaTexto(TxtConfSenha);
    mostrarSenha(btnImgOlhoFechadoCS);
})
// Ocultar Confirmar Senha:
btnImgOlhoFechadoCS.addEventListener("click", function () {
   esconderSenha(btnImgOlhoFechadoCS);
   alterarTipoSenhaOculto(TxtConfSenha);
   mostrarSenha(btnImgOlhoAbertoCS);
})


