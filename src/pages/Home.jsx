import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Home.styles';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import productsData from '../assets/data/products.json';

const heroVideos = [
  '/images/배너용.mp4',
  '/images/영상.mp4'
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isBlackFade, setIsBlackFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
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
    if (heroVideos.length <= 1) return;

    const interval = setInterval(() => {
      setIsBlackFade(true);

      setTimeout(() => {
        setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length);
      }, 600);

      setTimeout(() => {
        setIsBlackFade(false);
      }, 1200);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const sortAndPrioritizeResults = (results, query) => {
    const idToPrioritize = parseInt(query, 10);
    const hasParen = product => product?.name?.includes(')');

    let prioritized = null;
    const rest = [];

    for (const product of results) {
      if (!isNaN(idToPrioritize) && product.id === idToPrioritize) {
        prioritized = product;
      } else {
        rest.push(product);
      }
    }

    rest.sort((a, b) => {
      if (hasParen(a) && !hasParen(b)) return -1;
      if (!hasParen(a) && hasParen(b)) return 1;
      return 0;
    });

    return prioritized ? [prioritized, ...rest] : rest;
  };

  const performSearch = query => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const filtered = productsData.filter(product => {
      const name = product.name?.toLowerCase() || '';
      return (
        name.includes(query.toLowerCase()) ||
        product.id?.toString() === query.trim()
      );
    });

    setSearchResults(sortAndPrioritizeResults(filtered, query));
    setIsSearching(true);
  };

  const handleSearchInputChange = e => {
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

  const popularProductIds = [1, 2, 3, 302, 301, 103, 102, 201, 202, 203];
  const popularProducts = popularProductIds
    .map(id => productsData.find(p => p.id === id))
    .filter(Boolean);

  const mainCategories = [
    { name: '여성패션', href: `/category/${encodeURIComponent('여성패션')}` },
    { name: '뷰티', href: `/category/${encodeURIComponent('뷰티')}` },
    { name: '가전/디지털', href: `/category/${encodeURIComponent('가전/디지털')}` },
    { name: '식품', href: `/category/${encodeURIComponent('식품')}` },
  ];

  const disclaimerMessage =
    '하단 링크로 구매하면 쿠팡으로부터 일정액의 수수료를 제공 받아 채널 운영에 도움이 됩니다.';

  return (
    <S.Container>
      <Header categories={mainCategories} />

      <S.MainContent>
        {!isSearching && (
          <>
            <S.HeroSection>
              <S.VideoWrapper>
                <S.BackgroundVideo
                  key={currentVideoIndex}
                  autoPlay
                  muted
                  playsInline
                  loop={heroVideos.length === 1}
                >
                  <source src={heroVideos[currentVideoIndex]} type="video/mp4" />
                </S.BackgroundVideo>
                <S.BlackOverlay $active={isBlackFade} />
              </S.VideoWrapper>

              <S.HeroContent>
                <h1>행복을 담아가세요!</h1>
                <p>오늘의 특별한 할인 상품을 만나보세요.</p>
              </S.HeroContent>
            </S.HeroSection>

            <S.DisclaimerText>
              <span>
                {isMobile
                  ? `${disclaimerMessage} ${disclaimerMessage}`
                  : disclaimerMessage}
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
            onKeyDown={e => e.key === 'Enter' && performSearch(searchTerm)}
          />
          <S.SearchButton onClick={handleResetSearch}>
            초기화
          </S.SearchButton>
        </S.SearchSection>

        {isSearching ? (
          <>
            <S.ProductCatDiv>
              <S.ProductCat>"{searchTerm}" 검색 결과</S.ProductCat>
            </S.ProductCatDiv>

            {searchResults.length > 0 ? (
              <S.ProductGrid $isSearchResults>
                {searchResults.map(product => (
                  <S.ProductCard
                    key={product.id}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    $isSearchResults
                  >
                    <S.ProductImage src={product.image} alt={product.name} />
                    <S.ProductName>
                      {product.id}. {product.name}
                    </S.ProductName>
                  </S.ProductCard>
                ))}
              </S.ProductGrid>
            ) : (
              <S.NoResultsMessage>
                "{searchTerm}"에 대한 검색 결과가 없습니다.
              </S.NoResultsMessage>
            )}
          </>
        ) : (
          <>
            {popularProducts.length > 0 && (
              <>
                <S.ProductCatDiv>
                  <S.ProductCat>인기상품</S.ProductCat>
                </S.ProductCatDiv>
                <S.ProductGrid>
                  {popularProducts.map(product => (
                    <S.ProductCard
                      key={product.id}
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <S.ProductImage src={product.image} alt={product.name} />
                      <S.ProductName>
                        {product.id}. {product.name}
                      </S.ProductName>
                    </S.ProductCard>
                  ))}
                </S.ProductGrid>
              </>
            )}

            {mainCategories.map(category => {
              const items = productsData.filter(
                p => p.category === category.name
              );

              if (!items.length) return null;

              return (
                <React.Fragment key={category.name}>
                  <S.ProductCatDiv>
                    <S.ProductCat>{category.name}</S.ProductCat>
                    <S.MoreLink
                      as={Link}
                      to={category.href}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    >
                      more →
                    </S.MoreLink>
                  </S.ProductCatDiv>

                  <S.ProductGrid>
                    {items.slice(0, 10).map(product => (
                      <S.ProductCard
                        key={product.id}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <S.ProductImage src={product.image} alt={product.name} />
                        <S.ProductName>
                          {product.id}. {product.name}
                        </S.ProductName>
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
          <iframe
            src="https://coupa.ng/cllzae"
            width="100%"
            height="44"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            title="추천 상품 더 보기"
          />
        </S.CoupangDiv>
      )}

      <Footer />

      {showScrollButton && (
        <S.ScrollToTopButton onClick={scrollToTop} $isVisible>
          ↑
        </S.ScrollToTopButton>
      )}
    </S.Container>
  );
}

export default Home;
