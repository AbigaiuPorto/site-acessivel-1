document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    // Campos (ADAPTADOS)
    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const nascimento = document.getElementById("nascimento");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const numero = document.getElementById("numero");
    const rua = document.getElementById("rua");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");

    const radiosSexo = document.querySelectorAll('input[name="sexo"]');

    // Limpa erros anteriores
    limparErro(nome, "erro-nome");
    limparErro(cpf, "erro-cpf");
    limparErro(nascimento, "erro-nascimento");
    limparErro(email, "erro-email");
    limparErro(telefone, "erro-telefone");
    limparErro(cep, "erro-cep");
    limparErroRadio(radiosSexo, "erro-sexo");
    limparErro(numero, "erro-numero");
    limparErro(rua, "erro-rua");
    limparErro(cidade, "erro-cidade");
    limparErro(estado, "erro-estado");

    // Validação nome
    if (!nome.value.trim()) {
      mostrarErro(nome, "erro-nome", "O nome é obrigatório.");
      valido = false;
    } else if (nome.value.trim().length < 2) {
      mostrarErro(nome, "erro-nome", "O nome deve ter ao menos 2 caracteres.");
      valido = false;
    }

    // Validação CPF
    if (!cpf.value.trim()) {
      mostrarErro(cpf, "erro-cpf", "O CPF é obrigatório.");
      valido = false;
    } else if (!validarCPF(cpf.value.trim())) {
      mostrarErro(cpf, "erro-cpf", "Digite um CPF válido.");
      valido = false;
    }

    // Validação nascimento
    if (!nascimento.value) {
      mostrarErro(nascimento, "erro-nascimento", "A data de nascimento é obrigatória.");
      valido = false;
    }

    // Validação sexo
    const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
    if (!sexoSelecionado) {
      mostrarErroRadio(radiosSexo, "erro-sexo", "Selecione uma opção de sexo.");
      valido = false;
    }

    // Validação email
    if (!email.value.trim()) {
      mostrarErro(email, "erro-email", "O e-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email.value.trim())) {
      mostrarErro(email, "erro-email", "Digite um e-mail válido.");
      valido = false;
    }

    // Validação telefone
    if (!telefone.value.trim()) {
      mostrarErro(telefone, "erro-telefone", "O telefone é obrigatório.");
      valido = false;
    } else {
      const telefoneLimpo = telefone.value.replace(/\D/g, "");
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        mostrarErro(telefone, "erro-telefone", "Digite um telefone com DDD válido.");
        valido = false;
      }
    }

    // Validação CEP
    if (!cep.value.trim()) {
      mostrarErro(cep, "erro-cep", "O CEP é obrigatório.");
      valido = false;
    } else if (!validarCEP(cep.value.trim())) {
      mostrarErro(cep, "erro-cep", "Digite um CEP válido no formato 00000-000.");
      valido = false;
    }
    // Número
if (!numero.value.trim()) {
  mostrarErro(numero, "erro-numero", "O número é obrigatório.");
  valido = false;
}

// Rua
if (!rua.value.trim()) {
  mostrarErro(rua, "erro-rua", "A rua é obrigatória.");
  valido = false;
}

// Cidade
if (!cidade.value.trim()) {
  mostrarErro(cidade, "erro-cidade", "A cidade é obrigatória.");
  valido = false;
}

// Estado
if (!estado.value.trim()) {
  mostrarErro(estado, "erro-estado", "O estado é obrigatório.");
  valido = false;
} else if (estado.value.trim().length !== 2) {
  mostrarErro(estado, "erro-estado", "Use a sigla (ex: SP).");
  valido = false;
}
    // Foca no primeiro erro
    if (!valido) {
      const primeiroErro = form.querySelector("[aria-invalid='true']");
      if (primeiroErro) {
        primeiroErro.focus();
      } else if (radiosSexo.length > 0) {
        const erroSexo = document.getElementById("erro-sexo");
        if (erroSexo && erroSexo.textContent.trim() !== "") {
          radiosSexo[0].focus();
        }
      }
      return;
    }

    alert("Formulário enviado com sucesso!");
    form.reset();
    limparTodosOsErros();
  });

  function mostrarErro(campo, idErro, mensagem) {
    campo.setAttribute("aria-invalid", "true");

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = mensagem;
    }
  }

  function limparErro(campo, idErro) {
    if (campo) {
      campo.removeAttribute("aria-invalid");
    }

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = "";
    }
  }

  function mostrarErroRadio(radios, idErro, mensagem) {
    radios.forEach((radio) => {
      radio.setAttribute("aria-invalid", "true");
    });

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = mensagem;
    }
  }

  function limparErroRadio(radios, idErro) {
    radios.forEach((radio) => {
      radio.removeAttribute("aria-invalid");
    });

    const erro = document.getElementById(idErro);
    if (erro) {
      erro.textContent = "";
    }
  }

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function validarCEP(valor) {
    return /^\d{5}-?\d{3}$/.test(valor);
  }

  function validarCPF(valor) {
    const cpf = valor.replace(/\D/g, "");
    return cpf.length === 11;
  }

  function limparTodosOsErros() {
    const mensagensErro = document.querySelectorAll(".error");
    mensagensErro.forEach((erro) => {
      erro.textContent = "";
    });

    const camposInvalidos = document.querySelectorAll("[aria-invalid='true']");
    camposInvalidos.forEach((campo) => {
      campo.removeAttribute("aria-invalid");
    });
  }
});
const botao = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

botao.addEventListener("click", () => {
  menu.classList.toggle("ativo");

  const aberto = menu.classList.contains("ativo");
  botao.setAttribute("aria-expanded", aberto);
});
'use strict';

let tamanhoAtual = parseInt(localStorage.getItem("fonte")) || 16;

const tamanhoPadrao = 16;
const tamanhoMin = 12;
const tamanhoMax = 24;

function aplicarFonte() {
  document.documentElement.style.setProperty("--base-font", tamanhoAtual + "px");
  localStorage.setItem("fonte", tamanhoAtual);
}

function aumentarFonte() {
  if (tamanhoAtual < tamanhoMax) {
    tamanhoAtual += 2;
    aplicarFonte();
  }
}

function diminuirFonte() {
  if (tamanhoAtual > tamanhoMin) {
    tamanhoAtual -= 2;
    aplicarFonte();
  }
}

function fontePadrao() {
  tamanhoAtual = tamanhoPadrao;
  localStorage.removeItem("fonte");
  aplicarFonte();
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("aumentar")?.addEventListener("click", aumentarFonte);
  document.getElementById("diminuir")?.addEventListener("click", diminuirFonte);
  document.getElementById("padrao")?.addEventListener("click", fontePadrao);

  aplicarFonte();
});