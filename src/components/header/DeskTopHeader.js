'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowSvg from '../../assets/svg/header_arrow.svg';
import bannerImg from '../../assets/img/small_banner.png';
import PreparingModal from '../modal/PreparingModal';

export default function DesktopHeader() {
  const headerRef = useRef(null);
  const navBoxRef = useRef(null);
  const submenuRef = useRef(null);
  const calcRef = useRef(null);
  const commRef = useRef(null);

  const [showPreparing, setShowPreparing] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [activeCat, setActiveCat] = useState('');
  const [activeSub, setActiveSub] = useState('');
  const [menuPos, setMenuPos] = useState({ width: 0, left: 0 });
  const [navLeft, setNavLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (navBoxRef.current && headerRef.current) {
        const navRect = navBoxRef.current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
        setMenuPos(pos => ({ width: navRect.width, left: pos.left }));
        setNavLeft(navRect.left - headerRect.left);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hovered === 'calc' || hovered === 'comm') {
      setActiveCat('');
    }
    setActiveSub('');
  }, [hovered]);

  useEffect(() => {
    const onScroll = () => {
      if (hovered) return;
      const y = window.scrollY;
      setShowHeader(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, hovered]);

  const openSub = (key, el) => {
    const { left, width } = el.getBoundingClientRect();
    setMenuPos({ width, left });
    setHovered(key);
  };

  const leaveLink = e => {
    const tgt = e.relatedTarget;
    if (!tgt || !(tgt instanceof Node) || (submenuRef.current && submenuRef.current.contains(tgt)))
      return;
    setHovered(null);
  };

  const leaveSub = e => {
    const tgt = e.relatedTarget;
    if (
      !tgt ||
      !(tgt instanceof Node) ||
      (calcRef.current && calcRef.current.contains(tgt)) ||
      (commRef.current && commRef.current.contains(tgt))
    )
      return;
    setHovered(null);
  };

  return (
    <>
      <div className='header' ref={headerRef}>
        <div className={`header_container${showHeader ? '' : ' hidden'}`}>
          <div className='header_wrapper'>
            <Link href='/' className='header_home_btn'>
              <Image src='/logo_row.png' alt='셈셈' width={80} height={32.5} />
            </Link>

            <nav className='header_nav_area'>
              <div className='header_nav_wrapper'>
                <div className='header_nav_box' ref={navBoxRef}>
                  <div
                    ref={calcRef}
                    className={hovered === 'calc' ? 'active' : ''}
                    onMouseEnter={e => openSub('calc', e.currentTarget)}
                    onMouseLeave={leaveLink}>
                    <span>부동산 계산기</span>
                  </div>

                  <div
                    ref={commRef}
                    className={hovered === 'comm' ? 'active' : ''}
                    onMouseEnter={e => openSub('comm', e.currentTarget)}
                    onMouseLeave={leaveLink}>
                    <span>투자·자산 커뮤니티</span>
                  </div>

                  <a href='https://prime2x.com/' target='_blank' rel='noopener noreferrer'>
                    <span>프라임 지분 거래소</span>
                    <ArrowSvg />
                  </a>

                  <a className='header_self_btn' onClick={() => setShowPreparing(true)}>
                    <span>셀프 투자 유형 분석</span>
                    <ArrowSvg />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {hovered && (
          <div className='header_submenu' ref={submenuRef} onMouseLeave={leaveSub}>
            <a
              href='http://daeyeonpnc.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='header_banner_box'
              style={{ left: `${navLeft - 380}px` }}>
              <Image src={bannerImg} alt='Banner' />
              <div className='header_banner'>
                <span>DAEYEON P&C</span>
                <span>
                  PIANO FORTE : <br />
                  평범하지만 특별한 당신에게, <br />
                  라이프 스타일 맞춤형 타운하우스
                </span>
              </div>
            </a>

            <div
              className='header_submenu_inner'
              style={{ width: `${menuPos.width}px`, transform: `translateX(${menuPos.left}px)` }}>
              {hovered === 'calc' && (
                <>
                  <div className='submenu_categories'>
                    {['세금 계산', '임대 투자', '금리 정보'].map(cat => (
                      <div
                        key={cat}
                        className={`submenu_category${activeCat === cat ? ' active' : ''}`}
                        onMouseEnter={() => setActiveCat(cat)}>
                        {cat}
                      </div>
                    ))}
                  </div>
                  <span className='line' />
                  <div className='submenu_items'>
                    {activeCat === '세금 계산' && (
                      <ul>
                        {[
                          ['중개수수료', '/calc/Brokerage'],
                          ['양도세', '/calc/CapitalGainsTax'],
                          ['법인 양도세', '/calc/CoporateCapitalGainsTax'],
                          ['보유세', '/calc/HoldingTax'],
                          ['취득세', '/calc/AcquisitionTax'],
                          ['증여세', '/calc/GiftTax'],
                          ['상속세', '/calc/InheritanceTax'],
                        ].map(([t, link]) => (
                          <li key={t}>
                            <Link
                              href={link}
                              className={activeSub === t ? 'active' : ''}
                              onMouseEnter={() => setActiveSub(t)}
                              onMouseLeave={() => setActiveSub('')}
                              onClick={() => setHovered(null)}>
                              {t}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}

              {hovered === 'comm' && (
                <>
                  <div className='submenu_categories' style={{ marginLeft: 19 }}>
                    {['청약', '뉴스', '정책'].map(cat => (
                      <div
                        key={cat}
                        className={`submenu_category${activeCat === cat ? ' active' : ''}`}
                        onMouseEnter={() => setActiveCat(cat)}>
                        {cat}
                      </div>
                    ))}
                  </div>
                  <span className='line' />
                  <div className='submenu_items'>
                    {activeCat === '청약' && (
                      <ul>
                        <li>
                          <Link
                            href='/subscription'
                            className={activeSub === '청약 일정' ? 'active' : ''}
                            onMouseEnter={() => setActiveSub('청약 일정')}
                            onMouseLeave={() => setActiveSub('')}
                            onClick={() => setHovered(null)}>
                            청약 일정
                          </Link>
                        </li>
                      </ul>
                    )}
                    {activeCat === '뉴스' && (
                      <ul>
                        <li>
                          <Link
                            href='/news'
                            className={activeSub === '부동산 뉴스' ? 'active' : ''}
                            onMouseEnter={() => setActiveSub('부동산 뉴스')}
                            onMouseLeave={() => setActiveSub('')}
                            onClick={() => setHovered(null)}>
                            부동산 뉴스
                          </Link>
                        </li>
                      </ul>
                    )}
                    {activeCat === '정책' && (
                      <ul>
                        <li>
                          <Link
                            href='/policy'
                            className={activeSub === '부동산 정책' ? 'active' : ''}
                            onMouseEnter={() => setActiveSub('부동산 정책')}
                            onMouseLeave={() => setActiveSub('')}
                            onClick={() => setHovered(null)}>
                            부동산 정책
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {showPreparing && <PreparingModal onClose={() => setShowPreparing(false)} />}
    </>
  );
}
