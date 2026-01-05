let perfil = JSON.parse(localStorage.getItem("perfil")) || {};

window.onload = () => {
  if (perfil.nome) {
    document.getElementById("nome").value = perfil.nome;
    document.getElementById("peso").value = perfil.peso;
    document.getElementById("altura").value = perfil.altura;
    document.getElementById("objetivo").value = perfil.objetivo;
    if (perfil.foto) {
      const img = document.getElementById("fotoPerfil");
      img.src = perfil.foto;
      img.style.display = "block";
    }
  }
};

function salvarPerfil() {
  perfil.nome = document.getElementById("nome").value;
  perfil.peso = document.getElementById("peso").value;
  perfil.altura = document.getElementById("altura").value;
  perfil.objetivo = document.getElementById("objetivo").value;

  localStorage.setItem("perfil", JSON.stringify(perfil));
  alert("Perfil salvo ✅");
}

function salvarFoto(input) {
  const reader = new FileReader();
  reader.onload = () => {
    perfil.foto = reader.result;
    localStorage.setItem("perfil", JSON.stringify(perfil));
    const img = document.getElementById("fotoPerfil");
    img.src = reader.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(input.files[0]);
}
