'use client';

import { useState } from 'react';
import CenterSvg from '../../assets/svg/center.svg';
import PreparingModal from '../modal/PreparingModal';

export default function Footer() {
  const [showPreparing, setShowPreparing] = useState(false);

  return (
    <>
      <footer className='footer_container adsense-auto-ads-ignore'>
        <div className='footer_content_box'>
          <div className='footer_left_content'>
            <div className='footer_content_main_title_box'>
              <span className='footer_content_main_title'>셈셈 : 부동산 계산기</span>
            </div>
            <div className='footer_content_section'>
              <div>
                <div className='footer_content'>
                  <span className='footer_content_title'>대표</span>{' '}
                  <span className='footer_content_content'>최정만</span>
                </div>
                <div className='footer_content'>
                  <span className='footer_content_title'>본사</span>{' '}
                  <span className='footer_content_content'>
                    서울특별시 금천구 가산디지털2로 144, 414호
                  </span>
                </div>
                <div className='footer_content'>
                  <span className='footer_content_title'>연구센터</span>{' '}
                  <span className='footer_content_content'>
                    서울특별시 강남구 선릉로 86길 40, 4층
                  </span>
                </div>
              </div>
              <div>
                <div className='footer_content'>
                  <span className='footer_content_title'>이메일</span>{' '}
                  <span className='footer_content_content'>contact@returnplus.kr</span>
                </div>
                <div className='footer_content'>
                  <span className='footer_content_title'>사업자 등록번호</span>{' '}
                  <span className='footer_content_content'>368-87-03414</span>
                </div>
              </div>
            </div>
          </div>
          <div className='footer_right_content'>
            <button className='footer_content_btn' onClick={() => setShowPreparing(true)}>
              <CenterSvg /> <span>개발자센터</span>
            </button>
          </div>
        </div>
        <div className='footer_copyright'>
          <span>Copyright © 2024 셈셈 : 부동산 계산기 All rights reserved.</span>
        </div>
      </footer>
      {showPreparing && <PreparingModal onClose={() => setShowPreparing(false)} />}
    </>
  );
}
