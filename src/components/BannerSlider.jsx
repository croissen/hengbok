import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%; /* 가로:세로 비율 2:1 (width 100%일 때 height는 50%) */
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 40px;
  background-color: #f0f0f0; /* 로딩 중 배경색 */
`;

const Slide = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 아래쪽으로 정렬 */
`;

const SlideTitle = styled.h3`
  font-size: 2.2em;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const SlideDescription = styled.p`
  font-size: 1.2em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

function BannerSlider({ banners }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return; // 배너가 1개 이하면 슬라이드 할 필요 없음

    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % banners.length);
    }, 1000); // 1초마다 슬라이드

    return () => clearInterval(slideInterval);
  }, [banners]); // banners가 변경될 때마다 재설정

  if (!banners || banners.length === 0) {
    return null; // 배너 데이터가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <BannerWrapper>
      {banners.map((banner, index) => (
        <Slide
          key={banner.id}
          $active={index === currentSlide} // styled-components에 $를 붙여 prop임을 명시
          href={banner.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SlideImage src={banner.image} alt={banner.title} />
          <SlideContent>
            <SlideTitle>{banner.title}</SlideTitle>
            <SlideDescription>{banner.content}</SlideDescription>
          </SlideContent>
        </Slide>
      ))}
    </BannerWrapper>
  );
}

export default BannerSlider;