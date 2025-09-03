
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Treino</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      padding: 20px;
      color: #333;
    }

    h1 {
      text-align: center;
    }

    select, input, button {
      margin: 5px 0;
      padding: 10px;
      font-size: 16px;
    }

    .treino {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-top: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .exercicio {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
    }
  </style>
</head>
<body>
  <h1>💪 Meu Treino</h1>

  <label for="dia">Selecione o dia:</label>
  <select id="dia" onchange="carregarTreino()">
    <option value="segunda">Segunda-feira</option>
    <option value="terca">Terça-feira</option>
    <option value="quarta">Quarta-feira</option>
    <option value="quinta">Quinta-feira</option>
    <option value="sexta">Sexta-feira</option>
    <option value="sabado">Sábado</option>
    <option value="domingo">Domingo</option>
  </select>

  <div id="treino" class="treino"></div>

  <script>
    // Treinos do Mestre
    const treinos = {
      segunda: ["Supino inclinado", "Puxada alta", "Crucifixo máquina","Remada curvada","Posterior de ombro","Rosca alternada","Tríceps francês"],
      terca: ["Agachamento","Cadeira flexora","Cadeira extensora","Mesa flexora","Panturrilha sentado"],
      quarta: ["Cardio"],
      quinta: ["Puxada alta","Supino inclinado","Cerrote","Supino reto","Elevação lateral","Tríceps testa","Bíceps sentado"],
      sexta: ["Stiff","Leg press","Cadeira flexora","Cadeira extensora","Panturrilha em pé"],
      sabado: ["Descanso"],
      domingo: ["Descanso"]
    };

    // Carregar treino
    function carregarTreino() {
      const dia = document.getElementById("dia").value;
      const treinoDiv = document.getElementById("treino");
      treinoDiv.innerHTML = "";

      if (treinos[dia].length === 1 && treinos[dia][0].toLowerCase() === "descanso") {
        treinoDiv.innerHTML = "<h3>Dia de descanso 😴</h3>";
        return;
      }

      treinos[dia].forEach(exercicio => {
        const pesosSalvos = localStorage.getItem(`${dia}-${exercicio}`) || "";
        treinoDiv.innerHTML += `
          <div class="exercicio">
            <label>${exercicio}</label>
            <input type="text" placeholder="PESO" value="${pesosSalvos}"
              onchange="salvarPeso('${dia}','${exercicio}', this.value)">
          </div>
        `;
      });
    }

    // Salvar pesos no navegador
    function salvarPeso(dia, exercicio, pesos) {
      localStorage.setItem(`${dia}-${exercicio}`, pesos);
    }

    // Carrega treino do dia inicial
    window.onload = carregarTreino;
  </script>
</body>
</html>
