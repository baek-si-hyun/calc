'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowSvg from '../../assets/svg/main_arrow.svg';
import HelpSvg from '../../assets/svg/help.svg';
import NewsArrowSvg from '../../assets/svg/m_news_arrow.svg';
import ExtraArrowSvg from '../../assets/svg/extra_arrow.svg';
import Subscription1Svg from '../../assets/svg/subsription_1.svg';
import Subscription2Svg from '../../assets/svg/subsription_2.svg';
import Subscription3Svg from '../../assets/svg/subsription_3.svg';
import useWindowWidth from '../../hooks/useWindowWidth';
import { categories } from '../../data/staticData';
import { newApi } from '../../api/newsApi';
import { policyApi } from '../../api/policyApi';
import ministryImg from '../../assets/img/ministry.png';
import policyBriefingImg from '../../assets/img/policy_briefing.png';
import revenueImg from '../../assets/img/revenue.png';
import financialImg from '../../assets/img/financial.png';
import landImg from '../../assets/img/land.png';
import PolicyMainSkeleton from '../../components/skeleton/PolicyMainSkeleton';
import NewsMainSkeleton from '../../components/skeleton/NewsMainSkeleton';
import defaultImg from '../../assets/img/thumbnail.png';
import { subscriptionApi } from '../../api/subscriptionApi';
import { useQuery } from '@tanstack/react-query';
import MainSlider from './_components/MainSlider';

const imgSetting = organ => {
  switch (organ) {
    case '기획재정부':
      return ministryImg;
    case '대한민국정책브리핑':
      return policyBriefingImg;
    case '국세청':
      return revenueImg;
    case '금융위원회':
      return financialImg;
    case '국토교통부':
      return landImg;
    default:
      return defaultImg;
  }
};

export default function HomePage() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 1023;

  const [activeModal, setActiveModal] = useState(null);
  const [isModalFading, setIsModalFading] = useState(false);
  const timeoutRef = useRef(null);

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['newsMain'],
    queryFn: newApi,
  });

  const { data: policyData, isLoading: policyLoading } = useQuery({
    queryKey: ['policyMain'],
    queryFn: policyApi,
  });

  const { data: subscriptionData, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['subscriptionMain'],
    queryFn: subscriptionApi,
  });

  useEffect(() => {
    const handleClickOutside = e => {
      if (activeModal && !e.target.closest('.category_info')) {
        setIsModalFading(true);
        setTimeout(() => {
          setActiveModal(null);
          setIsModalFading(false);
        }, 500);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeModal]);

  const handleHelpClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveModal(id);
    setIsModalFading(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsModalFading(true);
      setTimeout(() => {
        setActiveModal(null);
        setIsModalFading(false);
      }, 500);
    }, 3000);
  };

  const formatDate = dateStr => {
    const d = new Date(dateStr.replace(' ', 'T'));
    const yy = String(d.getFullYear()).slice(-2);
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yy}/${MM}/${dd}`;
  };

  return (
    <>
      {' '}
      <div className='category_container'>
        <div className='category_content_box'>
          {isMobile ? (
            <div className='category_list'>
              {[0, 1, 2, 3].map(group => (
                <div className='category_group' key={group}>
                  {categories.slice(group * 2, group * 2 + 2).map(item => (
                    <Link key={item.id} href={`/calc/${item.id}`} className='category_item'>
                      <div className='category_info'>
                        <div className='category_name'>
                          <span>{item.name}</span>
                          <span className='help_svg_box'>
                            <HelpSvg onClick={e => handleHelpClick(e, item.id)} />
                            {activeModal === item.id && (
                              <div
                                className={`category_description_modal${
                                  isModalFading ? ' fade-out' : ''
                                }`}>
                                <span>{item.description}</span>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className='category_image'>
                        <Image src={item.img} alt={item.name} width={64} height={64} />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className='category_list'>
              {[0, 1, 2].map(group => (
                <div className='category_group' key={group}>
                  {categories
                    .slice(
                      group === 0 ? 0 : group === 1 ? 2 : 5,
                      group === 0 ? 2 : group === 1 ? 5 : 7,
                    )
                    .map(item => (
                      <Link key={item.id} href={`/calc/${item.id}`} className='category_item'>
                        <div className='category_info'>
                          <div className='category_name'>{item.name}</div>
                          <div className='category_description'>{item.description}</div>
                        </div>
                        <div className='category_image'>
                          <Image src={item.img} alt={item.name} width={140} height={140} />
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          )}

          <div className='main_slider'>
            <MainSlider />
            <a
              className='fixed_banner'
              href='https://returnplus.kr/'
              target='_blank'
              rel='noopener noreferrer'>
              <Image
                src='https://imagedelivery.net/4aEUbX05h6IovGOQjgkfSw/32082eef-7c0f-4baa-e8e3-d5497e04bb00/public'
                alt='banner'
                width={300}
                height={200}
                className='fixed_banner_img'
              />
              <span className='fixed_banner_content'>
                Return Plus :<br />
                더 빠르고 스마트한
                <br />
                자산관리의 시작
              </span>
            </a>
          </div>
        </div>

        <div className='extra_content_box'>
          <Link href='/calc/RentalYield' className='extra_section'>
            <div className='extra_box'>
              <div className='extra_item_name'>임대투자</div>
              <div className='extra_item_description'>
                임대수익률, 적정매수가, 간주임대료 계산기
              </div>
            </div>
            <div className='extra_btn'>
              <ExtraArrowSvg />
            </div>
          </Link>
          <Link href='/rate/DepositRate' className='extra_section'>
            <div className='extra_box'>
              <div className='extra_item_name'>금리정보</div>
              <div className='extra_item_description'>예금・대출금리 확인</div>
            </div>
            <div className='extra_btn'>
              <ExtraArrowSvg />
            </div>
          </Link>
        </div>
      </div>
      {/* 청약 */}
      <div className='content_box'>
        <div className='content_title_box'>
          <span className='content_title'>청약 일정</span>
        </div>
        <div className='subscription_list_main'>
          <Link href='/subscription' className='subscription_item_main first_item'>
            <Subscription1Svg />
            <div>
              <span>전체일정</span>
            </div>
          </Link>
          <div className='subscription_item_main'>
            <Subscription2Svg />
            <div>
              <span>오늘 청약</span>
              <span className='subscription_item_count'>
                {subscriptionLoading ? '-' : subscriptionData?.todayCount ?? '-'}
              </span>
              <span>건</span>
            </div>
          </div>
          <div className='subscription_item_main'>
            <Subscription3Svg />
            <div>
              <span>이번 주 청약</span>
              <span className='subscription_item_count'>
                {subscriptionLoading ? '-' : subscriptionData?.weeklyCount ?? '-'}
              </span>
              <span>건</span>
            </div>
          </div>
        </div>
      </div>
      {/* 뉴스 */}
      <div className='content_box'>
        <div className='content_title_box'>
          <span className='content_title'>부동산 뉴스</span>
          <Link href='/news' className='content_more_btn'>
            {isMobile ? (
              <NewsArrowSvg />
            ) : (
              <>
                <span>더보기</span>
                <div className='content_svg_box'>
                  <ArrowSvg />
                </div>
              </>
            )}
          </Link>
        </div>
        {newsLoading ? (
          <NewsMainSkeleton />
        ) : (
          <div className='news_list'>
            {newsData?.data.map((item, idx) => (
              <Link key={idx} href={`/news/detail/${item.id}`} className='news_item'>
                <div className='news_img_box'>
                  <Image src={item.image || defaultImg} alt={item.title} />
                </div>
                <div className='news_content'>
                  <span className='news_title'>{item.title}</span>
                  <span className='news_date'>{formatDate(item.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* 정책 */}
      <div className='content_box'>
        <div className='content_title_box'>
          <span className='content_title'>부동산 정책</span>
          <Link href='/policy' className='content_more_btn'>
            {isMobile ? (
              <NewsArrowSvg />
            ) : (
              <>
                <span>더보기</span>
                <div className='content_svg_box'>
                  <ArrowSvg />
                </div>
              </>
            )}
          </Link>
        </div>
        {policyLoading ? (
          <PolicyMainSkeleton />
        ) : (
          <div className='policy_list'>
            {policyData?.data.map((item, idx) => (
              <Link key={idx} href={`/policy/detail/${item.id}`} className='policy_item'>
                <div className='policy_img_box'>
                  <Image
                    src={imgSetting(item.governmentName)}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className='policy_content'>
                  <span className='policy_title'>{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
