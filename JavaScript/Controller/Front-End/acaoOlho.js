const btnImgOlhoFechado = document.getElementById("ImgOlhoFechadoS")
const btnImgOlhoAberto = document.getElementById("ImgOlhoAbertoS")

btnImgOlhoAberto.addEventListener("click", function () {
    mostrarSenha()
})

btnImgOlhoFechado.addEventListener("click", function () {
   esconderSenha();
})