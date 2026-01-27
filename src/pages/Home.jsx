import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Home.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import productsData from '../assets/data/products.json';
import bannersData from '../assets/data/banners.json';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);

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
    const bannerInterval = setInterval(() => {
      setVideoOpacity(0);
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannersData.length);
      }, 300);
    }, 6000);
    return () => clearInterval(bannerInterval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
          console.error("비디오 재생 오류:", error);
        }
      });
    }
  }, [currentBannerIndex]);

  const handleVideoLoaded = () => {
    setVideoOpacity(1);
    setTextOpacity(1);
  };

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
      if (aHasParen && !bHasParen) return -1;
      if (!aHasParen && bHasParen) return 1;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularProductIds = [1, 918, 919, 917, 916, 913, 912, 10, 307, 306];
  const popularProducts = popularProductIds.map(id => productsData.find(product => product.id === id)).filter(Boolean);

  const mainCategories = [
    { name: "설날선물", href: `/category/${encodeURIComponent("설날선물")}` },
    { name: "식품", href: `/category/${encodeURIComponent("식품")}` },
    { name: "뷰티", href: `/category/${encodeURIComponent("뷰티")}` },
    { name: "여성패션", href: `/category/${encodeURIComponent("여성패션")}` },
    { name: "남성패션", href: `/category/${encodeURIComponent("남성패션")}` },
    { name: "가전/디지털", href: `/category/${encodeURIComponent("가전/디지털")}` },
    { name: "건강식품", href: `/category/${encodeURIComponent("건강식품")}` },
    { name: "명품", href: `/category/${encodeURIComponent("명품")}` },
  ];

  const disclaimerMessage = "페이지 내 링크로 구매하면 쿠팡으로부터 일정액의 수수료를 제공 받아 채널 운영에 도움이 됩니다.    ";
  const currentBanner = bannersData[currentBannerIndex];

  return (
    <S.Container>
      <Header categories={mainCategories} />

      <S.MainContent>
        {!isSearching && (
          <>
            <S.HeroSection as="a" href={currentBanner.link} target="_blank" rel="noopener noreferrer">
              <S.BackgroundVideo
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                $opacity={videoOpacity}
                onLoadedData={handleVideoLoaded}
              >
                <source src={currentBanner.videoSrc} type="video/mp4" />
              </S.BackgroundVideo>
              <S.HeroContent style={{ opacity: textOpacity, transition: 'opacity 0.5s ease-in-out' }}>
                <h1>{currentBanner.title}</h1>
                <p>{currentBanner.subTitle}</p>
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
              if (productsInMainCategory.length === 0) return null;

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
