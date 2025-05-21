'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { slideItem } from '../../../data/staticData';
import useWindowWidth from '../../../hooks/useWindowWidth';
import PreparingModal from '@/components/modal/PreparingModal';
import Image from 'next/image';

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showPreparingModal, setShowPreparingModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 1280;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='slider_container'>
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            el: '.pagination',
            clickable: true,
            renderBullet: (index, className) =>
              `<button key="${index}" class="dot ${className}"></button>`,
          }}
          onSlideChange={swiper => setCurrentSlide(swiper.realIndex + 1)}>
          {slideItem.map((data, index) => (
            <SwiperSlide key={index}>
              <a
                href={data.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`slide slide-${index}`}
                onClick={e => {
                  if (data.company === 'Han Jogak') {
                    e.preventDefault();
                    setShowPreparingModal(true);
                  }
                }}>
                <Image
                  className='slide_img'
                  src={data.img}
                  alt={`Slide ${index + 1} - ${data.company}`}
                  width={1920}
                  height={1080}
                  loading='lazy'
                  decoding='async'
                  draggable='false'
                />
                <div className='slide_content'>
                  <div className='slide_content_box'>
                    <span className='company'>{data.company}</span>
                    <span className='content'>{data.content}</span>
                  </div>
                  {!isMobile && (
                    <div className='link_btn_box'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='104'
                        height='13'
                        viewBox='0 0 104 13'
                        fill='none'>
                        <path d='M0 12L101 12L90 1' stroke='white' strokeWidth='2' />
                      </svg>
                      <span className='link_btn'>홈페이지 바로가기</span>
                    </div>
                  )}
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {isMobile ? (
          <div className='slide_count_box'>
            <span className='slide_count'>
              {currentSlide}/{slideItem.length}
            </span>
          </div>
        ) : (
          <div className='pagination' />
        )}
      </div>

      {showPreparingModal && <PreparingModal onClose={() => setShowPreparingModal(false)} />}
    </>
  );
}
