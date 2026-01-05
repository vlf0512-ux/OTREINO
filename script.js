const dias = ["segunda", "terca", "quarta", "quinta", "sexta"];
function getSemanaAtual() {
    const hoje = new Date();

    // ajusta para segunda-feira
    const dia = hoje.getDay() || 7; // domingo = 7
    hoje.setDate(hoje.getDate() - dia + 1);

    const ano = hoje.getFullYear();
    const primeiraSegunda = new Date(ano, 0, 1);
    const diff = hoje - primeiraSegunda;
    const semana = Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));

    return `${ano}-W${semana}`;
}
let semanaAtual = getSemanaAtual();

let treinos = {};

window.onload = () => {
    const semanaSalva = localStorage.getItem("semanaAtual");

if (semanaSalva !== semanaAtual) {
    localStorage.setItem("semanaAtual", semanaAtual);

    // aqui depois vamos resetar:
    // - dias concluídos
    // - água
}

    treinos = JSON.parse(localStorage.getItem("treinos")) || {};
    dias.forEach(dia => {
        treinos[dia] ||= [];

        // RESETAR CHECKBOXES AO RECARREGAR
        treinos[dia].forEach(ex => {
            ex.series.forEach(s => s.feito = false);
        });
    });
    atualizarSelect();

};


function mostrarTreino() {
    const dia = document.getElementById("dia").value;

    dias.forEach(d => {
        const el = document.getElementById(d);
        el.style.display = "none";
        el.classList.remove("ativo");
    });

    if (!dia) {
        document.getElementById("mensagemInicial").style.display = "block";
        return;
    }

    document.getElementById("mensagemInicial").style.display = "none";

    const atual = document.getElementById(dia);
    atual.style.display = "block";
    atual.classList.add("ativo");

    renderizarTreino(dia);
}

function adicionarExercicio() {
    const dia = document.getElementById("dia").value;
    const nome = document.getElementById("nomeExercicio").value.trim();
    if (!dia || !nome) return;

    treinos[dia].push({ nome, series: [] });
    document.getElementById("nomeExercicio").value = "";

    salvar();
    renderizarTreino(dia);
}

function removerExercicio(dia, index) {
    if (!confirm("Deseja apagar este exercício?")) return;
    treinos[dia].splice(index, 1);
    salvar();
    renderizarTreino(dia);
}

function adicionarSerie(dia, ex, peso) {
    treinos[dia][ex].series.push({ peso, feito: false });
    salvar();
    renderizarTreino(dia);
}

function editarSerie(dia, ex, serie) {
    const novoPeso = prompt(
        "Novo peso (kg):",
        treinos[dia][ex].series[serie].peso
    );
    if (!novoPeso) return;

    treinos[dia][ex].series[serie].peso = Number(novoPeso);
    salvar();
    renderizarTreino(dia);
}

function toggleSerie(dia, ex, serie) {
    treinos[dia][ex].series[serie].feito =
        !treinos[dia][ex].series[serie].feito;
    salvar();
    renderizarTreino(dia);
}

function renderizarTreino(dia) {
    const ul = document.querySelector(`#${dia} ul`);
    ul.innerHTML = "";

    treinos[dia].forEach((ex, i) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${ex.nome}</strong>
            <button onclick="removerExercicio('${dia}', ${i})">🗑️</button>
        `;

        ex.series.forEach((s, j) => {
            const div = document.createElement("div");
            div.className = `serie ${s.feito ? "concluida" : ""}`;

            const chk = document.createElement("input");
            chk.type = "checkbox";
            chk.checked = s.feito;
            chk.onchange = () => toggleSerie(dia, i, j);

            const span = document.createElement("span");
            span.textContent = `${s.peso} kg`;
            span.onclick = () => editarSerie(dia, i, j);

            div.appendChild(chk);
            div.appendChild(span);
            li.appendChild(div);
        });

        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Adicionar série (kg)";
        input.onkeydown = e => {
            if (e.key === "Enter" && input.value) {
                adicionarSerie(dia, i, Number(input.value));
                input.value = "";
            }
        };

        li.appendChild(input);
        ul.appendChild(li);
    });

    atualizarContador(dia);
}

function atualizarContador(dia) {
    const total = treinos[dia].length;
    document.getElementById(`contador-${dia}`).textContent =
        total ? `— ${total} exercícios` : "";
}

function salvar() {
    localStorage.setItem("treinos", JSON.stringify(treinos));
}
let diasFinalizados = JSON.parse(localStorage.getItem("diasFinalizados")) || {};

function finalizarTreino(dia) {
    if (!confirm("Marcar treino como concluído?")) return;

    diasFinalizados[dia] = true;
    salvarDias();
    atualizarSelect();
}

function salvarDias() {
    localStorage.setItem("diasFinalizados", JSON.stringify(diasFinalizados));
}
function atualizarSelect() {
    const select = document.getElementById("dia");

    [...select.options].forEach(opt => {
        if (diasFinalizados[opt.value]) {
            opt.style.backgroundColor = "#4CAF50";
            opt.style.color = "#fff";
        }
    });
}
// Inicializar hidratação
let agua = JSON.parse(localStorage.getItem("agua")) || 0;
const aguaAtual = document.getElementById("aguaAtual");
const aguaInicial = document.getElementById("aguaInicial");
atualizarAgua();

function adicionarAgua(valor) {
  agua += valor;
  salvarAgua();
  atualizarAgua();
}

function resetAgua() {
  if (!confirm("Deseja resetar a quantidade de água?")) return;
  agua = 0;
  salvarAgua();
  atualizarAgua();
}

function atualizarAgua() {
  aguaAtual.textContent = `${agua.toFixed(1)} L`;
}

function salvarAgua() {
  localStorage.setItem("agua", JSON.stringify(agua));
}

// Mostrar/esconder água conforme o dia
function mostrarTreino() {
  const dia = document.getElementById("dia").value;

  // esconder todos os dias
  dias.forEach(d => {
    const el = document.getElementById(d);
    el.style.display = "none";
    el.classList.remove("ativo");
  });

  if (!dia) {
    // Nenhum dia selecionado → mostrar água
    document.getElementById("mensagemInicial").style.display = "block";
    aguaInicial.style.display = "block";
    return;
  }

  // Quando escolher um dia → esconder água
  aguaInicial.style.display = "none";
  document.getElementById("mensagemInicial").style.display = "none";

  const atual = document.getElementById(dia);
  atual.style.display = "block";
  atual.classList.add("ativo");
  renderizarTreino(dia);
}
// Função para calcular quanto falta até a meia-noite
function agendarResetDiario() {
  const agora = new Date();
  const proximoDia = new Date();
  proximoDia.setHours(24, 0, 0, 0); // define 00:00 do próximo dia
  const tempoRestante = proximoDia - agora;

  setTimeout(() => {
    agua = 0;
    salvarAgua();
    atualizarAgua();
    agendarResetDiario(); // agenda o reset do próximo dia
  }, tempoRestante);
}

// Chamar ao carregar a página
agendarResetDiario();

function carregarPerfilResumo() {
  const perfil = JSON.parse(localStorage.getItem("perfil"));
  if (!perfil || !perfil.nome) return;

  document.getElementById("perfilResumo").style.display = "flex";
  document.getElementById("perfilNome").textContent = `👤 ${perfil.nome}`;

  let info = [];
  if (perfil.objetivo) info.push(`🎯 ${perfil.objetivo}`);
  if (perfil.peso) info.push(`⚖️ ${perfil.peso} kg`);
  if (perfil.altura) info.push(`📏 ${perfil.altura} cm`);

  document.getElementById("perfilInfo").textContent = info.join(" • ");

  if (perfil.foto) {
    const img = document.getElementById("perfilFoto");
    img.src = perfil.foto;
    img.style.display = "block";
  }
}
window.onload = () => {
  // código que você já tem
  carregarPerfilResumo();
};
