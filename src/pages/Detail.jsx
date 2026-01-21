import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './Detail.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import productsData from '../assets/data/products.json';

function Detail() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : '';
  const marqueeText = "페이지 내 링크로 구매하면 쿠팡으로부터 일정액의 수수료를 제공 받아 채널 운영에 도움이 됩니다. ";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (decodedCategoryName) {
      const filtered = productsData.filter(
        (product) => product.category && product.category === decodedCategoryName
      );
      setCategoryProducts(filtered);
    }
  }, [decodedCategoryName]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const mainCategories = [
    { name: "여성패션", href: `/category/${encodeURIComponent("여성패션")}` },
    { name: "뷰티", href: `/category/${encodeURIComponent("뷰티")}` },
    { name: "가전/디지털", href: `/category/${encodeURIComponent("가전/디지털")}` },
    { name: "식품", href: `/category/${encodeURIComponent("식품")}` },
    { name: "건강식품", href: `/category/${encodeURIComponent("건강식품")}` },
  ];

  return (
    <S.Container>
      <Header categories={mainCategories} />

      <S.MainContent>
        <S.ProductCatDiv>
          <S.ProductCat>{decodedCategoryName}</S.ProductCat>
          <S.BackTextButton onClick={handleBackButtonClick}>← back</S.BackTextButton>
        </S.ProductCatDiv>

        <S.CoupangDiv>
            <iframe
              src="https://coupa.ng/clmnT2"
              width="100%"
              height="36"
              frameBorder="0"
              scrolling="no"
              referrerPolicy="unsafe-url"
              title="쿠팡 관련 상품 광고"
              browsingtopics
            ></iframe>
            {isMobile ? (
              <S.CoupangMarqueeWrapper>
                <S.CoupangScrollingContainer>
                  <S.CoupangP>{marqueeText}</S.CoupangP>
                  <S.CoupangP>{marqueeText}</S.CoupangP>
                </S.CoupangScrollingContainer>
              </S.CoupangMarqueeWrapper>
            ) : (
              <S.CoupangP style={{textAlign: 'center'}}>{marqueeText}</S.CoupangP>
            )}
        </S.CoupangDiv>


        {categoryProducts.length > 0 ? (
          <S.ProductGrid>
            {categoryProducts.map((product) => (
              <S.ProductCard
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.ProductImage src={product.image} alt={product.name} />
                <S.ProductName>{product.id}. {product.name}</S.ProductName>
              </S.ProductCard>
            ))}
          </S.ProductGrid>
        ) : (
          <S.NoResultsMessage>{decodedCategoryName} 카테고리에 대한 상품이 없습니다.</S.NoResultsMessage>
        )}
      </S.MainContent>

      <Footer />

      {showScrollButton && (
        <S.ScrollToTopButton onClick={scrollToTop} $isVisible={showScrollButton}>
          ↑
        </S.ScrollToTopButton>
      )}
    </S.Container>
  );
}

export default Detail;