import '../config/firebaseConfig';
import localFont from 'next/font/local';
import MainContainer from './MainContainer';
import Providers from './providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={pretendard.className}>
        <Providers>
          <MainContainer>{children}</MainContainer>
        </Providers>
      </body>
    </html>
  );
}
