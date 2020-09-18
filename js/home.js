
window.onload = function () {
    document.getElementById('formCadastro').addEventListener('submit', salvarCliente);
    document.getElementById('btnFechar').addEventListener('click', (e) => {
        document.getElementById('divDetalhes').style.display = 'none';
    });

}
function mascaraCpfCnpj(t) {
    let i = t.value.length;
    if (i <= 14) {
        mascara(t, '###.###.###-##');
    } else {
        if (i === 15) {
            cnpj = t.value.replace(/\.|\-/g, '');
            console.log("CNPJ: ", cnpj)
            t.value = cnpj[0] + cnpj[1] + '.' + cnpj[2] + cnpj[3] + cnpj[4] + '.' + cnpj[5] + cnpj[6] + cnpj[7] + '/' + cnpj[8] + cnpj[9] + cnpj[10] + cnpj[11] + '-';
        }
    }
}
function mascara(t, mask) {
    let i = t.value.length;
    let saida = mask.substring(1, 0);
    let texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}
function cadastrar() {
    document.querySelector('#tabelaClientes').style.display = 'none';
    document.querySelector('#divDetalhes').style.display = 'none';
    document.querySelector('#display-cadastro').style.display = 'block';
}

function salvarCliente() {
    let clientes = [];
    let cliente = {
        nome: document.querySelector('#inputNome').value,
        cpfCnpj: document.querySelector('#inputCpfCnpj').value,
        email: document.querySelector('#inputEmail').value,
        telefone: document.querySelector('#inputTelefone').value,
        rua: document.querySelector('#inputRua').value,
        numero: document.querySelector('#inputNumero').value,
        cidade: document.querySelector('#inputCidade').value,
        cep: document.querySelector('#inputCep').value,
        estado: document.querySelector('#inputEstado').value,
        bairro: document.querySelector('#inputBairro').value,
    }

    if (localStorage.getItem('value') !== null) {
        clientes = JSON.parse(localStorage.getItem('value'));
    }

    try {

        clientes.push(cliente);
        localStorage.setItem('value', JSON.stringify(clientes));
        alert("Cliente Salvo!");

    } catch (error) {
        console.log("ERRO no Cadastro: ", error)
    }

}

function listarClientes() {
    document.querySelector('#display-cadastro').style.display = 'none';
    document.querySelector('#tabelaClientes').style.display = 'block';
    let tbody = document.getElementById('tbody');
    let clientes = []

    if (localStorage.getItem('value') !== null) {
        limparTabela();

        clientes = JSON.parse(localStorage.getItem('value'));
        for (let i = 0; i < clientes.length; i++) {
            let nome = clientes[i].nome,
                cpfCnpj = clientes[i].cpfCnpj,
                email = clientes[i].email,
                telefone = clientes[i].telefone

            tbody.innerHTML += '<tr id="rowTable' + i + '">' +
                '<td>' + nome + '</td>' +
                '<td>' + cpfCnpj + '</td>' +
                '<td>' + email + '</td>' +
                '<td>' + telefone + '</td>' +
                '<td ><button onclick="detalheCliente(' + i + ')" class="butao btnAcao">Detalhes</button>' +
                '<button onclick="atualizarCliente(' + i + ')" class="butao btnAcao">Alterar</button>' +
                '<button onclick="excluirCliente(' + i + ')" class="butao btnAcao">Excluir</button></td>' +
                '</tr>';
        }


    } else {
        limparTabela();
        console.log("Lista Vazia");

    }
}
function limparTabela() {
    let elements = document.querySelectorAll("#tbody tr")
    elements.forEach((element) => {
        element.parentNode.removeChild(element)
    });
}
function preencherInputs(cliente) {
    document.querySelector('#divDetalhes').style.display = 'block';

    document.querySelector('#inputDetalheNome').value = cliente.nome;
    document.querySelector('#inputDetalheCpfCnpj').value = cliente.cpfCnpj;
    document.querySelector('#inputDetalheEmail').value = cliente.email;
    document.querySelector('#inputDetalheTelefone').value = cliente.telefone;
    document.querySelector('#inputDetalheRua').value = cliente.rua;
    document.querySelector('#inputDetalheNumero').value = cliente.numero;
    document.querySelector('#inputDetalheCidade').value = cliente.cidade;
    document.querySelector('#inputDetalheCep').value = cliente.cep;
    document.querySelector('#inputDetalheEstado').value = cliente.estado;
    document.querySelector('#inputDetalheBairro').value = cliente.bairro;

}
// Ver Detalhes do Cliente
function detalheCliente(index) {
    clientes = JSON.parse(localStorage.getItem('value'));
    cliente = clientes[index];
    preencherInputs(cliente);
    document.querySelector('#btnEditar').style.display = 'none';
    document.querySelector('#btnCancelar').style.display = 'none';

    document.querySelector('#btnFechar').style.display = 'block';
}

// Fazer alterações
function atualizarCliente(index) {
    clientes = JSON.parse(localStorage.getItem('value'));
    cliente = clientes[index];
    preencherInputs(cliente);
    document.querySelector('#btnFechar').style.display = 'none';
    document.querySelector('#btnEditar').style.display = 'block';
    document.querySelector('#btnCancelar').style.display = 'block';

    document.querySelector('#btnEditar').addEventListener('click', function () {
        salvarAlteracao(index);
    });
    document.querySelector('#btnCancelar').addEventListener('click', function () {
        document.querySelector('#divDetalhes').style.display = 'none';
    });
}

// Salvar Alteração
function salvarAlteracao(index) {
    console.log("Chegou no salvar alteração");
    clientes = JSON.parse(localStorage.getItem('value'));
    cliente = clientes[index];

    clientes[index].nome = document.querySelector('#inputDetalheNome').value;
    clientes[index].cpfCnpj = document.querySelector('#inputDetalheCpfCnpj').value;
    clientes[index].email = document.querySelector('#inputDetalheEmail').value;
    clientes[index].telefone = document.querySelector('#inputDetalheTelefone').value;
    clientes[index].rua = document.querySelector('#inputDetalheRua').value;
    clientes[index].numero = document.querySelector('#inputDetalheNumero').value;
    clientes[index].cidade = document.querySelector('#inputDetalheCidade').value;
    clientes[index].estado = document.querySelector('#inputDetalheEstado').value;
    clientes[index].bairro = document.querySelector('#inputDetalheBairro').value;

    try {
        localStorage.setItem('value', JSON.stringify(clientes));
        alert("Cliente Alterado!");
        document.querySelector('#divDetalhes').style.display = 'none';
        listarClientes();


    } catch (error) {
        console.log("ERRO na Alteração: ", error)
    }


}

function excluirCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('value'));

    if (clientes.length > 0) {
        if (confirm("Confirma a Exclusão do Cliente?")) {
            for (var i = 0; i < clientes.length; i++) {
                if (i == index) {
                    clientes.splice(i, 1);
                }
            }
            localStorage.setItem('value', JSON.stringify(clientes));
            listarClientes();
        }

    } else {
        window.localStorage.removeItem("value");

    }

}