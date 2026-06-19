const txtTelefone = document.getElementById("TxtTelefone")

txtTelefone.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{2})(\d)/, '($1) $2')

    v = v.replace(/(\d{5})(\d{4})/, '$1-$2');

    e.target.value = v;
})

const txtCpf = document.getElementById("TxtCpf");

txtCpf.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    e.target.value = v;

})

const txtNovoTelefone = document.getElementById("novoTelefone")

txtNovoTelefone.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{2})(\d)/, '($1) $2')

    v = v.replace(/(\d{5})(\d{4})/, '$1-$2');

    e.target.value = v;
})

const txtNovoCpf = document.getElementById("novoCPF")

txtNovoCpf.addEventListener('input', function (e) {

    let v = e.target.value.replace(/\D/g, '');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d)/, '$1.$2');

    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    e.target.value = v;
})
