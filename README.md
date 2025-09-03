<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Treino</title>
  <link rel="stylesheet" href="style.css">

  <!-- Fonte do Google -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #4b4858;
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
      background: rgb(51, 43, 43);
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

    h3 {
      color: #fff;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>TREINO SEMANAL <br>(Victor Lima)</h1>

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
    // Treinos organizados por tipo de treino
    const treinos = {
      segunda: {
        superior: ["Supino Inclinado", "Puxada Alta", "Crucifixo Máquina", "Remada Curvada", "Posterior de Ombro", "Rosca Alternada", "Tríceps Francês"],
      },
      terca: {
        inferior: ["Agachamento", "Cadeira Flexora", "Cadeira Extensora", "Mesa Flexora", "Panturrilha Sentado"],
      },
      quarta: {
        cardio: ["Cardio"],  // Cardio para todo o corpo
      },
      quinta: {
        superior: ["Puxada Alta", "Supino Inclinado", "Cerrote", "Supino Reto", "Elevação Lateral", "Tríceps Testa", "Bíceps Sentado"],
      },
      sexta: {
        inferior: ["Stiff", "Leg Press", "Cadeira Flexora", "Cadeira Extensora", "Panturrilha Em Pé"],
      },
      sabado: {
        descanso: ["Descanso"],
      },
      domingo: {
        descanso: ["Descanso"],
      }
    };

    // Função para carregar o treino do dia
    function carregarTreino() {
      const dia = document.getElementById("dia").value;
      const treinoDiv = document.getElementById("treino");
      treinoDiv.innerHTML = "";

      // Verifica se o dia é de descanso
      if (treinos[dia].descanso) {
        treinoDiv.innerHTML = "<h3>Dia de descanso 😴</h3>";
        return;
      }

      // Para cada tipo de treino (superior/inferior/cardio)
      for (const tipo in treinos[dia]) {
        // Exibe o título (superior, inferior ou cardio)
        treinoDiv.innerHTML += `<h3>${tipo.toUpperCase()}</h3>`;
        
        // Exibe os exercícios dentro de cada tipo
        treinos[dia][tipo].forEach(exercicio => {
          const pesosSalvos = localStorage.getItem(`${dia}-${exercicio}`) || "";
          treinoDiv.innerHTML += `
            <div class="exercicio">
              <label>${exercicio}</label>
              <input type="text" placeholder="PESO" value="${pesosSalvos}" 
                onchange="salvarPeso('${dia}', '${exercicio}', this.value)">
            </div>
          `;
        });
      }
    }

    // Função para salvar os pesos no navegador
    function salvarPeso(dia, exercicio, pesos) {
      localStorage.setItem(`${dia}-${exercicio}`, pesos);
    }

    // Carrega o treino do dia inicial
    window.onload = carregarTreino;
  </script>
</body>
</html>
