import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Happy Birthday Sayangku ❤️',
  description: 'A special digital gift for Aprilia Tri Kurniawati',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans bg-[#FFFFF0] text-[#A9BA9D] overflow-x-hidden min-h-screen relative antialiased selection:bg-[#D4AF37] selection:text-[#FFFDD0]">
        
        {/* Lily Watermark Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 flex items-center justify-center pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="#A9BA9D" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round" className="w-full max-w-[800px] h-auto object-contain">
            <path d="M12 22v-6c0-2 1-3 3-4 1.5-.75 4-.5 5-2 .5-1-1-3-3-2-3 1.5-6.5-1-8-5 0 0-1.5 4-8 5-2-1-3.5 1-3 2 1 1.5 3.5 1.25 5 2 2 1 3 2 3 4v6" />
            <path d="M12 8c2.5 1.5 5 3 5 6" />
            <path d="M12 8c-2.5 1.5-5 3-5 6" />
            <path d="M12 14v4" />
          </svg>
        </div>

        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
