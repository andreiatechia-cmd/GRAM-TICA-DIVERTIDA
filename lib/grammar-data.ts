export type WordClassType = 'substantivo' | 'verbo' | 'adjetivo';

export interface WordClassItem {
  id: string;
  word: string;
  emoji: string;
  classType: WordClassType;
  classLabel: string;
  definition: string;
  exampleSentence: string;
  funFact: string;
  color: string;
  bgColor: string;
}

export interface PunctuationQuestion {
  id: string;
  sentenceBefore: string;
  sentenceAfter?: string;
  correctMark: '?' | '!' | '.' | ',';
  options: Array<'?' | '!' | '.' | ','>;
  explanation: string;
  audioVoiceLine: string;
  scenarioEmoji: string;
  title: string;
}

export interface SyllableItem {
  id: string;
  word: string;
  emoji: string;
  syllableCount: number;
  syllablesBroken: string[];
  classification: string; // Monossílaba, Dissílaba, Trissílaba, Polissílaba
  explanation: string;
}

export interface RhymeChallenge {
  id: string;
  targetWord: string;
  targetEmoji: string;
  correctRhyme: string;
  rhymeEmoji: string;
  options: Array<{ word: string; emoji: string; isCorrect: boolean; whyNot?: string }>;
  rhymeSound: string;
  verse: string;
}

export interface PluralGenderItem {
  id: string;
  type: 'plural' | 'gender';
  singularOrMasculine: string;
  emoji: string;
  correctAnswer: string;
  correctEmoji: string;
  options: string[];
  ruleTip: string;
}

export interface GrammarQuizItem {
  id: string;
  category: 'alfabeto' | 'substantivos' | 'verbos' | 'adjetivos' | 'pontuacao' | 'antonimos';
  categoryLabel: string;
  question: string;
  emoji: string;
  options: Array<{
    id: string;
    text: string;
    emoji?: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  hint: string;
}

export interface StickerReward {
  id: string;
  title: string;
  emoji: string;
  description: string;
  requirement: string;
  unlockedAtPoints: number;
  category: 'iniciante' | 'explorador' | 'mestre';
  color: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  rewardStars: number;
  gameKey: 'classes' | 'pontuacao' | 'silabas' | 'plural' | 'quiz';
}

// --- 1. ITENS DAS CLASSES DE PALAVRAS (SUBSTANTIVOS, VERBOS, ADJETIVOS) ---
export const WORD_CLASSES_ITEMS: WordClassItem[] = [
  // Substantivos (Dão nome aos seres, objetos, lugares)
  {
    id: 'sub-gato',
    word: 'Gatinho',
    emoji: '🐱',
    classType: 'substantivo',
    classLabel: 'Substantivo',
    definition: 'É um SUBSTANTIVO porque dá nome a um bichinho peludo que mia!',
    exampleSentence: 'O gatinho bebeu todo o leitinho na tigela.',
    funFact: 'Substantivo é a palavra que dá nome a tudo que existe no mundo!',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900'
  },
  {
    id: 'sub-borboleta',
    word: 'Borboleta',
    emoji: '🦋',
    classType: 'substantivo',
    classLabel: 'Substantivo',
    definition: 'É um SUBSTANTIVO porque dá nome a um inseto que voa pelo jardim!',
    exampleSentence: 'A borboleta tem asas coloridas de muitas cores.',
    funFact: 'Substantivos podem ser coisas que você vê, toca ou sente!',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900'
  },
  {
    id: 'sub-casa',
    word: 'Casinha',
    emoji: '🏠',
    classType: 'substantivo',
    classLabel: 'Substantivo',
    definition: 'É um SUBSTANTIVO porque dá nome ao lugar quentinho onde moramos!',
    exampleSentence: 'A casinha tem janelas azuis e teto vermelho.',
    funFact: 'Casas, escolas e castelos são todos substantivos!',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900'
  },
  {
    id: 'sub-bola',
    word: 'Bola',
    emoji: '⚽',
    classType: 'substantivo',
    classLabel: 'Substantivo',
    definition: 'É um SUBSTANTIVO porque dá nome a um brinquedo redondo de chutar!',
    exampleSentence: 'A bola rolou pelo gramado até o gol.',
    funFact: 'Todos os seus brinquedos têm nomes que são substantivos!',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900'
  },
  {
    id: 'sub-sorvete',
    word: 'Sorvete',
    emoji: '🍦',
    classType: 'substantivo',
    classLabel: 'Substantivo',
    definition: 'É um SUBSTANTIVO porque dá nome a um doce geladinho e gostoso!',
    exampleSentence: 'Tomei sorvete de morango na pracinha.',
    funFact: 'Comidas gostosas como bolo, maçã e sorvete são substantivos.',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900'
  },

  // Verbos (Ações, o que os seres fazem)
  {
    id: 'ver-pular',
    word: 'Pular',
    emoji: '🦘',
    classType: 'verbo',
    classLabel: 'Verbo',
    definition: 'É um VERBO porque é uma AÇÃO! Mostra o corpo pulando bem alto!',
    exampleSentence: 'O canguru adora pular pelos campos.',
    funFact: 'Verbo é movimento, ação ou o que fazemos: pular, dançar, sorrir!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900'
  },
  {
    id: 'ver-correr',
    word: 'Correr',
    emoji: '🏃',
    classType: 'verbo',
    classLabel: 'Verbo',
    definition: 'É um VERBO porque indica a AÇÃO de se mexer velozmente com as pernas!',
    exampleSentence: 'As crianças adoram correr na hora do recreio.',
    funFact: 'Sempre que você estiver fazendo algo divertido, você está fazendo um verbo!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900'
  },
  {
    id: 'ver-cantar',
    word: 'Cantar',
    emoji: '🎤',
    classType: 'verbo',
    classLabel: 'Verbo',
    definition: 'É um VERBO porque é a AÇÃO de soltar a voz fazendo uma linda canção!',
    exampleSentence: 'O passarinho acorda cedo para cantar no galho.',
    funFact: 'Cantar, tocar e assobiar são verbos musicais!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900'
  },
  {
    id: 'ver-dormir',
    word: 'Dormir',
    emoji: '😴',
    classType: 'verbo',
    classLabel: 'Verbo',
    definition: 'É um VERBO porque mostra a AÇÃO de descansar e sonhar a noite toda!',
    exampleSentence: 'O ursinho foi dormir depois de um dia de brincadeiras.',
    funFact: 'Mesmo dormindo, o corpinho está descansando num verbo!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900'
  },
  {
    id: 'ver-ler',
    word: 'Ler',
    emoji: '📖',
    classType: 'verbo',
    classLabel: 'Verbo',
    definition: 'É um VERBO porque é a AÇÃO de descobrir historinhas mágicas nos livros!',
    exampleSentence: 'Eu gosto de ler historinhas com ilustrações coloridas.',
    funFact: 'Ler abre as portas da imaginação e da sabedoria!',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900'
  },

  // Adjetivos (Qualidades, características, como as coisas são)
  {
    id: 'adj-bonito',
    word: 'Bonito',
    emoji: '🌟',
    classType: 'adjetivo',
    classLabel: 'Adjetivo',
    definition: 'É um ADJETIVO porque dá uma QUALIDADE! Mostra como algo é belo.',
    exampleSentence: 'O arco-íris bonito cruzou todo o céu azul.',
    funFact: 'Adjetivos deixam nossas frases ricas em detalhes e sentimentos!',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 border-pink-300 text-pink-900'
  },
  {
    id: 'adj-rapido',
    word: 'Rápido',
    emoji: '⚡',
    classType: 'adjetivo',
    classLabel: 'Adjetivo',
    definition: 'É um ADJETIVO porque descreve uma CARACTERÍSTICA de quem é veloz!',
    exampleSentence: 'O guepardo rápido venceu a corrida pela savana.',
    funFact: 'Rápido, devagar, alto e baixo são todos adjetivos!',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 border-pink-300 text-pink-900'
  },
  {
    id: 'adj-doce',
    word: 'Doce',
    emoji: '🍭',
    classType: 'adjetivo',
    classLabel: 'Adjetivo',
    definition: 'É um ADJETIVO porque descreve o SABOR gostoso de mel ou açúcar!',
    exampleSentence: 'A maçã vermelha estava muito doce e suculenta.',
    funFact: 'Adjetivos nos ajudam a descrever cheiros, sabores e texturas.',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 border-pink-300 text-pink-900'
  },
  {
    id: 'adj-macio',
    word: 'Macio',
    emoji: '🧸',
    classType: 'adjetivo',
    classLabel: 'Adjetivo',
    definition: 'É um ADJETIVO porque explica como é o toque fofinho do ursinho!',
    exampleSentence: 'O travesseiro macio me ajudou a sonhar com as nuvens.',
    funFact: 'Macio, duro, quente e frio descrevem sensações e são adjetivos!',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 border-pink-300 text-pink-900'
  },
  {
    id: 'adj-alegre',
    word: 'Alegre',
    emoji: '😄',
    classType: 'adjetivo',
    classLabel: 'Adjetivo',
    definition: 'É um ADJETIVO porque mostra o ESTADO feliz e contente de alguém!',
    exampleSentence: 'O palhaço alegre fez todo mundo gargalhar.',
    funFact: 'Alegre, contente, feliz e radiante são adjetivos maravilhosos!',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 border-pink-300 text-pink-900'
  }
];

// --- 2. DETETIVE DA PONTUAÇÃO (?, !, ., ,) ---
export const PUNCTUATION_QUESTIONS: PunctuationQuestion[] = [
  {
    id: 'punc-1',
    title: 'O Convite Secreto',
    sentenceBefore: 'Você quer brincar de esconde-esconde comigo no quintal',
    correctMark: '?',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🙈',
    audioVoiceLine: 'Você quer brincar de esconde-esconde comigo no quintal?',
    explanation: 'Usamos o Ponto de Interrogação (?) porque é uma PERGUNTA! Estamos fazendo uma dúvida amigável querendo saber a resposta.'
  },
  {
    id: 'punc-2',
    title: 'O Susto do Monstrinho',
    sentenceBefore: 'Nossa, que susto enorme você me deu',
    correctMark: '!',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '👻',
    audioVoiceLine: 'Nossa, que susto enorme você me deu!',
    explanation: 'Usamos o Ponto de Exclamação (!) porque expressa um SUSTO, surpresa ou alegria com emoção forte!'
  },
  {
    id: 'punc-3',
    title: 'A Notícia da Tarde',
    sentenceBefore: 'O gato amarelinho dormiu na almofada quentinha',
    correctMark: '.',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🐈',
    audioVoiceLine: 'O gato amarelinho dormiu na almofada quentinha.',
    explanation: 'Usamos o Ponto Final (.) porque terminamos de contar uma frase tranquila e com calma, avisando que o pensamento terminou.'
  },
  {
    id: 'punc-4',
    title: 'A Salada de Frutas',
    sentenceBefore: 'No meu prato tem banana',
    sentenceAfter: 'maçã, uva e morango gostoso.',
    correctMark: ',',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🍓',
    audioVoiceLine: 'No meu prato tem banana, maçã, uva e morango gostoso.',
    explanation: 'Usamos a Vírgula (,) para dar uma respirada e SEPARAR os itens da listinha de frutas gostosas!'
  },
  {
    id: 'punc-5',
    title: 'A Grande Vitória!',
    sentenceBefore: 'Eba, nós conseguimos vencer o desafio',
    correctMark: '!',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🎉',
    audioVoiceLine: 'Eba, nós conseguimos vencer o desafio!',
    explanation: 'Ponto de Exclamação (!) é o campeão da comemoração, festa e vibração!'
  },
  {
    id: 'punc-6',
    title: 'A Idade Mágica',
    sentenceBefore: 'Quantos anos você vai fazer no próximo aniversário',
    correctMark: '?',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🎂',
    audioVoiceLine: 'Quantos anos você vai fazer no próximo aniversário?',
    explanation: 'Ponto de Interrogação (?) é o ponto dos curiosos! Usado sempre que perguntamos algo.'
  },
  {
    id: 'punc-7',
    title: 'O Passeio no Bosque',
    sentenceBefore: 'Os passarinhos cantam no alto das árvores floridas',
    correctMark: '.',
    options: ['?', '!', '.', ','],
    scenarioEmoji: '🌳',
    audioVoiceLine: 'Os passarinhos cantam no alto das árvores floridas.',
    explanation: 'Ponto Final (.) coloca um ponto final carinhoso na frase que conta algo de forma simples.'
  }
];

// --- 3. CAÇA-SÍLABAS & RIMAS DIVERTIDAS ---
export const SYLLABLE_ITEMS: SyllableItem[] = [
  {
    id: 'syl-sol',
    word: 'Sol',
    emoji: '☀️',
    syllableCount: 1,
    syllablesBroken: ['SOL'],
    classification: 'Monossílaba (1 pedacinho)',
    explanation: 'Damos apenas 1 palma: SOL! É uma palavra com 1 sílaba só (monossílaba).'
  },
  {
    id: 'syl-gato',
    word: 'Gato',
    emoji: '🐱',
    syllableCount: 2,
    syllablesBroken: ['GA', 'TO'],
    classification: 'Dissílaba (2 pedacinhos)',
    explanation: 'Damos 2 palmas: GA - TO! Tem 2 sílabas (dissílaba).'
  },
  {
    id: 'syl-pipoca',
    word: 'Pipoca',
    emoji: '🍿',
    syllableCount: 3,
    syllablesBroken: ['PI', 'PO', 'CA'],
    classification: 'Trissílaba (3 pedacinhos)',
    explanation: 'Damos 3 palmas: PI - PO - CA! Tem 3 sílabas (trissílaba).'
  },
  {
    id: 'syl-borboleta',
    word: 'Borboleta',
    emoji: '🦋',
    syllableCount: 4,
    syllablesBroken: ['BOR', 'BO', 'LE', 'TA'],
    classification: 'Polissílaba (4 ou mais pedacinhos)',
    explanation: 'Damos 4 palmas: BOR - BO - LE - TA! Tem 4 sílabas (polissílaba).'
  },
  {
    id: 'syl-chocolate',
    word: 'Chocolate',
    emoji: '🍫',
    syllableCount: 4,
    syllablesBroken: ['CHO', 'CO', 'LA', 'TE'],
    classification: 'Polissílaba (4 pedacinhos)',
    explanation: 'Damos 4 palmas: CHO - CO - LA - TE! Uma delícia de 4 sílabas!'
  },
  {
    id: 'syl-peixe',
    word: 'Peixe',
    emoji: '🐟',
    syllableCount: 2,
    syllablesBroken: ['PEI', 'XE'],
    classification: 'Dissílaba (2 pedacinhos)',
    explanation: 'Damos 2 palmas: PEI - XE! Tem 2 sílabas!'
  },
  {
    id: 'syl-panela',
    word: 'Panela',
    emoji: '🍳',
    syllableCount: 3,
    syllablesBroken: ['PA', 'NE', 'LA'],
    classification: 'Trissílaba (3 pedacinhos)',
    explanation: 'Damos 3 palmas: PA - NE - LA! Tem 3 sílabas!'
  }
];

export const RHYME_CHALLENGES: RhymeChallenge[] = [
  {
    id: 'rhyme-coracao',
    targetWord: 'Coração',
    targetEmoji: '❤️',
    correctRhyme: 'Balão',
    rhymeEmoji: '🎈',
    rhymeSound: '-ÃO',
    verse: 'Meu coração voou contente feito um lindo...',
    options: [
      { word: 'Balão', emoji: '🎈', isCorrect: true },
      { word: 'Mesa', emoji: '🪑', isCorrect: false, whyNot: 'Mesa termina com som de -ESA, não combina com -ÃO!' },
      { word: 'Sapato', emoji: '👞', isCorrect: false, whyNot: 'Sapato termina com som de -ATO, diferente de -ÃO!' }
    ]
  },
  {
    id: 'rhyme-panela',
    targetWord: 'Panela',
    targetEmoji: '🍳',
    correctRhyme: 'Janela',
    rhymeEmoji: '🪟',
    rhymeSound: '-ELA',
    verse: 'Bati a colher na panela e olhei pela...',
    options: [
      { word: 'Janela', emoji: '🪟', isCorrect: true },
      { word: 'Cadeira', emoji: '🪑', isCorrect: false, whyNot: 'Cadeira termina com som de -EIRA, não rima com -ELA!' },
      { word: 'Lápis', emoji: '✏️', isCorrect: false, whyNot: 'Lápis termina em -IS!' }
    ]
  },
  {
    id: 'rhyme-foguete',
    targetWord: 'Foguete',
    targetEmoji: '🚀',
    correctRhyme: 'Sorvete',
    rhymeEmoji: '🍦',
    rhymeSound: '-ETE',
    verse: 'O astronauta no foguete tomou uma casquinha de...',
    options: [
      { word: 'Sorvete', emoji: '🍦', isCorrect: true },
      { word: 'Água', emoji: '💧', isCorrect: false, whyNot: 'Água tem som de -ÁGUA, não rima com -ETE!' },
      { word: 'Carro', emoji: '🚗', isCorrect: false, whyNot: 'Carro tem som de -ARRO!' }
    ]
  },
  {
    id: 'rhyme-caracol',
    targetWord: 'Caracol',
    targetEmoji: '🐌',
    correctRhyme: 'Sol',
    rhymeEmoji: '☀️',
    rhymeSound: '-OL',
    verse: 'Bem devagarzinho o caracol tomou um banho de...',
    options: [
      { word: 'Sol', emoji: '☀️', isCorrect: true },
      { word: 'Lua', emoji: '🌙', isCorrect: false, whyNot: 'Lua termina com -UA, não combina com o som de -OL!' },
      { word: 'Estrela', emoji: '⭐', isCorrect: false, whyNot: 'Estrela termina com -ELA!' }
    ]
  },
  {
    id: 'rhyme-dente',
    targetWord: 'Dente',
    targetEmoji: '🦷',
    correctRhyme: 'Pente',
    rhymeEmoji: '🪮',
    rhymeSound: '-ENTE',
    verse: 'Escovei bem o meu dente e passei no cabelo o...',
    options: [
      { word: 'Pente', emoji: '🪮', isCorrect: true },
      { word: 'Toalha', emoji: '🧺', isCorrect: false, whyNot: 'Toalha termina em -ALHA, não rima com -ENTE!' },
      { word: 'Sabonete', emoji: '🧼', isCorrect: false, whyNot: 'Sabonete termina em -ETE!' }
    ]
  }
];

// --- 4. CALDEIRÃO DO PLURAL & GÊNERO ---
export const PLURAL_GENDER_ITEMS: PluralGenderItem[] = [
  {
    id: 'pg-pao',
    type: 'plural',
    singularOrMasculine: 'O Pão quentinho',
    emoji: '🥖',
    correctAnswer: 'Os Pães quentinhos',
    correctEmoji: '🥖🥖',
    options: ['Os Pães quentinhos', 'Os Pãos quentinhos', 'Os Pãozes quentinhos'],
    ruleTip: 'Na nossa língua, muitas palavras terminadas em -ÃO viram -ÃES no plural (pão ➔ pães, cão ➔ cães)!'
  },
  {
    id: 'pg-balao',
    type: 'plural',
    singularOrMasculine: 'O Balão colorido',
    emoji: '🎈',
    correctAnswer: 'Os Balões coloridos',
    correctEmoji: '🎈🎈',
    options: ['Os Balões coloridos', 'Os Balãos coloridos', 'Os Balanitas coloridos'],
    ruleTip: 'Balão vira BALÕES no plural (balão ➔ balões, leão ➔ leões)!'
  },
  {
    id: 'pg-flor',
    type: 'plural',
    singularOrMasculine: 'A Flor cheirosa',
    emoji: '🌸',
    correctAnswer: 'As Flores cheirosas',
    correctEmoji: '🌸🌸',
    options: ['As Flores cheirosas', 'As Flors cheirosas', 'As Florezinhas'],
    ruleTip: 'Palavras que terminam com a letra R ganham -ES no plural (flor ➔ flores, amor ➔ amores)!'
  },
  {
    id: 'pg-peixe',
    type: 'plural',
    singularOrMasculine: 'O Peixe dourado',
    emoji: '🐟',
    correctAnswer: 'Os Peixes dourados',
    correctEmoji: '🐟🐟',
    options: ['Os Peixes dourados', 'Os Peixis dourados', 'Os Peixãos'],
    ruleTip: 'Palavras terminadas em vogal como Peixe recebem um S no plural: Peixes!'
  },
  {
    id: 'pg-leao',
    type: 'gender',
    singularOrMasculine: 'O Leão corajoso',
    emoji: '🦁',
    correctAnswer: 'A Leoa corajosa',
    correctEmoji: '🦁👑',
    options: ['A Leoa corajosa', 'A Leoaça', 'A Mulher Leão'],
    ruleTip: 'O par feminino do rei leão é a rainha LEOA!'
  },
  {
    id: 'pg-principe',
    type: 'gender',
    singularOrMasculine: 'O Príncipe do castelo',
    emoji: '🤴',
    correctAnswer: 'A Princesa do castelo',
    correctEmoji: '👸',
    options: ['A Princesa do castelo', 'A Príncipa', 'A Menina Real'],
    ruleTip: 'O par feminino de príncipe é a elegante PRINCESA!'
  },
  {
    id: 'pg-carneiro',
    type: 'gender',
    singularOrMasculine: 'O Carneiro da fazendinha',
    emoji: '🐏',
    correctAnswer: 'A Ovelha fofinha',
    correctEmoji: '🐑',
    options: ['A Ovelha fofinha', 'A Carneira', 'A Cabritinha'],
    ruleTip: 'O par feminino do carneiro é a carinhosa OVELHA!'
  }
];

// --- 5. SUPER QUIZ DA GRAMÁTICA PARA EDUCAÇÃO INFANTIL E ANOS INICIAIS ---
export const GRAMMAR_QUIZ_ITEMS: GrammarQuizItem[] = [
  {
    id: 'gq-1',
    category: 'substantivos',
    categoryLabel: 'Substantivos',
    question: 'Qual das palavras abaixo dá NOME a um animal e é um SUBSTANTIVO?',
    emoji: '🐾',
    options: [
      {
        id: 'opt-1',
        text: 'Cachorrinho',
        emoji: '🐶',
        isCorrect: true,
        explanation: 'Muito bem! "Cachorrinho" é o nome do animal, logo é um SUBSTANTIVO.'
      },
      {
        id: 'opt-2',
        text: 'Correr',
        emoji: '🏃',
        isCorrect: false,
        explanation: '"Correr" é uma AÇÃO de movimento, portanto é um VERBO!'
      },
      {
        id: 'opt-3',
        text: 'Veloz',
        emoji: '⚡',
        isCorrect: false,
        explanation: '"Veloz" é uma QUALIDADE (como alguém é), então é um ADJETIVO!'
      },
      {
        id: 'opt-4',
        text: 'Muito',
        emoji: '➕',
        isCorrect: false,
        explanation: '"Muito" indica intensidade, não dá nome a nenhum bichinho.'
      }
    ],
    hint: 'Substantivo dá nome para as coisas, pessoas ou animais que amamos!'
  },
  {
    id: 'gq-2',
    category: 'verbos',
    categoryLabel: 'Verbos de Ação',
    question: 'Na frase: "O sapinho PULA na lagoa", a palavra PULA é um:',
    emoji: '🐸',
    options: [
      {
        id: 'opt-1',
        text: 'Verbo (indica uma ação)',
        emoji: '⚡',
        isCorrect: true,
        explanation: 'Exato! "Pular" é o movimento e a ação que o sapinho faz com o corpinho!'
      },
      {
        id: 'opt-2',
        text: 'Substantivo (nome de objeto)',
        emoji: '📦',
        isCorrect: false,
        explanation: 'Substantivo seria "sapinho" ou "lagoa". Pular é a ação que ele faz!'
      },
      {
        id: 'opt-3',
        text: 'Adjetivo (uma cor ou beleza)',
        emoji: '🎨',
        isCorrect: false,
        explanation: 'Adjetivo seria dizer que o sapo é "verde" ou "engraçado".'
      },
      {
        id: 'opt-4',
        text: 'Ponto de interrogação',
        emoji: '❓',
        isCorrect: false,
        explanation: 'Ponto de interrogação é um sinal de pontuação, não uma palavra!'
      }
    ],
    hint: 'Pense: o que o sapinho está fazendo com as patinhas?'
  },
  {
    id: 'gq-3',
    category: 'adjetivos',
    categoryLabel: 'Adjetivos Carinhosos',
    question: 'Na frase: "Comi uma maçã DOCE e VERMELHA", as palavras em destaque são:',
    emoji: '🍎',
    options: [
      {
        id: 'opt-1',
        text: 'Adjetivos (mostram as qualidades)',
        emoji: '✨',
        isCorrect: true,
        explanation: 'Isso aí! "Doce" e "Vermelha" mostram como a maçã é, dando qualidades a ela!'
      },
      {
        id: 'opt-2',
        text: 'Verbos de velocidade',
        emoji: '🏃',
        isCorrect: false,
        explanation: 'O único verbo na frase é "comi". Doce e vermelha são características!'
      },
      {
        id: 'opt-3',
        text: 'Substantivos próprios',
        emoji: '🏷️',
        isCorrect: false,
        explanation: 'O substantivo é "maçã". Doce e vermelha são adjetivos!'
      },
      {
        id: 'opt-4',
        text: 'Sinais de exclamação',
        emoji: '❗',
        isCorrect: false,
        explanation: 'São palavras descritivas, não sinais de pontuação!'
      }
    ],
    hint: 'Como era o sabor e a cor da maçã?'
  },
  {
    id: 'gq-4',
    category: 'pontuacao',
    categoryLabel: 'Detetive da Pontuação',
    question: 'Quando queremos fazer uma PERGUNTA curiosa a um amigo, qual sinal usamos?',
    emoji: '🔍',
    options: [
      {
        id: 'opt-1',
        text: 'Ponto de Interrogação (?)',
        emoji: '❓',
        isCorrect: true,
        explanation: 'Perfeito! O Ponto de Interrogação (?) tem até o formatinho da orelha curiosa para ouvir a resposta!'
      },
      {
        id: 'opt-2',
        text: 'Ponto de Exclamação (!)',
        emoji: '❗',
        isCorrect: false,
        explanation: 'A exclamação (!) serve para susto, alegria ou animação.'
      },
      {
        id: 'opt-3',
        text: 'Ponto Final (.)',
        emoji: '⚫',
        isCorrect: false,
        explanation: 'O ponto final (.) encerra uma frase com calma sem perguntar nada.'
      },
      {
        id: 'opt-4',
        text: 'Vírgula (,)',
        emoji: '〰️',
        isCorrect: false,
        explanation: 'A vírgula (,) serve para respirar e separar palavras.'
      }
    ],
    hint: 'É aquele sinal com uma curvinha e um pingo embaixo que usamos para perguntar.'
  },
  {
    id: 'gq-5',
    category: 'antonimos',
    categoryLabel: 'Contrários (Antônimos)',
    question: 'Qual é a palavra CONTRÁRIA (antônimo) de FELIZ?',
    emoji: '🎭',
    options: [
      {
        id: 'opt-1',
        text: 'Triste',
        emoji: '😢',
        isCorrect: true,
        explanation: 'Muito bem! O contrário de estar feliz e sorridente é estar triste.'
      },
      {
        id: 'opt-2',
        text: 'Alegre',
        emoji: '😄',
        isCorrect: false,
        explanation: '"Alegre" significa a mesma coisa que feliz (é um sinônimo)!'
      },
      {
        id: 'opt-3',
        text: 'Rápido',
        emoji: '⚡',
        isCorrect: false,
        explanation: '"Rápido" é o contrário de devagar!'
      },
      {
        id: 'opt-4',
        text: 'Brilhante',
        emoji: '🌟',
        isCorrect: false,
        explanation: '"Brilhante" é o contrário de escuro!'
      }
    ],
    hint: 'Quando alguém não está com sorriso no rosto, como ela se sente?'
  },
  {
    id: 'gq-6',
    category: 'alfabeto',
    categoryLabel: 'As 5 Vogais Amigas',
    question: 'Quais são as 5 VOGAIS mágicas do nosso alfabeto da Língua Portuguesa?',
    emoji: '🅰️',
    options: [
      {
        id: 'opt-1',
        text: 'A, E, I, O, U',
        emoji: '⭐',
        isCorrect: true,
        explanation: 'Parabéns! As 5 vogais são o coração de todas as palavras: A, E, I, O, U!'
      },
      {
        id: 'opt-2',
        text: 'B, C, D, F, G',
        emoji: '🔤',
        isCorrect: false,
        explanation: 'Essas são consoantes, as outras letrinhas do alfabeto!'
      },
      {
        id: 'opt-3',
        text: '1, 2, 3, 4, 5',
        emoji: '🔢',
        isCorrect: false,
        explanation: 'Esses são números, usamos na matemática!'
      },
      {
        id: 'opt-4',
        text: 'L, M, N, P, R',
        emoji: '📝',
        isCorrect: false,
        explanation: 'Essas também são consoantes do alfabeto.'
      }
    ],
    hint: 'Cante a musiquinha: A-E-I-O-U!'
  }
];

// --- 6. ÁLBUM DE FIGURINHAS E RECOMPENSAS COLECIIONÁVEIS ---
export const STICKER_REWARDS: StickerReward[] = [
  {
    id: 'stk-1',
    title: 'Primeira Estrela',
    emoji: '⭐',
    description: 'Deu os primeiros passos no Mundo da Gramática!',
    requirement: 'Ganhe 100 pontos em qualquer desafio',
    unlockedAtPoints: 100,
    category: 'iniciante',
    color: 'from-amber-300 to-yellow-500'
  },
  {
    id: 'stk-2',
    title: 'Mestre das Caixinhas',
    emoji: '📦',
    description: 'Classificou com sucesso substantivos, verbos e adjetivos!',
    requirement: 'Alcance 300 pontos nas Caixas Mágicas',
    unlockedAtPoints: 300,
    category: 'iniciante',
    color: 'from-emerald-300 to-teal-500'
  },
  {
    id: 'stk-3',
    title: 'Lupa do Detetive',
    emoji: '🔍',
    description: 'Descobriu onde vão a interrogação, exclamação e ponto final!',
    requirement: 'Alcance 500 pontos no Detetive da Pontuação',
    unlockedAtPoints: 500,
    category: 'explorador',
    color: 'from-blue-300 to-cyan-500'
  },
  {
    id: 'stk-4',
    title: 'Palmas Musicais',
    emoji: '👏',
    description: 'Bateu palmas e separou todas as sílabas certinho!',
    requirement: 'Alcance 700 pontos no Caça-Sílabas',
    unlockedAtPoints: 700,
    category: 'explorador',
    color: 'from-purple-300 to-indigo-500'
  },
  {
    id: 'stk-5',
    title: 'Super Sanduíche do Salsicha',
    emoji: '🥪',
    description: 'Deixou o Salsicha pulando de alegria com seus acertos!',
    requirement: 'Alcance 900 pontos e ouça as comemorações!',
    unlockedAtPoints: 900,
    category: 'explorador',
    color: 'from-orange-300 to-amber-600'
  },
  {
    id: 'stk-6',
    title: 'Cartola do Plural Mágico',
    emoji: '🎩',
    description: 'Transformou palavras simples em plurais e gêneros perfeitos!',
    requirement: 'Alcance 1200 pontos no Caldeirão',
    unlockedAtPoints: 1200,
    category: 'mestre',
    color: 'from-fuchsia-300 to-pink-500'
  },
  {
    id: 'stk-7',
    title: 'Arco-Íris da Leitura',
    emoji: '🌈',
    description: 'Leu e ouviu histórias coloridas na língua portuguesa!',
    requirement: 'Alcance 1500 pontos totais',
    unlockedAtPoints: 1500,
    category: 'mestre',
    color: 'from-rose-300 to-red-500'
  },
  {
    id: 'stk-8',
    title: 'Coroa de Ouro da Gramática',
    emoji: '👑',
    description: 'Tornou-se o Grande Campeão da Língua Portuguesa!',
    requirement: 'Alcance 2000 pontos e receba o Certificado Oficial!',
    unlockedAtPoints: 2000,
    category: 'mestre',
    color: 'from-yellow-400 to-amber-600'
  }
];

// --- 7. MISSÕES DO DIA ---
export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'mis-1',
    title: 'Separar 3 Palavras nas Caixinhas',
    description: 'Coloque 3 palavras na caixinha certa de Substantivo, Verbo ou Adjetivo.',
    targetCount: 3,
    rewardStars: 30,
    gameKey: 'classes'
  },
  {
    id: 'mis-2',
    title: 'Ajudar o Detetive da Pontuação',
    description: 'Descubra a pontuação de 2 frases misteriosas.',
    targetCount: 2,
    rewardStars: 30,
    gameKey: 'pontuacao'
  },
  {
    id: 'mis-3',
    title: 'Bater Palmas nas Sílabas',
    description: 'Conte as sílabas ou ache 2 rimas encantadas.',
    targetCount: 2,
    rewardStars: 30,
    gameKey: 'silabas'
  },
  {
    id: 'mis-4',
    title: 'Acertar 1 Plural Maluco',
    description: 'Coloque a palavra certa no caldeirão mágico.',
    targetCount: 1,
    rewardStars: 20,
    gameKey: 'plural'
  }
];

// --- 8. NÍVEIS DE EXPERIÊNCIA ---
export interface PlayerLevel {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  emoji: string;
  badgeColor: string;
}

export const PLAYER_LEVELS: PlayerLevel[] = [
  { level: 1, name: 'Aprendiz das Letrinhas', minPoints: 0, maxPoints: 299, emoji: '🌱', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { level: 2, name: 'Caçador de Sílabas', minPoints: 300, maxPoints: 699, emoji: '🔍', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
  { level: 3, name: 'Detetive da Pontuação', minPoints: 700, maxPoints: 1199, emoji: '⭐', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
  { level: 4, name: 'Mestre dos Verbos', minPoints: 1200, maxPoints: 1999, emoji: '🚀', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
  { level: 5, name: 'Grão-Mestre da Gramática', minPoints: 2000, maxPoints: 99999, emoji: '👑', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' }
];

export function getPlayerLevel(points: number): PlayerLevel {
  for (let i = PLAYER_LEVELS.length - 1; i >= 0; i--) {
    if (points >= PLAYER_LEVELS[i].minPoints) {
      return PLAYER_LEVELS[i];
    }
  }
  return PLAYER_LEVELS[0];
}
