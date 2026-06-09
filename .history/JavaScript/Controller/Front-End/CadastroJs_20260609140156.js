async function cadastrarUsuario(e) {
  e.preventDefault();

  const nome = document.getElementById("nome")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const cpf = document.getElementById("cpf")?.value.trim();
  const telefone = document.getElementById("telefone")?.value.trim();
  const senha = document.getElementById("senha")?.value;
  const confirmar = document.getElementById("confirmar")?.value;
  const erroSenha = document.getElementById("err-senha");
  const btn = document.querySelector(".btn");

  if (!nome || !email || !senha) {
    alert("Preencha nome, email e senha.");
    return;
  }

  if (confirmar !== undefined && senha !== confirmar) {
    erroSenha?.classList.add("show");
    alert("As senhas nao coincidem.");
    return;
  }

  erroSenha?.classList.remove("show");

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Cadastrando...";
  }

  try {
    const response = await fetch("http://localhost:3002/usuarios/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        cpf,
        telefone,
        senha
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao cadastrar usuario.");
    }

    alert(data.mensagem);
    e.target.reset();
  } catch (error) {
    alert(error.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Cadastrar";
    }
  }
}

const formularioCadastro = document.getElementById("form-cadastro");

if (formularioCadastro) {
  formularioCadastro.addEventListener("submit", cadastrarUsuario);
}

