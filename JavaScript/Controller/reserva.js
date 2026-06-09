const orderkey = 'clothean_order';
let order = JSON.parse(localStorage.getItem(orderkey) || 'null') || {
    serviceId: 'srvl',
    serviceName: 'Lava e Seca',
    unitPrice: 30.00,
    qty: 1,
    deliveryFee: 5.00,
};
order.unitPrice = Number(order.unitPrice);
order.qty = Number(order.qty) || 1;
order.deliveryFee = Number(order.deliveryFee) || 0;

const summaryValues = Array.from(document.querySelectorAll('.summary-item .summary-value'));
const summaryServiceEl = summaryValues[0];
const SummaryQtyEl = summaryValues[1];
const summaryPriceEl = summaryValues[2];
const totalEl = document.querySelector('.amount');
const btnContinue = document.querySelector('.btn-continue');
const btnBack = document.querySelector('.btn-back');

function bindServiceCards(){
    document.querySelectorAll('.service-card').forEach((card, idx) => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h3')?.textContent.trim();
                const priceText = card.querySelector('p')?.textContent.trim().replace(/[R$\s]/g, '').replace(',', '.')
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

function saveAndRender(){
    localStorage.setItem(orderkey, JSON.stringify(order));
    renderSummary();
}

function renderSummary(){
    //atualiza o texto na sidebar
    if (summaryServiceEl) summaryServiceEl.textContent = order.serviceName;
    if (SummaryQtyEl) SummaryQtyEl.textContent = order.qty + 'x';
    if (summaryPriceEl) summaryPriceEl.textContent = 'R$ ' + order.unitPrice.toFixed(2);
    const total = order.unitPrice * order.qty + (order.deliveryFee || 0);
    if (totalEl) totalEl.textContent = 'R$ ' + total.toFixed(2);


}

async function goToPayment(){
    saveAndRender();

    if (!btnContinue) return;

    btnContinue.disabled = true;
    btnContinue.textContent = 'Abrindo pagamento...';

    try {
        const total = order.unitPrice * order.qty + (order.deliveryFee || 0);
        const response = await fetch('http://localhost:3000/criar_preferencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: order.serviceName,
                quantity: order.qty,
                price: total,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            const details = data.details ? ' - ' + JSON.stringify(data.details) : '';
            throw new Error((data.error || 'Falha ao criar pagamento') + details);
        }

        const paymentUrl = data.init_point || data.sandbox_init_point;

        if (!paymentUrl) {
            throw new Error('Link de pagamento nao recebido');
        }

        window.location.href = paymentUrl;
    } catch (error) {
        console.error('Erro ao abrir pagamento:', error);
        alert('Nao foi possivel abrir o pagamento: ' + error.message);
        btnContinue.disabled = false;
        btnContinue.textContent = 'Continuar ->';
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
    renderSummary();
    if (btnContinue) btnContinue.addEventListener('click', goToPayment);

    /*const btnContinue = document.getElementById('btn-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
        saveAndRender();
      // redirecionar ou avançar passo...
      // location.href = 'next.html';
    });
*/ 

    if (btnBack) btnBack.addEventListener('click', saveAndRender)
}

init();
