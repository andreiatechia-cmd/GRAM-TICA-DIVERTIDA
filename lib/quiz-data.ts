export interface QuizQuestion {
  id: string;
  category: 'vocabulary' | 'grammar' | 'phrases' | 'daily' | 'false_friends';
  categoryLabel: string;
  categoryEmoji: string;
  level: 'iniciante' | 'básico';
  direction: 'en_to_pt' | 'pt_to_en' | 'complete_sentence';
  // Prompt information
  promptText: string;
  promptSubtext?: string;
  promptLang: 'en' | 'pt';
  promptAudioText?: string;
  promptAudioLang?: 'en' | 'pt';
  contextEmoji?: string;
  // Multiple choice options
  options: {
    id: string;
    text: string;
    audioText?: string;
    audioLang?: 'en' | 'pt';
    hint?: string;
  }[];
  correctOptionId: string;
  // Deep explanation of errors and learning tips
  explanation: {
    correctTitle: string;
    correctReason: string;
    // Specific breakdown explaining why each wrong answer is incorrect
    wrongExplanations: Record<string, string>;
    grammarTip?: string;
    exampleSentenceEn: string;
    exampleSentencePt: string;
    pronunciationTip?: string;
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Vocabulary / False Friend: Parents
  {
    id: 'q1',
    category: 'false_friends',
    categoryLabel: 'Falso Cognato',
    categoryEmoji: '⚠️',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'O que significa a palavra em inglês "PARENTS"?',
    promptSubtext: '"My parents are doctors."',
    promptLang: 'pt',
    promptAudioText: 'My parents are doctors.',
    promptAudioLang: 'en',
    contextEmoji: '👨‍👩‍👦',
    options: [
      { id: 'opt_a', text: 'Parentes (tios, primos, etc.)', hint: 'Erro muito comum!' },
      { id: 'opt_b', text: 'Pais (mãe e pai)', hint: 'Refere-se ao pai e mãe juntos.' },
      { id: 'opt_c', text: 'Padrinhos' },
      { id: 'opt_d', text: 'Avós' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Parents" significa "Pais" (Mãe e Pai)!',
      correctReason: 'Em inglês, "Parents" é um clássico falso amigo (falso cognato). Parece "parentes", mas significa exclusivamente pai e mãe juntos.',
      wrongExplanations: {
        opt_a: '"Parentes" em inglês se diz "RELATIVES" (ex: "My relatives live in Brazil").',
        opt_c: '"Padrinhos" em inglês são chamados de "GODPARENTS" (godmother = madrinha, godfather = padrinho).',
        opt_d: '"Avós" em inglês são "GRANDPARENTS" (grandmother = avó, grandfather = avô).'
      },
      grammarTip: 'Lembrete prático: "Parents" = Pai + Mãe. Parentes em geral = "Relatives"!',
      exampleSentenceEn: 'I love my parents very much.',
      exampleSentencePt: 'Eu amo muito os meus pais.',
      pronunciationTip: 'Pronuncia-se como "PÉ-rents" [ˈpeərənts].'
    }
  },

  // 2. Greetings: Good morning / Good afternoon / Good evening / Good night
  {
    id: 'q2',
    category: 'daily',
    categoryLabel: 'Cumprimentos & Dia a Dia',
    categoryEmoji: '👋',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'Você chega a um restaurante às 20h para jantar. Como você cumprimenta o garçom?',
    promptSubtext: 'Atenção à diferença de chegada vs despedida à noite!',
    promptLang: 'pt',
    contextEmoji: '🌙',
    options: [
      { id: 'opt_a', text: 'Good night!', audioText: 'Good night!', audioLang: 'en' },
      { id: 'opt_b', text: 'Good evening!', audioText: 'Good evening!', audioLang: 'en' },
      { id: 'opt_c', text: 'Good afternoon!', audioText: 'Good afternoon!', audioLang: 'en' },
      { id: 'opt_d', text: 'Good bye!', audioText: 'Good bye!', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: 'Use "Good evening!" ao chegar à noite!',
      correctReason: 'Em inglês existe uma regra de ouro: "Good evening" é para cumprimentar na CHEGADA (olá, boa noite). "Good night" é reservado para a DESPEDIDA ou antes de dormir.',
      wrongExplanations: {
        opt_a: '"Good night" significa "tchau / boa noite de despedida" ou "durma bem". Usar ao chegar soa como se você já estivesse indo embora!',
        opt_c: '"Good afternoon" significa "Boa tarde", usado apenas do meio-dia até o pôr do sol (cerca de 18h).',
        opt_d: '"Good bye" significa "Adeus / Tchau", que também é usado na despedida e não na chegada.'
      },
      grammarTip: 'Chegada após 18h = Good evening! | Despedida / Hora de dormir = Good night!',
      exampleSentenceEn: 'Good evening! A table for two, please.',
      exampleSentencePt: 'Boa noite! Uma mesa para dois, por favor.',
      pronunciationTip: '"Evening" se pronuncia "ÍV-ning" (duas sílabas, sem som forte no "e" do meio).'
    }
  },

  // 3. Verb To Be: He / She / It
  {
    id: 'q3',
    category: 'grammar',
    categoryLabel: 'Gramática Básica',
    categoryEmoji: '🧩',
    level: 'iniciante',
    direction: 'complete_sentence',
    promptText: 'Complete a frase: "She _____ my best friend."',
    promptSubtext: 'Ela é minha melhor amiga.',
    promptLang: 'en',
    promptAudioText: 'She is my best friend.',
    promptAudioLang: 'en',
    contextEmoji: '👭',
    options: [
      { id: 'opt_a', text: 'are', audioText: 'are', audioLang: 'en' },
      { id: 'opt_b', text: 'is', audioText: 'is', audioLang: 'en' },
      { id: 'opt_c', text: 'am', audioText: 'am', audioLang: 'en' },
      { id: 'opt_d', text: 'be', audioText: 'be', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: 'O correto é "She IS my best friend"!',
      correctReason: 'No presente do verbo To Be, a terceira pessoa do singular (He, She, It) utiliza a forma "IS".',
      wrongExplanations: {
        opt_a: '"ARE" é usado apenas para You, We e They (ex: "They are happy", "You are cool").',
        opt_c: '"AM" é exclusivo da primeira pessoa "I" (ex: "I am happy"). Nunca se usa com She.',
        opt_d: '"BE" é a forma base no infinitivo (to be). No presente simples ele se conjuga em am, is ou are.'
      },
      grammarTip: 'Resumo To Be: I am | You are | He/She/It is | We are | They are.',
      exampleSentenceEn: 'She is a great teacher.',
      exampleSentencePt: 'Ela é uma ótima professora.',
      pronunciationTip: '"is" tem som de /ɪz/ (com som de "z" suave no final).'
    }
  },

  // 4. False Friend: Pretend
  {
    id: 'q4',
    category: 'false_friends',
    categoryLabel: 'Falso Cognato',
    categoryEmoji: '⚠️',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'O que significa a palavra em inglês "PRETEND"?',
    promptSubtext: '"Don\'t pretend you didn\'t hear me."',
    promptLang: 'pt',
    promptAudioText: "Don't pretend you didn't hear me.",
    promptAudioLang: 'en',
    contextEmoji: '🎭',
    options: [
      { id: 'opt_a', text: 'Pretender (ter intenção de fazer algo)' },
      { id: 'opt_b', text: 'Fingir / Simular' },
      { id: 'opt_c', text: 'Prender (deter alguém)' },
      { id: 'opt_d', text: 'Presentear' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Pretend" significa "Fingir"!',
      correctReason: '"To pretend" parece muito com "pretender", mas significa fingir ou fazer de conta. Crianças brincando de super-herói usam muito "pretend".',
      wrongExplanations: {
        opt_a: 'Para dizer "eu pretendo fazer algo", o verbo correto em inglês é "INTEND" ou "PLAN" (ex: "I intend to travel tomorrow").',
        opt_c: '"Prender" em inglês se diz "ARREST" (pela polícia) ou "CATCH / LOCK UP".',
        opt_d: '"Presentear" é "GIVE A GIFT" ou "PRESENT" (com pronúncia diferente).'
      },
      grammarTip: 'Cuidado: Pretend = Fingir | Intend = Pretender.',
      exampleSentenceEn: 'Children love to pretend they are superheroes.',
      exampleSentencePt: 'As crianças adoram fingir que são super-heróis.',
      pronunciationTip: 'Pronuncia-se "pri-TÉND" [prɪˈtend].'
    }
  },

  // 5. Vocabulary: Food & Drinks
  {
    id: 'q5',
    category: 'vocabulary',
    categoryLabel: 'Vocabulário do Dia a Dia',
    categoryEmoji: '🍎',
    level: 'iniciante',
    direction: 'pt_to_en',
    promptText: 'Como se diz "ÁGUA GELADA COM GELO" em inglês quando você pede em um restaurante?',
    promptSubtext: 'Situação de viagem comum!',
    promptLang: 'pt',
    contextEmoji: '🧊',
    options: [
      { id: 'opt_a', text: 'Warm water with ice', audioText: 'Warm water with ice', audioLang: 'en' },
      { id: 'opt_b', text: 'Cold water with ice, please', audioText: 'Cold water with ice, please', audioLang: 'en' },
      { id: 'opt_c', text: 'Hot water, please', audioText: 'Hot water, please', audioLang: 'en' },
      { id: 'opt_d', text: 'Ice tea, please', audioText: 'Ice tea, please', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Cold water with ice, please" é a forma ideal!',
      correctReason: '"Cold" = fria/gelada, "water" = água, "with ice" = com gelo, e "please" = por favor (sempre educado!).',
      wrongExplanations: {
        opt_a: '"Warm water" significa água morna! O garçom traria água sem refrescar.',
        opt_c: '"Hot water" significa água quente ou fervendo (usada para chá).',
        opt_d: '"Ice tea" significa chá gelado, que é uma bebida com sabor de pêssego ou limão, e não água pura.'
      },
      grammarTip: 'Em inglês, o adjetivo vem antes do substantivo: "Cold water" (água gelada), "Fresh bread" (pão fresco).',
      exampleSentenceEn: 'Could I get some cold water with ice, please?',
      exampleSentencePt: 'Eu poderia pedir uma água gelada com gelo, por favor?',
      pronunciationTip: '"Water" no inglês americano soa como "UÓ-der" e no britânico como "UÓ-tah".'
    }
  },

  // 6. Common Phrases: How are you doing?
  {
    id: 'q6',
    category: 'phrases',
    categoryLabel: 'Expressões Diárias',
    categoryEmoji: '💬',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'Se um nativo te pergunta: "How are you doing?", qual é a melhor resposta casual?',
    promptSubtext: '"Como você está indo / Como vão as coisas?"',
    promptLang: 'pt',
    promptAudioText: 'How are you doing?',
    promptAudioLang: 'en',
    contextEmoji: '🤝',
    options: [
      { id: 'opt_a', text: 'I am doing my homework.', audioText: 'I am doing my homework.', audioLang: 'en' },
      { id: 'opt_b', text: "I'm doing well, thank you! And you?", audioText: "I'm doing well, thank you! And you?", audioLang: 'en' },
      { id: 'opt_c', text: 'Yes, I do.', audioText: 'Yes, I do.', audioLang: 'en' },
      { id: 'opt_d', text: 'I have 25 years old.', audioText: 'I have 25 years old.', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"I\'m doing well, thank you! And you?" é a resposta natural!',
      correctReason: '"How are you doing?" é uma forma casual e extremamente comum de perguntar "Como vai?" ou "Tudo bem com você?". Responder "I\'m doing well" ou "Good, thanks!" é perfeito.',
      wrongExplanations: {
        opt_a: 'Embora tenha o verbo "doing", a pergunta não é sobre o que você está fazendo no momento, mas sobre como você está se sentindo!',
        opt_c: '"Yes, I do" é resposta para perguntas com "Do you...?" (ex: "Do you like coffee?"). Não faz sentido para "How are you doing?".',
        opt_d: 'Erro grave em inglês! Para dizer a idade nunca usamos "have", e sim o verbo To Be: "I AM 25 years old".'
      },
      grammarTip: 'Nunca use "I have X years" para idade em inglês! Em inglês você "é" a idade: "I am 20 years old".',
      exampleSentenceEn: "Hey John! How are you doing? — I'm doing great, thanks!",
      exampleSentencePt: 'Oi John! Como você está? — Estou ótimo, obrigado!',
      pronunciationTip: '"How are you doing?" na fala rápida soa quase como "Hau-ya-duin?".'
    }
  },

  // 7. Grammar: Plural irregular
  {
    id: 'q7',
    category: 'grammar',
    categoryLabel: 'Gramática & Plural',
    categoryEmoji: '👥',
    level: 'iniciante',
    direction: 'pt_to_en',
    promptText: 'Qual é o plural correto da palavra "CHILD" (criança) em inglês?',
    promptSubtext: '"One child (uma criança) ➔ Two _____ (duas crianças)"',
    promptLang: 'pt',
    contextEmoji: '🧒',
    options: [
      { id: 'opt_a', text: 'Childs', audioText: 'Childs', audioLang: 'en' },
      { id: 'opt_b', text: 'Children', audioText: 'Children', audioLang: 'en' },
      { id: 'opt_c', text: 'Childrens', audioText: 'Childrens', audioLang: 'en' },
      { id: 'opt_d', text: 'Childes', audioText: 'Childes', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: 'O plural correto é "CHILDREN"!',
      correctReason: '"Child" possui um plural irregular. Em vez de adicionar "S", a palavra muda para "Children".',
      wrongExplanations: {
        opt_a: '"Childs" não existe no inglês padrão. Não se adiciona "s" diretamente em "child".',
        opt_c: '"Childrens" é um erro de plural duplo! Como "children" já é plural, colocar "s" está incorreto (só existe com apóstrofo possessivo: "children\'s toys").',
        opt_d: '"Childes" é uma grafia inexistente.'
      },
      grammarTip: 'Outros plurais irregulares famosos: Man ➔ Men | Woman ➔ Women | Person ➔ People | Tooth ➔ Teeth.',
      exampleSentenceEn: 'The children are playing in the park.',
      exampleSentencePt: 'As crianças estão brincando no parque.',
      pronunciationTip: 'No singular dizemos "TCHÁILD" [tʃaɪld], mas no plural a vogal muda para "TCHÍL-dren" [ˈtʃɪldrən]!'
    }
  },

  // 8. False Friend: Actually
  {
    id: 'q8',
    category: 'false_friends',
    categoryLabel: 'Falso Cognato',
    categoryEmoji: '⚠️',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'O que significa a palavra em inglês "ACTUALLY"?',
    promptSubtext: '"Actually, I prefer tea over coffee."',
    promptLang: 'pt',
    promptAudioText: 'Actually, I prefer tea over coffee.',
    promptAudioLang: 'en',
    contextEmoji: '☕',
    options: [
      { id: 'opt_a', text: 'Atualmente (nos dias de hoje)' },
      { id: 'opt_b', text: 'Na verdade / Na realidade' },
      { id: 'opt_c', text: 'Atuando (no cinema/teatro)' },
      { id: 'opt_d', text: 'Rapidamente' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Actually" significa "Na verdade / Realmente"!',
      correctReason: 'Mais um falso amigo muito famoso! Parece "atualmente", mas expressa uma correção ou fato real ("na verdade").',
      wrongExplanations: {
        opt_a: 'Para dizer "atualmente" em inglês, usamos "CURRENTLY" ou "NOWADAYS" (ex: "Currently, I live in São Paulo").',
        opt_c: '"Atuando" em inglês seria "acting" (do verbo to act).',
        opt_d: '"Rapidamente" em inglês é "quickly" ou "fast".'
      },
      grammarTip: 'Regrinha de ouro: Actually = Na verdade | Currently = Atualmente.',
      exampleSentenceEn: 'I thought he was American, but actually he is Canadian.',
      exampleSentencePt: 'Eu achei que ele era americano, mas na verdade ele é canadense.',
      pronunciationTip: 'Pronuncia-se como "ÉK-tchuali" [ˈæktʃuəli].'
    }
  },

  // 9. Everyday Objects & Prepositions: On vs In vs At
  {
    id: 'q9',
    category: 'grammar',
    categoryLabel: 'Preposições de Lugar',
    categoryEmoji: '📍',
    level: 'iniciante',
    direction: 'complete_sentence',
    promptText: 'Como dizer: "O livro está SOBRE A MESA"?',
    promptSubtext: 'The book is _____ the table.',
    promptLang: 'en',
    promptAudioText: 'The book is on the table.',
    promptAudioLang: 'en',
    contextEmoji: '📚',
    options: [
      { id: 'opt_a', text: 'in', audioText: 'in', audioLang: 'en' },
      { id: 'opt_b', text: 'on', audioText: 'on', audioLang: 'en' },
      { id: 'opt_c', text: 'at', audioText: 'at', audioLang: 'en' },
      { id: 'opt_d', text: 'under', audioText: 'under', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"The book is ON the table" (A clássica frase)!',
      correctReason: 'A preposição "ON" indica contato com uma superfície plana (mesa, parede, chão). Como o livro está sobre a mesa, usamos "on".',
      wrongExplanations: {
        opt_a: '"IN" significa "DENTRO DE" um espaço fechado (ex: "The book is in my backpack" = O livro está na minha mochila).',
        opt_c: '"AT" indica um ponto ou local específico geral (ex: "at home", "at school"), não contato físico com a superfície de um móvel.',
        opt_d: '"UNDER" significa "embaixo de / sob" (ex: "The cat is under the table" = O gato está embaixo da mesa).'
      },
      grammarTip: 'Superfície = ON | Dentro de algo = IN | Ponto/Local geral = AT.',
      exampleSentenceEn: 'Put your phone on the table.',
      exampleSentencePt: 'Coloque seu celular sobre a mesa.',
      pronunciationTip: '"on" tem um som aberto suave de /ɒn/.'
    }
  },

  // 10. Question Words: What, Where, Who, When
  {
    id: 'q10',
    category: 'phrases',
    categoryLabel: 'Perguntas Básicas (WH-)',
    categoryEmoji: '❓',
    level: 'iniciante',
    direction: 'complete_sentence',
    promptText: 'Como você pergunta: "ONDE é o banheiro?" em inglês?',
    promptSubtext: 'Qual palavra de pergunta significa "ONDE"?',
    promptLang: 'pt',
    contextEmoji: '🚻',
    options: [
      { id: 'opt_a', text: 'Who is the bathroom?', audioText: 'Who is the bathroom?', audioLang: 'en' },
      { id: 'opt_b', text: 'Where is the bathroom?', audioText: 'Where is the bathroom?', audioLang: 'en' },
      { id: 'opt_c', text: 'When is the bathroom?', audioText: 'When is the bathroom?', audioLang: 'en' },
      { id: 'opt_d', text: 'Why is the bathroom?', audioText: 'Why is the bathroom?', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Where is the bathroom?" é a pergunta certa!',
      correctReason: '"WHERE" significa "ONDE" (pergunta de lugar). É a palavra essencial para pedir direções.',
      wrongExplanations: {
        opt_a: '"WHO" significa "QUEM" (refere-se a pessoas: "Who is that girl?"). Perguntar "Who is the bathroom?" soa como "Quem é o banheiro?".',
        opt_c: '"WHEN" significa "QUANDO" (tempo/horário: "When does the train arrive?").',
        opt_d: '"WHY" significa "POR QUE" (motivo/razão: "Why are you laughing?").'
      },
      grammarTip: 'Guia das perguntas: WHERE = Onde | WHO = Quem | WHEN = Quando | WHAT = O que | WHY = Por que.',
      exampleSentenceEn: 'Excuse me, where is the nearest subway station?',
      exampleSentencePt: 'Com licença, onde fica a estação de metrô mais próxima?',
      pronunciationTip: '"Where" rima com "air" e "bear" [weər].'
    }
  },

  // 11. False Friend: Push vs Pull
  {
    id: 'q11',
    category: 'false_friends',
    categoryLabel: 'Falso Cognato / Portas',
    categoryEmoji: '🚪',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'Você vê uma placa numa porta de vidro que diz "PUSH". O que você deve fazer?',
    promptSubtext: 'O erro mais comum nos aeroportos do mundo todo!',
    promptLang: 'pt',
    promptAudioText: 'Push the door.',
    promptAudioLang: 'en',
    contextEmoji: '🚪',
    options: [
      { id: 'opt_a', text: 'Puxar a porta para você' },
      { id: 'opt_b', text: 'Empurrar a porta para a frente' },
      { id: 'opt_c', text: 'Bater na porta' },
      { id: 'opt_d', text: 'Trancar com a chave' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"PUSH" significa EMPURRAR!',
      correctReason: 'Apesar de começar com "PU", "PUSH" NÃO é puxar! PUSH = EMPURRAR. Se você puxar uma porta com PUSH, vai dar de cara nela!',
      wrongExplanations: {
        opt_a: 'Para "PUXAR", a placa em inglês diz "PULL" (PULL = Puxar). Grave isso: Push empurra, Pull puxa!',
        opt_c: '"Bater na porta" seria "Knock on the door".',
        opt_d: '"Trancar" em inglês seria "Lock".'
      },
      grammarTip: 'Macete infalível: PUSH tem som de sopro pra fora (empurra). PULL parece puxar pelo som das duas letras L!',
      exampleSentenceEn: 'Push the door to enter the bank.',
      exampleSentencePt: 'Empurre a porta para entrar no banco.',
      pronunciationTip: '"Push" pronuncia-se "PÚCH" e "Pull" pronuncia-se "PÚL".'
    }
  },

  // 12. Negative Sentences: Don't vs Doesn't
  {
    id: 'q12',
    category: 'grammar',
    categoryLabel: 'Frases Negativas no Presente',
    categoryEmoji: '⛔',
    level: 'iniciante',
    direction: 'complete_sentence',
    promptText: 'Complete a frase: "He _____ like spicy food."',
    promptSubtext: 'Ele não gosta de comida apimentada.',
    promptLang: 'en',
    promptAudioText: "He doesn't like spicy food.",
    promptAudioLang: 'en',
    contextEmoji: '🌶️',
    options: [
      { id: 'opt_a', text: "don't", audioText: "don't", audioLang: 'en' },
      { id: 'opt_b', text: "doesn't", audioText: "doesn't", audioLang: 'en' },
      { id: 'opt_c', text: "not", audioText: "not", audioLang: 'en' },
      { id: 'opt_d', text: "no", audioText: "no", audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: 'O correto é "He DOESN\'T like"!',
      correctReason: 'No presente simples em inglês, para fazer a negação com He, She ou It, usamos o auxiliar "DOES NOT" abreviado para "DOESN\'T". O verbo principal fica na forma base (like).',
      wrongExplanations: {
        opt_a: '"Don\'t" (do not) é usado para I, You, We e They (ex: "I don\'t like", "They don\'t like"). Não se usa com He/She/It!',
        opt_c: 'Em inglês não podemos colocar apenas "not" antes de verbos normais (dizer "He not like" é gramaticalmente incorreto). Precisa do auxiliar.',
        opt_d: '"No" é uma palavra de negação ou adjetivo (ex: "No problem"), nunca um auxiliar verbal antes de outro verbo.'
      },
      grammarTip: 'Regra de ouro das negativas: I/You/We/They ➔ DON\'T | He/She/It ➔ DOESN\'T.',
      exampleSentenceEn: "He doesn't like waking up early on Sundays.",
      exampleSentencePt: 'Ele não gosta de acordar cedo aos domingos.',
      pronunciationTip: '"doesn\'t" pronuncia-se como "DÃ-zent" [ˈdʌznt].'
    }
  },

  // 13. Time: O'clock vs Half past
  {
    id: 'q13',
    category: 'daily',
    categoryLabel: 'Horas e Tempo',
    categoryEmoji: '⏰',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'Se o relógio marca 3:00 em ponto, como dizemos em inglês?',
    promptSubtext: 'Atenção ao termo usado apenas para horas exatas!',
    promptLang: 'pt',
    contextEmoji: '🕒',
    options: [
      { id: 'opt_a', text: "It's three hours.", audioText: "It's three hours.", audioLang: 'en' },
      { id: 'opt_b', text: "It's three o'clock.", audioText: "It's three o'clock.", audioLang: 'en' },
      { id: 'opt_c', text: "It's three minutes.", audioText: "It's three minutes.", audioLang: 'en' },
      { id: 'opt_d', text: "It's three time.", audioText: "It's three time.", audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: 'O correto é "It\'s three o\'clock"!',
      correctReason: 'A expressão "O\'clock" (abreviação histórica de "of the clock") é usada exclusivamente para horas redondas e exatas (1:00, 2:00, 3:00, etc.).',
      wrongExplanations: {
        opt_a: '"Three hours" significa uma duração de 3 horas de tempo (ex: "The movie lasted three hours"), e não o horário no relógio.',
        opt_c: '"Three minutes" significa 3 minutos, e não a hora.',
        opt_d: '"Three time" é uma tradução literal errada do português. Em inglês não se diz "three time".'
      },
      grammarTip: 'Horas cheias: It\'s 1 o\'clock, It\'s 2 o\'clock, etc. Se houver minutos (ex: 3:15), diga apenas "It\'s three fifteen" (nunca use o\'clock com minutos!).',
      exampleSentenceEn: "The meeting starts at three o'clock sharp.",
      exampleSentencePt: 'A reunião começa às três horas em ponto.',
      pronunciationTip: '"o\'clock" pronuncia-se "ou-CLÓK" [əˈklɒk].'
    }
  },

  // 14. Vocabulary: Everyday false friend "Intend" vs "Understand"
  {
    id: 'q14',
    category: 'vocabulary',
    categoryLabel: 'Compreensão & Expressão',
    categoryEmoji: '🧠',
    level: 'iniciante',
    direction: 'en_to_pt',
    promptText: 'Quando alguém te diz: "I understand your point", o que a pessoa quis dizer?',
    promptSubtext: '"I understand your point."',
    promptLang: 'pt',
    promptAudioText: 'I understand your point.',
    promptAudioLang: 'en',
    contextEmoji: '💡',
    options: [
      { id: 'opt_a', text: 'Eu pretendo fazer o seu ponto.' },
      { id: 'opt_b', text: 'Eu entendo o seu ponto de vista.' },
      { id: 'opt_c', text: 'Eu subestimo a sua opinião.' },
      { id: 'opt_d', text: 'Eu discordo do seu ponto.' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"Understand" significa ENTENDER ou COMPREENDER!',
      correctReason: 'O verbo "to understand" é um dos mais usados da língua inglesa e significa entender. "Point" aqui se refere a argumento ou ponto de vista.',
      wrongExplanations: {
        opt_a: '"Pretender" seria "intend" ou "plan", e não "understand".',
        opt_c: '"Subestimar" em inglês é "underestimate".',
        opt_d: '"Discordar" em inglês seria "I disagree with you".'
      },
      grammarTip: 'Passado de understand: UNDERSTOOD (verbo irregular). Ex: "I understood everything" (Eu entendi tudo).',
      exampleSentenceEn: 'Do you understand what I mean?',
      exampleSentencePt: 'Você entende o que eu quero dizer?',
      pronunciationTip: 'Pronuncia-se "an-der-STÉND" [ˌʌndərˈstænd].'
    }
  },

  // 15. Common Polite Expressions: Excuse me vs Sorry
  {
    id: 'q15',
    category: 'daily',
    categoryLabel: 'Educação & Situações',
    categoryEmoji: '🙏',
    level: 'iniciante',
    direction: 'pt_to_en',
    promptText: 'Você quer passar no corredor do avião e precisa pedir licença a uma pessoa. O que você diz?',
    promptSubtext: 'Com licença vs Desculpe!',
    promptLang: 'pt',
    contextEmoji: '✈️',
    options: [
      { id: 'opt_a', text: 'Excuse me, please.', audioText: 'Excuse me, please.', audioLang: 'en' },
      { id: 'opt_b', text: 'I am sorry.', audioText: 'I am sorry.', audioLang: 'en' },
      { id: 'opt_c', text: 'Forgive me.', audioText: 'Forgive me.', audioLang: 'en' },
      { id: 'opt_d', text: 'You are welcome.', audioText: 'You are welcome.', audioLang: 'en' }
    ],
    correctOptionId: 'opt_a',
    explanation: {
      correctTitle: 'Use "Excuse me" para pedir licença ou chamar a atenção!',
      correctReason: '"Excuse me" é usado ANTES de interromper alguém, passar por um espaço apertado ou chamar um garçom. "Sorry" é usado DEPOIS que você comete um pequeno erro (como esbarrar em alguém).',
      wrongExplanations: {
        opt_b: '"I am sorry" é para pedir desculpas por algo que você já fez (ex: pisar no pé de alguém). Pedir licença antes de passar não é um pedido de desculpas.',
        opt_c: '"Forgive me" soa muito dramático ("Perdoe-me"), usado para erros graves ou em contextos formais/religiosos.',
        opt_d: '"You are welcome" significa "De nada / Não há de quê" (resposta para thank you).'
      },
      grammarTip: 'Regra de ouro: Antes de agir (chamar/passar) = "Excuse me" | Depois de errar/esbarrar = "Sorry"!',
      exampleSentenceEn: 'Excuse me, is this seat taken?',
      exampleSentencePt: 'Com licença, este assento está ocupado?',
      pronunciationTip: '"Excuse me" soa como "Iks-KIÚZ mi".'
    }
  },

  // 16. Quantifiers: Much vs Many
  {
    id: 'q16',
    category: 'grammar',
    categoryLabel: 'Much vs Many',
    categoryEmoji: '⚖️',
    level: 'iniciante',
    direction: 'complete_sentence',
    promptText: 'Como perguntar o preço de algo: "Quanto custa isto?"',
    promptSubtext: 'How _____ does this cost?',
    promptLang: 'en',
    promptAudioText: 'How much does this cost?',
    promptAudioLang: 'en',
    contextEmoji: '🏷️',
    options: [
      { id: 'opt_a', text: 'many', audioText: 'many', audioLang: 'en' },
      { id: 'opt_b', text: 'much', audioText: 'much', audioLang: 'en' },
      { id: 'opt_c', text: 'long', audioText: 'long', audioLang: 'en' },
      { id: 'opt_d', text: 'far', audioText: 'far', audioLang: 'en' }
    ],
    correctOptionId: 'opt_b',
    explanation: {
      correctTitle: '"How MUCH does this cost?" é a pergunta de preço!',
      correctReason: 'Dinheiro (money) é substantivo incontável em inglês, portanto usamos "HOW MUCH" para perguntar valores e preços de coisas.',
      wrongExplanations: {
        opt_a: '"HOW MANY" é usado apenas para coisas contáveis no plural (ex: "How many apples?", "How many friends?"). Nunca para preço direto.',
        opt_c: '"HOW LONG" pergunta sobre tempo/duração ou comprimento (ex: "How long is the movie?").',
        opt_d: '"HOW FAR" pergunta sobre distância física (ex: "How far is the beach?").'
      },
      grammarTip: 'Resumo rápido: HOW MUCH = Preços e coisas incontáveis (água, tempo, dinheiro) | HOW MANY = Coisas contáveis (cadeiras, carros, livros).',
      exampleSentenceEn: 'How much is this souvenir?',
      exampleSentencePt: 'Quanto custa esta lembrancinha?',
      pronunciationTip: '"much" tem som de /mʌtʃ/ (som de "tch" forte no fim).'
    }
  }
];
