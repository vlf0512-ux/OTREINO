const senhaCorreta = "180322";
let fotos = JSON.parse(localStorage.getItem("fotos")) || {};

const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

function verificarSenha() {
    const input = document.getElementById("senhaInput");
    const erro = document.getElementById("erroSenha");
    const senha = input.value;

    if (senha === senhaCorreta) {
        document.getElementById("login").style.display = "none";
        document.getElementById("conteudo").style.display = "block";
        erro.style.display = "none";
        mostrarMeses();
    } else {
        erro.style.display = "block";
        input.value = "";
        input.focus();

        // Vibração no celular
        if (navigator.vibrate) {
            navigator.vibrate(120);
        }
    }
}


// Mostrar meses
function mostrarMeses() {
    const container = document.getElementById("mesesContainer");
    container.innerHTML = "";

    meses.forEach(mes => {
        const div = document.createElement("div");
        div.className = "mes-card";
        div.innerHTML = `<h3>${mes}</h3>
            <div class="fotos"></div>
            <input type="file" accept="image/*" onchange="adicionarFoto('${mes.toLowerCase()}', this.files[0])">`;
        container.appendChild(div);

        // mostrar fotos
        if (fotos[mes.toLowerCase()]) {
            fotos[mes.toLowerCase()].forEach((f, idx) => {
                const img = document.createElement("img");
                img.src = f;
                img.alt = `${mes} foto ${idx+1}`;
                img.onclick = () => abrirModal(f);
                
                // botão apagar
                const btnDel = document.createElement("button");
                btnDel.textContent = "🗑️";
                btnDel.className = "btnDel";
                btnDel.onclick = (e) => {
                    e.stopPropagation();
                    apagarFoto(mes.toLowerCase(), idx);
                }

                const wrapper = document.createElement("div");
                wrapper.className = "foto-wrapper";
                wrapper.appendChild(img);
                wrapper.appendChild(btnDel);

                div.querySelector(".fotos").appendChild(wrapper);
            });
        }
    });
}

// Adicionar foto
function adicionarFoto(mes, arquivo) {
    const reader = new FileReader();
    reader.onload = function() {
        if (!fotos[mes]) fotos[mes] = [];
        fotos[mes].push(reader.result);
        salvarFotos();
        mostrarMeses();
    }
    reader.readAsDataURL(arquivo);
}

// Apagar foto
function apagarFoto(mes, idx) {
    if (!confirm("Deseja apagar esta foto?")) return;
    fotos[mes].splice(idx,1);
    salvarFotos();
    mostrarMeses();
}

// Salvar no localStorage
function salvarFotos() {
    localStorage.setItem("fotos", JSON.stringify(fotos));
}

// Modal para expandir
const modal = document.getElementById("modal");
const imgModal = document.getElementById("imgModal");

function abrirModal(src) {
    modal.style.display = "block";
    imgModal.src = src;
}

function fecharModal() {
    modal.style.display = "none";
}

// Permitir Enter / Done para entrar
document.getElementById("senhaInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        verificarSenha();
    }
});
