async function enviar(e){
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const s = document.getElementById('senha').value;
  const c = document.getElementById('confirmar').value;
  const err = document.getElementById('err-senha');
  const btn = document.querySelector('.btn');

  if(s !== c){
    err.classList.add('show');
    return;
  }

  err.classList.remove('show');
  btn.disabled = true;
  btn.textContent = 'Cadastrando...';

  try {
    const response = await fetch('http://localhost:3002/admin/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome,
        email,
        cpf,
        telefone,
        senha: s
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao cadastrar administrador.');
    }

    alert(data.mensagem);
    e.target.reset();
  } catch (error) {
    alert(error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Cadastrar';
  }
}