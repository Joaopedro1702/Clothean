const orderkey = 'clothean_order';
let order = JSON.parse(localStorage.getItem(orderkey) || 'null') || {
    serviceId: 'srvl',
    serviceName: 'Lava e Seca',
    unitPrice: '30.00',
    qty: 1,
    deliveryFee: 5.00,
};

order.unitPrice = parseFloat(order.unitPrice);

const summaryServiceEl = document.querySelector('.summary-item .summary-value') || document.querySelectorAll('.summary-value')[0];
const SummaryQtyEl = Array.from(document.querySelectorAll('.summary-item .summary-value'))[1];
const summaryPriceEl = document.querySelectorAll('.summary-value')[2];
const totalEl = document.querySelector('.amount');

function bindServiceCards(){
    document.querySelectorAll('.service-card').forEach((card, idx) => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h3')?.textContent.trim();
                const priceText = card.querySelector('p')?.textContent.trim().replace(/[R$\S,]/g, '')
                const price = parseFloat(priceText) || (idx === 0 ? 30 : 20);

                order.serviceId = 'srv' + (idx+1);
                order.serviceName =  name;
                order.unitPrice = price;
                order.qty = 1;
                saveAndRender();
                
                document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

            });
    });
}

function bindQtyControls(){
    document.addEventListener('keydown', (e) => {
        if (e.key === '+' || e.key === 'ArrowUp') {order.qty =Math.max(1, order.qty + 1); saveAndRender();}
        if (e.key === '-' || e.key === 'ArrowDown'){order.qty = Math.max(1, order.qty - 1); saveAndRender();}


    });
}

function bindPagamento() {
    const btnContinue = document.querySelector('.btn-continue');

    if (!btnContinue) return;

    btnContinue.addEventListener('click', async () => {
        btnContinue.textContent = 'Aguarde...';
        btnContinue.disabled = true;

        try {
            // Servidor local do Mercado Pago
            //const urlPagamento = 'http://localhost:3000/criar_preferencia';

            // Servidor publicado no Render - ativar depois
            const urlPagamento = 'https://servclothean.onrender.com/criar_preferencia';

            const response = await fetch(urlPagamento, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: order.serviceName,
                    quantity: order.qty,
                    price: order.unitPrice + (order.deliveryFee || 0)
                })
            });

            const data = await response.json();

            window.location.href = data.init_point;
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao processar pagamento. Tente novamente.');
            btnContinue.textContent = 'Continuar →';
            btnContinue.disabled = false;
        }
    });
}

function saveAndRender(){
    localStorage.setItem(orderkey, JSON.stringify(order));
    renderSummary();
}

function renderSummary(){
    //atualiza o texto na sidebar
    if (summaryServiceEl) summaryServiceEl.textContent = order.serviceName;
    if (SummaryQtyEl) SummaryQtyEl.textContent = order.qty;
    if (summaryPriceEl) summaryPriceEl.textContent = 'R$ ' + order.unitPrice.toFixed(2);
    const total = order.unitPrice * order.qty + (order.deliveryFee || 0);
    if (totalEl) totalEl.textContent = 'R$ ' + total.toFixed(2);


}

function mostrarModalAuth(){
    Swal.fire({
        title: 'Faça login para continuar',
        text: 'Você precisa estar logado para realizar uma reserva.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cadastrar',
    }).then((result) => {
        if(result.isConfirmed){
            window.location.href = './loginUsuario.html'
        }else if(result.dismise === Swal.DismissReason.cancel){
            window.location.href = './cadastro.html'
        }
    });
}

//Insere dados automaticamente caso o usuario já esteja logado.

async function preencherDadosUsuario(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('usuarioId');
    const nome = localStorage.getItem('usuarioNome');

    if(!token || !id){
        mostrarModalAuth();
        return;
    }

    try{
        const res = await fetch(`http://localhost:3002/ListaUsuarios/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        const dados = await res.json();

        document.querySelector('input[placeholder="João Silva"]').value = dados.nome || nome;
        document.querySelector('input[placeholder="seu@email.com"]').value = dados.email || '';
        document.querySelector('input[placeholder="(11) 99999-9999"]').value = dados.telefone || '';

    }catch{
        document.querySelector('input[placeholder="João Silva"]').value = nome || '';
    }

}

function init(){
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, idx) => {
        const name = card.querySelector('h3')?.textContent.trim();
        if (name === order.serviceName) card.classList.add('selected');
    });



    bindServiceCards();
    bindQtyControls();
    bindPagamento();
    renderSummary();
    preencherDadosUsuario();

    /*const btnContinue = document.getElementById('btn-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
        saveAndRender();
      // redirecionar ou avançar passo...
      // location.href = 'next.html';
    });
*/ 

    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.addEventListener('click', saveAndRender)
}

init();