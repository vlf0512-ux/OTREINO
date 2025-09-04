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
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #4b4858, #2e2c38);
      padding: 20px;
      color: #f0f0f0;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    select, input {
      margin: 5px 0;
      padding: 10px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #666;
    }

    .treino {
      background: rgb(51, 43, 43);
      padding: 20px;
      border-radius: 10px;
      margin-top: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    }

    .exercicio {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #fff;
    }

    h3 {
      color: #ffeb3b;
      margin-top: 20px;
    }

    /* Caixinhas pequenas lado a lado */
    .pesos {
      display: flex;
      gap: 8px;
    }

    .pesos input {
      width: 70px;
      padding: 5px;
      text-align: center;
    }

    /* Feedback visual quando salva */
    .salvo {
      border: 2px solid #4caf50 !important;
      background: #e8f5e9;
      color: #000;
    }

    /* Responsividade */
    @media (max-width: 600px) {
      .pesos {
        flex-direction: column;
      }
      .pesos input {
        width: 100%;
      }
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
    const treinos = {
      segunda: { superior: ["Supino Inclinado", "Puxada Alta", "Crucifixo Máquina","Remada Curvada","Posterior De Ombro","Rosca Alternada","Triceps Frances"] },
      terca: { inferior: ["Agachamento", "Cadeira Flexora", "Cadeira Extensora","Mesa Flexora","Panturrilha Sentado"] },
      quarta: { cardio: ["Cardio"] },
      quinta: { superior: ["Puxada Alta","Supino Inclinado","Cerrote","Supino Reto","Elevação Lateral","Triceps Testa","Biceps Scott"] },
      sexta: { inferior: ["Stiff","Leg Press","Cadeira Flexora","Cadeira Extensora", "Panturrilha Em Pé"] },
      sabado: { descanso: ["Descanso"] },
      domingo: { descanso: ["Descanso"]}
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

      // Para cada categoria de treino do dia
      for (const categoria in treinos[dia]) {
        treinoDiv.innerHTML += `<h3>${categoria.toUpperCase()}</h3>`;
        
        treinos[dia][categoria].forEach(exercicio => {
          treinoDiv.innerHTML += `
            <div class="exercicio">
              <label>${exercicio}</label>
              <div class="pesos">
                ${[1,2,3,4].map(i => {
                  const pesoSalvo = localStorage.getItem(`${dia}-${exercicio}-rep${i}`) || "";
                  return `<input type="text" value="${pesoSalvo}" onkeydown="formatarPeso(event, '${dia}', '${exercicio}', ${i}, this)">`;
                }).join("")}
              </div>
            </div>
          `;
        });
      }
    }

    // Função para formatar e salvar o peso + ir para a próxima caixinha
    function formatarPeso(event, dia, exercicio, rep, input) {
      if (event.key === "Enter") {
        let valor = input.value.replace("kg", "").trim();
        if (valor && !isNaN(valor)) {
          input.value = valor + " kg";
          localStorage.setItem(`${dia}-${exercicio}-rep${rep}`, input.value);

          // Feedback visual
          input.classList.add("salvo");
          setTimeout(() => input.classList.remove("salvo"), 600);

          // Pega a próxima caixinha dentro do mesmo exercício
          const proximo = input.parentElement.querySelectorAll("input")[rep]; 
          if (proximo) {
            proximo.focus(); // move o cursor para a próxima
          }
        }
        event.preventDefault(); // evita pular linha
      }
    }

    // Carrega o treino do dia inicial
    window.onload = carregarTreino;
  </script>
</body>
</html>
