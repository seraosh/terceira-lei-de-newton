function calculateAccelerationAndForceBetweenObjects(forceApplied, massA, massB) {
    const totalMass = massA + massB;
    const acceleration = forceApplied / totalMass;
    const forceBetweenObjects = massB * acceleration;
    
    return {
      acceleration: acceleration,
      forceBetweenObjects: forceBetweenObjects
    };
  }
  
  async function getGPT3Feedback(prompt) {
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/completions";
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    const data = {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.5
    };
  
    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Erro ao obter feedback do GPT-3:', error);
      return 'Houve um erro ao obter feedback do GPT-3.';
    }
  }
  
  const form = document.getElementById('calculator-form');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const forceApplied = parseFloat(document.getElementById('forceApplied').value);
    const massA = parseFloat(document.getElementById('massA').value);
    const massB = parseFloat(document.getElementById('massB').value);
  
    const { acceleration, forceBetweenObjects } = calculateAccelerationAndForceBetweenObjects(forceApplied, massA, massB);
  
    document.getElementById('accelerationResult').textContent = `A aceleração resultante é ${acceleration.toFixed(2)} m/s².`;
    document.getElementById('forceResult').innerHTML = `A força entre os blocos A e B é ${forceBetweenObjects.toFixed(2)} N.`;
  
    const feedbackPrompt = `A força aplicada é de ${forceApplied} N, a massa do bloco A é de ${massA} kg e a massa do bloco B é de ${massB} kg. A aceleração resultante é de ${acceleration.toFixed(2)} m/s² e a força entre os blocos A e B é de ${forceBetweenObjects.toFixed(2)} N. Por favor, forneça um feedback sobre esses resultados COM NO MÁXIMO 200 CARACTERES.`;
    const gpt3Feedback = await getGPT3Feedback(feedbackPrompt);
  
    const feedbackElement = document.createElement('p');
    feedbackElement.textContent = `Feedback: ${gpt3Feedback}`;
    document.querySelector('.result-container').appendChild(feedbackElement);
  });
  