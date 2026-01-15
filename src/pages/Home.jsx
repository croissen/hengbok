import React from 'react';
import * as S from './Home.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function Home() {
  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.HeroSection>
          <h1>행복을 담아가세요!</h1>
          <p>오늘의 특별한 할인 상품을 만나보세요.</p>
          <S.ActionButton>쇼핑하기</S.ActionButton>
        </S.HeroSection>

        <S.ProductGrid>
          <h2>인기 상품</h2>
          <S.ProductCard>
            <S.ProductImage src="https://via.placeholder.com/150" alt="상품 이미지1" />
            <S.ProductName>행복 상품 1</S.ProductName>
            <S.ProductPrice>12,000원</S.ProductPrice>
          </S.ProductCard>
          <S.ProductCard>
            <S.ProductImage src="https://via.placeholder.com/150" alt="상품 이미지2" />
            <S.ProductName>행복 상품 2</S.ProductName>
            <S.ProductPrice>25,000원</S.ProductPrice>
          </S.ProductCard>
        </S.ProductGrid>
      </S.MainContent>

      <Footer />
    </S.Container>
  );
}

export default Home;