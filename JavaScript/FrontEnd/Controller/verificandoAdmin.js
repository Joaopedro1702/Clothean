async function verificarAcessoAdmin(){
    try{
        const resposta = await fetch("https://clothean-g1s8.onrender.com/admin/dashboard",{
            method: "GET",
            credentials: "include"
        });
        if(resposta.ok){
            console.log("Acesso admin permitido");
            return
        }

        localStorage.removeItem("adminLogado");
        
        await Swal.fire({
            icon: "warning",
            title: "Acesso negado",
            text: "A sua sessão expirou ou você não está logado como Administrador",
            confirmButtonText: "Fazer login"
        });
        
        window.location.href="loginADM.html"
    
    }catch(erro){
        console.error("Erro ao verificar acesso de Administrador", erro);
        
        localStorage.removeItem("adminLogado");

        await Swal.fire({
            icon: "error",
            title: "Erro ao verificar acesso",
            text: "Não foi possível confirmar seu acesso. Faça login novamente.",
            confirmButtonText: "Fazer login"
        });

        window.location.href = "loginADM.html";
        
    }
}

verificarAcessoAdmin();