const senhaCorreta = "180322";
let fotos = JSON.parse(localStorage.getItem("fotos")) || {};

const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

/* ================= LOGIN SENHA ================= */
function verificarSenha() {
  const input = document.getElementById("senhaInput");
  const erro = document.getElementById("erroSenha");
  const senha = input.value;

  if (senha === senhaCorreta) {
    localStorage.setItem("logado", "true");

    document.getElementById("login").style.display = "none";
    document.getElementById("conteudo").style.display = "block";
    erro.style.display = "none";

    registrarFaceID(); // registra biometria
    mostrarMeses();
  } else {
    erro.style.display = "block";
    input.value = "";
    input.focus();

    if (navigator.vibrate) navigator.vibrate(120);
  }
}

/* ================= FACE ID ================= */
async function registrarFaceID() {
  if (!window.PublicKeyCredential) return;

  try {
    await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array(32),
        rp: { name: "Minha Evolução" },
        user: {
          id: new Uint8Array(16),
          name: "usuario",
          displayName: "Usuário"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required"
        },
        timeout: 60000
      }
    });

    localStorage.setItem("faceid", "true");
  } catch (e) {
    console.log("Face ID não registrado:", e);
  }
}

async function loginComFaceID() {
  if (!window.PublicKeyCredential) {
    alert("Face ID não disponível neste dispositivo.");
    return;
  }

  try {
    const cred = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: "required"
      }
    });

    if (cred) {
      localStorage.setItem("logado", "true");

      document.getElementById("login").style.display = "none";
      document.getElementById("conteudo").style.display = "block";
      mostrarMeses();
    }
  } catch (e) {
    console.log("Autenticação cancelada");
  }
}

/* ================= AUTO LOGIN ================= */
window.onload = () => {
  if (localStorage.getItem("logado") === "true") {
    document.getElementById("login").style.display = "none";
    document.getElementById("conteudo").style.display = "block";
    mostrarMeses();
  }
};

/* ================= ENTER / DONE ================= */
document.getElementById("senhaInput").addEventListener("keydown", e => {
  if (e.key === "Enter") verificarSenha();
});

/* ================= MESES ================= */
function mostrarMeses() {
  const container = document.getElementById("mesesContainer");
  container.innerHTML = "";

  meses.forEach(mes => {
    const div = document.createElement("div");
    div.className = "mes-card";
    div.innerHTML = `
      <h3>${mes}</h3>
      <div class="fotos"></div>
      <input type="file" accept="image/*" onchange="adicionarFoto('${mes.toLowerCase()}', this.files[0])">
    `;
    container.appendChild(div);

    if (fotos[mes.toLowerCase()]) {
      fotos[mes.toLowerCase()].forEach((f, idx) => {
        const img = document.createElement("img");
        img.src = f;
        img.onclick = () => abrirModal(f);

        const btn = document.createElement("button");
        btn.textContent = "🗑️";
        btn.className = "btnDel";
        btn.onclick = e => {
          e.stopPropagation();
          apagarFoto(mes.toLowerCase(), idx);
        };

        const wrap = document.createElement("div");
        wrap.className = "foto-wrapper";
        wrap.appendChild(img);
        wrap.appendChild(btn);

        div.querySelector(".fotos").appendChild(wrap);
      });
    }
  });
}

/* ================= FOTOS ================= */
function adicionarFoto(mes, arquivo) {
  const reader = new FileReader();
  reader.onload = () => {
    if (!fotos[mes]) fotos[mes] = [];
    fotos[mes].push(reader.result);
    salvarFotos();
    mostrarMeses();
  };
  reader.readAsDataURL(arquivo);
}

function apagarFoto(mes, idx) {
  if (!confirm("Deseja apagar esta foto?")) return;
  fotos[mes].splice(idx, 1);
  salvarFotos();
  mostrarMeses();
}

function salvarFotos() {
  localStorage.setItem("fotos", JSON.stringify(fotos));
}

/* ================= MODAL ================= */
const modal = document.getElementById("modal");
const imgModal = document.getElementById("imgModal");

function abrirModal(src) {
  modal.style.display = "flex";
  imgModal.src = src;
}

function fecharModal() {
  modal.style.display = "none";
}
