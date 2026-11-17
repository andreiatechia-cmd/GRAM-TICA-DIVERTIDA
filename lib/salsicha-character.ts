export interface SalsichaReaction {
  text: string;
  emotion: 'happy' | 'excited' | 'sad' | 'crying' | 'idle';
  soundEmotion: 'happy' | 'sad' | 'excited';
  subtitle: string;
}

export const SALSICHA_CORRECT_QUOTES: SalsichaReaction[] = [
  {
    text: 'Caramba, bicho! Você acertou em cheio! Mandou bem demais na gramática, cara!',
    emotion: 'excited',
    soundEmotion: 'excited',
    subtitle: '🎉 "Caramba, bicho! Acertou em cheio na língua portuguesa!"'
  },
  {
    text: 'Zoinks! Essa foi espetacular, cara! Merecemos até um super sanduíche de comemoração!',
    emotion: 'happy',
    soundEmotion: 'happy',
    subtitle: '🥪 "Zoinks! Merecemos um super lanche de campeão!"'
  },
  {
    text: 'Nossa bicho! Que jogada genial! Você conhece todas as palavras da nossa língua!',
    emotion: 'excited',
    soundEmotion: 'excited',
    subtitle: '⭐ "Nossa bicho! Você é um verdadeiro mestre das palavras!"'
  },
  {
    text: 'Puxa vida, cara! Você tá voando na língua portuguesa, hein! Mandou super bem!',
    emotion: 'happy',
    soundEmotion: 'happy',
    subtitle: '🚀 "Puxa vida! Você tá voando nas respostas!"'
  },
  {
    text: 'Caraca, bicho! O Scooby ia ficar dando pulos de orgulho com essa pontuação!',
    emotion: 'excited',
    soundEmotion: 'excited',
    subtitle: '🐕 "Caraca! O Scooby ia ficar morrendo de orgulho!"'
  },
  {
    text: 'Que espetáculo! Você acertou a classe da palavra direitinho! Que gênio!',
    emotion: 'excited',
    soundEmotion: 'excited',
    subtitle: '✨ "Que espetáculo! Acertou em cheio a palavra!"'
  }
];

export const SALSICHA_WRONG_QUOTES: SalsichaReaction[] = [
  {
    text: 'Puxa vida, bicho... essa a gente errou... Fiquei tão tristinho que até meu lanche esfriou...',
    emotion: 'sad',
    soundEmotion: 'sad',
    subtitle: '😢 "Puxa vida, bicho... fiquei tristinho... mas vamos de novo!"'
  },
  {
    text: 'Ai ai ai, cara... que tristeza! Deu até nó na minha língua, mas não desiste, você consegue!',
    emotion: 'crying',
    soundEmotion: 'sad',
    subtitle: '😭 "Ai ai ai, que tristeza... não desiste, tente de novo!"'
  },
  {
    text: 'Oh não, cara... que pena! Deu um aperto no coração aqui, bicho... Mas errar faz parte do aprendizado!',
    emotion: 'sad',
    soundEmotion: 'sad',
    subtitle: '💔 "Oh não, cara... mas errar faz parte, vamos tentar!"'
  },
  {
    text: 'Poxa vida, meu... quase caí duro de tristeza! Mas calma, bicho, respira fundo que a próxima é sua!',
    emotion: 'crying',
    soundEmotion: 'sad',
    subtitle: '🥺 "Poxa vida... respira fundo que na próxima você brilha!"'
  },
  {
    text: 'Caramba, cara... essa doeu no fundo da alma... Mas vamos lá, cabeça erguida, bicho!',
    emotion: 'sad',
    soundEmotion: 'sad',
    subtitle: '💧 "Essa doeu, bicho... cabeça erguida e foco na missão!"'
  }
];

export const SALSICHA_IDLE_QUOTES: SalsichaReaction[] = [
  {
    text: 'E aí, bicho! Eu sou o Salsicha! Vamos nos divertir e aprender um montão de gramática da língua portuguesa?',
    emotion: 'idle',
    soundEmotion: 'happy',
    subtitle: '🥪 "E aí bicho! Bora aprender português e brincar?"'
  },
  {
    text: 'Zoinks! Tô de olho em você, cara! Escolhe a resposta com carinho e ganhe muitas estrelas!',
    emotion: 'idle',
    soundEmotion: 'happy',
    subtitle: '👀 "Zoinks! Tô torcendo por você, cara!"'
  },
  {
    text: 'Bicho, eu adoro palavras bonitas e sanduíches gigantes! Qual desafio vamos encarar agora?',
    emotion: 'idle',
    soundEmotion: 'happy',
    subtitle: '🎈 "Qual desafio vamos encarar juntos agora?"'
  }
];

export function getRandomReaction(type: 'correct' | 'wrong' | 'idle'): SalsichaReaction {
  if (type === 'correct') {
    const idx = Math.floor(Math.random() * SALSICHA_CORRECT_QUOTES.length);
    return SALSICHA_CORRECT_QUOTES[idx];
  }
  if (type === 'wrong') {
    const idx = Math.floor(Math.random() * SALSICHA_WRONG_QUOTES.length);
    return SALSICHA_WRONG_QUOTES[idx];
  }
  const idx = Math.floor(Math.random() * SALSICHA_IDLE_QUOTES.length);
  return SALSICHA_IDLE_QUOTES[idx];
}
