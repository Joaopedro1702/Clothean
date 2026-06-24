
// Colocar as chaves no arquivo .env (Pesquisar)
// Consertar clear() quando enviar mensagem
const enviar = document.getElementById("enviar")
const form = document.getElementById("formularioContato")

document.addEventListener('DOMContentLoaded', () => {
    const fechar = document.getElementById("fechar")
    const btnFaleConosco = document.getElementById("btnFaleConosco")
    const ModalConteiner = document.getElementById("ModalConteiner")

    if (btnFaleConosco && ModalConteiner) {
        btnFaleConosco.addEventListener("click", (e) => {
            e.preventDefault();
            const offcanvasEl = document.getElementById("offcanvasWithBothOptions");
            const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            offcanvas.hide();

            // Depois abre o modal
            setTimeout(() => {
                aparecerModal(ModalConteiner);
            });
        });
    };

    if (btnFaleConosco && ModalConteiner) {
        fechar.addEventListener("click", (e) => {
            e.preventDefault();
            fecharModal(ModalConteiner);
        })
    }
});

function clearFaleConosco() {
    const nome = document.getElementById("TxtNomeModal");
    const assunto = document.getElementById("TxtAssunto");
    const email = document.getElementById("TxtEmailModal");
    const mensagem = document.getElementById("TxtMensagemModal");

    clear(nome);
    clear(assunto);
    clear(email);
    clear(mensagem);
}


// =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-= EMAILJS =-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init(CONFIG.EMAILJS_INIT);

    if (enviar) {
        enviar.addEventListener("click", function (event) {
            event.preventDefault()

            let strNome = document.getElementById("TxtNomeModal").value.trim();
            let strSubject = document.getElementById("TxtAssunto").value.trim();
            let strEmail = document.getElementById("TxtEmailModal").value.trim();
            let strMensagem = document.getElementById("TxtMensagemModal").value.trim();

            if (isNull(strNome) === true || isNull(strMensagem) === true || isNull(strEmail) === true || isNull(strSubject) === true) {
                mensagemErro("Algum campo não está preenchido, verifique!");
            }
            else if (validarEmail(strEmail) === false) {
                mensagemErro("Insira um email válido!");
            }
            else {
                const formData = {
                    name: document.getElementById("TxtNomeModal").value,
                    subject: document.getElementById("TxtAssunto").value,
                    email: document.getElementById("TxtEmailModal").value,
                    message: document.getElementById("TxtMensagemModal").value
                };
                const serviceId = CONFIG.EMAILJS_SERVICE_ID;
                const templateId = CONFIG.EMAILJS_TEMPLATE_ID;

                emailjs.send(serviceId, templateId, formData);
                mensagemSucesso("Mensagem enviada");
                clearFaleConosco()
            }
        })
    }
})



