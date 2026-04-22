
// Colocar as chaves no arquivo .env (Pesquisar)
const enviar = document.getElementById("enviar")
const form = document.getElementById("formularioContato")
const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z^\s@]{2,}$/i;

document.addEventListener('DOMContentLoaded', () => {
    const fechar = document.getElementById("fechar")
    const btnFaleConosco = document.getElementById("btnFaleConosco")
    const ModalConteiner = document.getElementById("ModalConteiner")

    if (btnFaleConosco && ModalConteiner) {
        btnFaleConosco.addEventListener("click", (e) => {
            e.preventDefault()
            ModalConteiner.classList.add("show")
        });
    };

    if (btnFaleConosco && ModalConteiner) {
        fechar.addEventListener("click", (e) => {
            e.preventDefault()
            ModalConteiner.classList.remove("show")
        })
    }
});

function clear() {
    document.getElementById("TxtNomeModal").value = "";
    document.getElementById("TxtAssunto").value = "";
    document.getElementById("TxtEmailModal").value = "";
    document.getElementById("TxtMensagemModal").value = "";
}


// =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-= EMAILJS =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("KYKZkq8pmeyeeExjB");

    if (enviar) {
        enviar.addEventListener("click", function (event) {
            event.preventDefault()

            let strNome = document.getElementById("TxtNomeModal").value.trim();
            let strSubject = document.getElementById("TxtAssunto").value.trim();
            let strEmail = document.getElementById("TxtEmailModal").value.trim();
            let strMensagem = document.getElementById("TxtMensagemModal").value.trim();

            if (strNome === "" || strMensagem === "" || strEmail === "" || strSubject === "") {
                Swal.fire("Erro", "Algum campo não está preenchido, verifique!", "error");
            }
            else if (!regexEmail.test(strEmail)) {
                Swal.fire("Erro", "Insira um email válido!", "error");
            }
            else {
                const formData = {
                    name: document.getElementById("TxtNomeModal").value,
                    subject: document.getElementById("TxtAssunto").value,
                    email: document.getElementById("TxtEmailModal").value,
                    message: document.getElementById("TxtMensagemModal").value
                };
                const serviceId = "service_wyenxwc";
                const templateId = "template_5eker9v";

                emailjs.send(serviceId, templateId, formData);
                Swal.fire("Sucesso", "Mensagem enviada", "success")
                clear()
            }
        })
    }
})



