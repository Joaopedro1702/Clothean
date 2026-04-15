const orderkey = 'clothean_order';
let order = JSON.parse(localStorage.getItem(orderkey) || 'null') || {
    serviceId: 'srvl',
    serviceName: 'Lava e Seca',
    unitPrice: '30.00',
    qty: 1,
    deliveryFee: 5.00,
};

const summaryServiceEl = document.querySelector('.summary-item .summary-value') || document.querySelectorAll('.summary-value')[0];
const SummaryQtyEl = Array.from(document.querySelectorAll('.summary-item .summary-value'))[1];
const summaryPriceEl = document.getElementById('summary-value');
const totalEl = document.getElementById('amount');

function bindServiceCards(){
    document.querySelectorAll('.service-card').forEach((card, idx => {
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
    }));
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
    if (summaryServiceEl) summaryPriceEl.textContent = order.serviceName;
    if (SummaryQtyEl) SummaryQtyEl.textContent = order.qty;
    if (summaryPriceEl) summaryPriceEl.textContent = 'R$ ' + order.unitPrice.toFixed(2);
    const total = order.unitPrice * order.qty + (order.deliveryFee || 0);
    if (totalEl) totalEl.textContent = 'R$ ' + total.toFixed(1);


}

function init(){
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, idx) => {
        const name = card.querySelector('h3')?.textContent.trim();
        if (name === order.serviceName) card.classList('selected');
    });
    bindServiceCards();
    bindQtyControls();
    renderSummary();

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