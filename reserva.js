// Seleção do serviço
const serviceCards = document.querySelectorAll('.service-card');
let servicoSelecionado = { title: 'Lava e Seca', price: 35.00 };

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const nome = card.querySelector('h3').textContent;
        const preco = parseFloat(card.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));
        const taxa = 5.00;

        servicoSelecionado = { title: nome, price: preco + taxa };
    });
});

// Botão continuar
document.querySelector('.btn-continue').addEventListener('click', async () => {
    const btn = document.querySelector('.btn-continue');
    btn.textContent = 'Aguarde...';
    btn.disabled = true;

    try {
        const response = await fetch('https://servclothean.onrender.com/criar_preferencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: servicoSelecionado.title,
                quantity: 1,
                price: servicoSelecionado.price
            })
        });

        const data = await response.json();
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar pagamento. Tente novamente.');
        btn.textContent = 'Continuar →';
        btn.disabled = false;
    }
});

// Botão voltar
document.querySelector('.btn-back').addEventListener('click', () => {
    window.history.back();
});