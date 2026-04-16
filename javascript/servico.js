const cortes = document.querySelectorAll("#servico section");
const extras = document.querySelectorAll(".extras input");

const totalEl = document.getElementById("total");
const tempoEl = document.getElementById("tempo");
const btn = document.getElementById("continuar");

let corteSelecionado = null;

/* SELECIONAR CORTE */
cortes.forEach(corte => {
  corte.addEventListener("click", () => {

    cortes.forEach(c => c.classList.remove("ativo"));
    corte.classList.add("ativo");

    corteSelecionado = {
      nome: corte.dataset.nome,
      valor: Number(corte.dataset.valor),
      tempo: Number(corte.dataset.tempo)
    };

    atualizarResumo();
  });
});

/* ATUALIZAR RESUMO */
function atualizarResumo() {

  if (!corteSelecionado) return;

  let total = corteSelecionado.valor;
  let tempo = corteSelecionado.tempo;

  extras.forEach(extra => {
    if (extra.checked) {
      total += Number(extra.dataset.valor);
      tempo += Number(extra.dataset.tempo);
    }
  });

  totalEl.innerText = `Total: R$ ${total}`;
  tempoEl.innerText = `Tempo: ${tempo} min`;
}

/* EVENTO EXTRAS */
extras.forEach(extra => {
  extra.addEventListener("change", atualizarResumo);
});

/* CONTINUAR */
btn.addEventListener("click", () => {

  if (!corteSelecionado) {
    alert("Escolha um corte!");
    return;
  }

  let extrasSelecionados = [];
  let total = corteSelecionado.valor;
  let tempo = corteSelecionado.tempo;

  extras.forEach(extra => {
    if (extra.checked) {
      extrasSelecionados.push(extra.dataset.nome);
      total += Number(extra.dataset.valor);
      tempo += Number(extra.dataset.tempo);
    }
  });

  const dados = {
    servico: corteSelecionado.nome,
    extras: extrasSelecionados,
    valor: total,
    tempo: tempo
  };

  localStorage.setItem("agendamento", JSON.stringify(dados));

  window.location.href = "agendamento.html";
});