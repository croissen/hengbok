import React, { useState } from 'react';
import * as S from './Home.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import productsData from '../assets/data/products.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
    setIsSearching(true);
  };

  const popular = productsData.filter(product => product.category === '인기상품');
  const womenFashion = productsData.filter(product => product.category === '여성패션');

  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.HeroSection>
          <S.BackgroundVideo autoPlay loop muted playsInline>
            <source src="/images/영상.mp4" type="video/mp4" />
          </S.BackgroundVideo>
          <S.HeroContent>
            <h1>행복을 담아가세요!</h1>
            <p>오늘의 특별한 할인 상품을 만나보세요.</p>
          </S.HeroContent>
        </S.HeroSection>

        <S.DisclaimerText>
          하단 링크로 구매하면 쿠팡으로부터 일정액의 수수료를 제공 받아 채널 운영에 도움이 됩니다.
        </S.DisclaimerText>

        <S.SearchSection>
          <S.SearchInput
            type="text"
            placeholder="원하는 상품을 검색해보세요!"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
        </S.SearchSection>

        {isSearching ? (
          <>
            <S.ProductCat>"{searchTerm}" 검색 결과</S.ProductCat>
            {searchResults.length > 0 ? (
              <S.ProductGrid>
                {searchResults.map(product => (
                  <S.ProductCard key={product.id}>
                    <S.ProductImage src={product.image} alt={product.name} />
                    <S.ProductName>{product.name}</S.ProductName>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
            ) : (
              <S.NoResultsMessage>"{searchTerm}"에 대한 검색 결과가 없습니다.</S.NoResultsMessage>
            )}
          </>
        ) : (
          <>
            <S.ProductCat>인기상품</S.ProductCat>
            <S.ProductGrid>
              {popular.map(product => (
                <S.ProductCard key={product.id}>
                  <S.ProductImage src={product.image} alt={product.name} />
                  <S.ProductName>{product.name}</S.ProductName>
                </S.ProductCard>
              ))}
            </S.ProductGrid>

            <S.ProductCat>여성패션</S.ProductCat>
            <S.ProductGrid>
              {womenFashion.map(product => (
                <S.ProductCard key={product.id}>
                  <S.ProductImage src={product.image} alt={product.name} />
                  <S.ProductName>{product.name}</S.ProductName>
                </S.ProductCard>
              ))}
            </S.ProductGrid>
          </>
        )}
      </S.MainContent>

      <Footer />
    </S.Container>
  );
}

export default Home;