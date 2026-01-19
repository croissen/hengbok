import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Home.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import productsData from '../assets/data/products.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const sortAndPrioritizeResults = (results, query) => {
    const idToPrioritize = parseInt(query, 10);
    const hasOriginalParenthesis = (product) => (product && product.name && product.name.includes(')'));

    let prioritizedById = null;
    const filteredResults = [];

    for (const product of results) {
      if (product && !isNaN(idToPrioritize) && product.id === idToPrioritize) {
        prioritizedById = product;
      } else if (product) {
        filteredResults.push(product);
      }
    }

    filteredResults.sort((a, b) => {
      const aHasParen = hasOriginalParenthesis(a);
      const bHasParen = hasOriginalParenthesis(b);

      if (aHasParen && !bHasParen) {
        return -1;
      }
      if (!aHasParen && bHasParen) {
        return 1;
      }
      return 0;
    });

    if (prioritizedById) {
      return [prioritizedById, ...filteredResults];
    }
    return filteredResults;
  };

  const performSearch = (query) => {
    if (query.trim() !== '') {
      const filtered = productsData.filter(product => {
        const productName = product.name ? product.name.toLowerCase() : '';
        const lowerCaseQuery = query.toLowerCase();
        return productName.includes(lowerCaseQuery) || (product.id && product.id.toString() === query.trim());
      });
      setSearchResults(sortAndPrioritizeResults(filtered, query));
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const popularProductIds = [1, 2, 3, 302, 301, 103, 102, 201, 202, 203];
  const popularProducts = popularProductIds.map(id => productsData.find(product => product.id === id)).filter(Boolean);

  const mainCategories = [
    { name: "여성패션", href: `/category/${encodeURIComponent("여성패션")}` },
    { name: "뷰티", href: `/category/${encodeURIComponent("뷰티")}` },
    { name: "가전/디지털", href: `/category/${encodeURIComponent("가전/디지털")}` },
    { name: "식품", href: `/category/${encodeURIComponent("식품")}` },
  ];

  const disclaimerMessage = "하단 링크로 구매하면 쿠팡으로부터 일정액의 수수료를 제공 받아 채널 운영에 도움이 됩니다.";

  return (
    <S.Container>
      <Header categories={mainCategories} />

      <S.MainContent>
        {!isSearching && (
          <>
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
              <span>
                {isMobile ? `${disclaimerMessage} ${disclaimerMessage}` : disclaimerMessage}
              </span>
            </S.DisclaimerText>
          </>
        )}

        <S.SearchSection>
          <S.SearchInput
            type="text"
            placeholder="번호 및 상품명을 입력하세요"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => { if (e.key === 'Enter') performSearch(searchTerm); }}
          />
          <S.SearchButton onClick={handleResetSearch}>초기화</S.SearchButton>
        </S.SearchSection>

        {isSearching ? (
          <>
            <S.ProductCatDiv>
              <S.ProductCat>"{searchTerm}" 검색 결과</S.ProductCat>
            </S.ProductCatDiv>
            {searchResults.length > 0 ? (
              <S.ProductGrid $isSearchResults={true}>
                {searchResults.map(product => (
                  <S.ProductCard key={product.id} href={product.link} target="_blank" rel="noopener noreferrer" $isSearchResults={true}>
                    <S.ProductImage src={product.image} alt={product.name} />
                    <S.ProductName>{product.id}. {product.name}</S.ProductName>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
            ) : (
              <S.NoResultsMessage>"{searchTerm}"에 대한 검색 결과가 없습니다.</S.NoResultsMessage>
            )}
          </>
        ) : (
          <>
            {popularProducts.length > 0 && (
              <React.Fragment>
                <S.ProductCatDiv>
                  <S.ProductCat>인기상품</S.ProductCat>
                </S.ProductCatDiv>
                <S.ProductGrid $isSearchResults={false}>
                  {popularProducts.slice(0, 10).map(product => (
                    <S.ProductCard key={product.id} href={product.link} target="_blank" rel="noopener noreferrer" $isSearchResults={false}>
                      <S.ProductImage src={product.image} alt={product.name} />
                      <S.ProductName>{product.id}. {product.name}</S.ProductName>
                    </S.ProductCard>
                  ))}
                </S.ProductGrid>
              </React.Fragment>
            )}

            {mainCategories.map(category => {
              const productsInMainCategory = productsData.filter(product => product.category === category.name);

              if (productsInMainCategory.length === 0) {
                return null;
              }

              return (
                <React.Fragment key={category.name}>
                  <S.ProductCatDiv>
                    <S.ProductCat>{category.name}</S.ProductCat>
                    <S.MoreLink as={Link} to={category.href} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>more →</S.MoreLink>
                  </S.ProductCatDiv>
                  <S.ProductGrid $isSearchResults={false}>
                    {productsInMainCategory.slice(0, 10).map(product => (
                      <S.ProductCard key={product.id} href={product.link} target="_blank" rel="noopener noreferrer" $isSearchResults={false}>
                        <S.ProductImage src={product.image} alt={product.name} />
                        <S.ProductName>{product.id}. {product.name}</S.ProductName>
                      </S.ProductCard>
                    ))}
                  </S.ProductGrid>
                </React.Fragment>
              );
            })}
          </>
        )}
      </S.MainContent>
      {!isSearching && (
        <S.CoupangDiv>
          <S.CoupangP>
            여기까지 오셨는데도 마음에 드는 상품을 찾지 못하셨나요??
          </S.CoupangP>
          <iframe src="https://coupa.ng/cllzae" width="100%" height="44" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url" title="추천 상품 더 보기"></iframe>
        </S.CoupangDiv>
      )}

      <Footer />

      {showScrollButton && (
        <S.ScrollToTopButton onClick={scrollToTop} $isVisible={showScrollButton}>
          ↑
        </S.ScrollToTopButton>
      )}
    </S.Container>
  );
}

export default Home;
