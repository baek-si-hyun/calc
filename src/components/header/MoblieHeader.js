'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuArrowSvg from '../../assets/svg/gray_arrow.svg';
import BurgerSvg from '../../assets/svg/burger_menu.svg';
import HomeSvg from '../../assets/svg/home.svg';
import CancelSvg from '../../assets/svg/cancel.svg';
import ArrowSvg from '../../assets/svg/hearder_arrow_mini.svg';
import bannerImg from '../../assets/img/small_banner.png';
import PreparingModal from '../modal/PreparingModal';

export default function MobileHeader() {
  const [sideOpen, setSideOpen] = useState(false);
  const [topKey, setTopKey] = useState('calc');
  const [activeCat, setActiveCat] = useState('세금 계산');
  const [showPreparingModal, setShowPreparingModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sideOpen ? 'hidden' : '';
  }, [sideOpen]);

  const onTopSelect = key => {
    if (key === 'calc') {
      setTopKey('calc');
      setActiveCat('세금 계산');
    } else if (key === 'comm') {
      setTopKey('comm');
      setActiveCat('청약');
    } else if (key === 'prime') {
      window.open('https://prime2x.com/', '_blank');
      setSideOpen(false);
    } else if (key === 'self') {
      setShowPreparingModal(true);
      setSideOpen(false);
    }
  };

  const closeSide = () => setSideOpen(false);

  const TOP_MENUS = [
    { key: 'calc', label: '부동산 계산기' },
    { key: 'comm', label: '투자·자산 커뮤니티' },
    { key: 'prime', label: '프라임 지분 거래소' },
    { key: 'self', label: '셀프 투자 유형 분석' },
  ];

  const CAT_MAP = {
    calc: ['세금 계산', '임대 투자', '금리 정보'],
    comm: ['청약', '뉴스', '정책'],
  };

  const SUB_LINKS = {
    '세금 계산': [
      ['중개수수료', '/calc/Brokerage'],
      ['양도세', '/calc/CapitalGainsTax'],
      ['법인 양도세', '/calc/CoporateCapitalGainsTax'],
      ['보유세', '/calc/HoldingTax'],
      ['취득세', '/calc/AcquisitionTax'],
      ['증여세', '/calc/GiftTax'],
      ['상속세', '/calc/InheritanceTax'],
    ],
    '임대 투자': [
      ['임대수익률', '/calc/RentalYield'],
      ['적정매수가', '/calc/AppropriatePrice'],
      ['간주임대료', '/calc/DeemedRent'],
    ],
    '금리 정보': [
      ['예금 금리', '/rate/DepositRate'],
      ['대출 금리', '/rate/LoanRate'],
    ],
    '청약': [['청약 일정', '/subscription']],
    '뉴스': [['부동산 뉴스', '/news']],
    '정책': [['부동산 정책', '/policy']],
  };

  return (
    <>
      <div className='mobile_header adsense-auto-ads-ignore'>
        <div className='mobile_header_container'>
          {sideOpen ? (
            <>
              <Link href='/'>
                <HomeSvg />
              </Link>
              <button onClick={closeSide}>
                <CancelSvg />
              </button>
            </>
          ) : (
            <>
              <div className='mobile_logo_box'>
                <Link href='/' className='mobile_logo_btn'>
                  <Image src='/logo_row.png' width={120} height={40} alt='셈셈' />
                </Link>
              </div>
              <div className='mobile_tool_box'>
                <button onClick={() => setSideOpen(true)}>
                  <BurgerSvg />
                </button>
              </div>
            </>
          )}
        </div>

        {sideOpen && (
          <div className='mobile_header_active_box'>
            <div className='mobile_top_menu'>
              {TOP_MENUS.map(({ key, label }) => (
                <button
                  key={key}
                  className={`mobile_top_btn ${topKey === key ? 'active' : ''}`}
                  onClick={() => onTopSelect(key)}>
                  <span>{label}</span>
                  {(key === 'prime' || key === 'self') && <ArrowSvg />}
                </button>
              ))}
            </div>

            {['calc', 'comm'].includes(topKey) && (
              <div className='mobile_header_submenu'>
                <div className='mobile_submenu_categories'>
                  {CAT_MAP[topKey].map(cat => (
                    <div
                      key={cat}
                      className={`mobile_submenu_category ${
                        activeCat === cat ? 'mobile_active' : ''
                      }`}
                      onClick={() => setActiveCat(cat)}>
                      {cat}
                    </div>
                  ))}
                </div>

                <div className='mobile_submenu_items'>
                  <ul>
                    {SUB_LINKS[activeCat].map(([txt, link]) => (
                      <li key={txt}>
                        <Link href={link} onClick={closeSide}>
                          <span>{txt}</span>
                          <MenuArrowSvg />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href='http://daeyeonpnc.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mobile_header_banner_box'>
                    <Image src={bannerImg} alt='Banner' width={200} height={80} />
                    <div className='mobile_header_banner'>
                      <span>
                        PIANO FORTE : <br />
                        평범하지만 특별한 당신에게, <br />
                        라이프 스타일 맞춤형 타운하우스
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showPreparingModal && <PreparingModal onClose={() => setShowPreparingModal(false)} />}
    </>
  );
}
