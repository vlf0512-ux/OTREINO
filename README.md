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

    /* Estilo para as abas de kg */
    .kg-abas {
      display: flex;
      justify-content: space-between;
      gap: 2px;  /* Reduzindo o espaço entre as séries */
    }

    .kg-abas input {
      width: 22%;  /* Reduzindo o tamanho das caixas para as abas de série */
      padding: 5px;
      font-size: 14px;
      margin: 0;  /* Removendo qualquer margem extra */
    }

    .kg-label {
      font-size: 14px;
      color: #fff;
      margin-top: 5px;
      text-align: center;
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
          // Recupera os kg salvos das 4 séries (se existir)
          const kg1 = localStorage.getItem(`${dia}-${exercicio}-kg1`) || "";
          const kg2 = localStorage.getItem(`${dia}-${exercicio}-kg2`) || "";
          const kg3 = localStorage.getItem(`${dia}-${exercicio}-kg3`) || "";
          const kg4 = localStorage.getItem(`${dia}-${exercicio}-kg4`) || "";

          treinoDiv.innerHTML += `
            <div class="exercicio">
              <label>${exercicio}</label>
              <div class="kg-abas">
                <input type="number" placeholder="Série 1" value="${kg1}" 
                  oninput="atualizarKg('${dia}', '${exercicio}', 1, this)">
                <input type="number" placeholder="Série 2" value="${kg2}" 
                  oninput="atualizarKg('${dia}', '${exercicio}', 2, this)">
                <input type="number" placeholder="Série 3" value="${kg3}" 
                  oninput="atualizarKg('${dia}', '${exercicio}', 3, this)">
                <input type="number" placeholder="Série 4" value="${kg4}" 
                  oninput="atualizarKg('${dia}', '${exercicio}', 4, this)">
              </div>
              <div class="kg-label">kg</div> <!-- Adicionando o "kg" separadamente -->
            </div>
          `;
        });
      }
    }

    // Função para salvar o kg de cada série no navegador
    function salvarKg(dia, exercicio, serie, kg) {
      localStorage.setItem(`${dia}-${exercicio}-kg${serie}`, kg);
    }

    // Função para atualizar o kg exibido no campo
    function atualizarKg(dia, exercicio, serie, input) {
      let valorKg = input.value.trim();

      // Se o valor estiver vazio, não faça nada
      if (valorKg === "") {
        input.value = "";
        return;
      }

      // Verifica se é um número
      if (!isNaN(valorKg)) {
        salvarKg(dia, exercicio, serie, valorKg);  // Salva o valor numérico
      }
    }

    // Carrega o treino do dia inicial
    window.onload = carregarTreino;
  </script>
</body>
</html>
