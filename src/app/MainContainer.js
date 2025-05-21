'use client'; // usePathname 쓸 거라 client 컴포넌트
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { usePathname } from 'next/navigation';


export default function MainContainer({ children }) {
  const path = usePathname();
  const isMain = path.includes('/calc/');

  return (
    <div className='home'>
      <div className='container'>
        <Header isMainPage={isMain} />
        <div className='wrapper'>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
