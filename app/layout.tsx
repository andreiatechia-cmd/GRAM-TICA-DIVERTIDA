import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Aprenda Inglês & Português: Jogo da Memória & Quiz com Explicação de Erros',
  description: 'Jogo educativo bilíngue para iniciantes com Jogo da Memória de 16 pares, Quiz de perguntas e respostas com explicação detalhada dos erros, pronúncia com voz e ranking semanal.',
  openGraph: {
    title: 'Aprenda Inglês & Português: Jogo da Memória & Quiz com Explicação de Erros',
    description: 'Jogo educativo bilíngue para iniciantes com Jogo da Memória de 16 pares, Quiz de perguntas e respostas com explicação detalhada dos erros, pronúncia com voz e ranking semanal.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aprenda Inglês & Português: Jogo da Memória & Quiz com Explicação de Erros',
    description: 'Jogo educativo bilíngue para iniciantes com Jogo da Memória de 16 pares, Quiz de perguntas e respostas com explicação detalhada dos erros, pronúncia com voz e ranking semanal.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
