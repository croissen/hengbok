import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import * as S from './Header.styles';

function Header({ categories }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPCCategoryDropdownOpen, setIsPCCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const pcCategoryWrapperRef = useRef(null);
  const navigate = useNavigate(); // navigate 훅 사용

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
    setIsMobileCategoryDropdownOpen(false);
  };

  const togglePCCategoryDropdown = useCallback(() => {
    setIsPCCategoryDropdownOpen(prev => !prev);
  }, []);

  const toggleMobileCategoryDropdown = useCallback((e) => {
    e.preventDefault();
    setIsMobileCategoryDropdownOpen(prev => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (window.innerWidth <= 768) {
      if (isNavOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsNavOpen(false);
        setIsMobileCategoryDropdownOpen(false);
      }
    } else {
      if (isPCCategoryDropdownOpen && pcCategoryWrapperRef.current && !pcCategoryWrapperRef.current.contains(event.target)) {
        setIsPCCategoryDropdownOpen(false);
      }
    }
  }, [isNavOpen, isPCCategoryDropdownOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // 로고 클릭 시 루트 URL로 명확하게 이동하는 함수
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <S.HeaderContainer $isNavOpen={isNavOpen} ref={headerRef}>
      <S.TopHeaderRow>
        <S.Logo
          as={Link}
          to="/" // Link 자체는 '/'로 설정하되,
          onClick={handleLogoClick} // onClick으로 명시적 이동 함수 호출
        >
          행복스토어
        </S.Logo>

        <S.PCNav>
          <S.PCCategoryWrapper ref={pcCategoryWrapperRef}>
            <S.NavLink
              as="div"
              onClick={togglePCCategoryDropdown}
              role="button"
              tabIndex="0"
            >
              카테고리 <S.DropdownArrow $isOpen={isPCCategoryDropdownOpen} />
            </S.NavLink>
            {isPCCategoryDropdownOpen && (
              <S.PCategoryDropdownMenu>
                {categories.map((category) => (
                  <S.PCCategoryDropdownLink
                    key={category.name}
                    as={Link}
                    to={category.href}
                    onClick={() => setIsPCCategoryDropdownOpen(false)}
                  >
                    {category.name}
                  </S.PCCategoryDropdownLink>
                ))}
              </S.PCategoryDropdownMenu>
            )}
          </S.PCCategoryWrapper>
          <S.NavLink href="https://specmaru.com/" target="_blank" rel="noopener noreferrer">스펙비교</S.NavLink>
        </S.PCNav>

        <S.HamburgerIcon onClick={toggleNav}>☰</S.HamburgerIcon>
      </S.TopHeaderRow>

      <S.MobileExpandedNav $isNavOpen={isNavOpen}>
        <S.MobileCategoryWrapper>
          <S.NavLink as="div" onClick={toggleMobileCategoryDropdown} role="button" tabIndex="0">
            카테고리 <S.DropdownArrow $isOpen={isMobileCategoryDropdownOpen} />
          </S.NavLink>
          <S.DropdownMenu $isOpen={isMobileCategoryDropdownOpen}>
            {categories.map((category) => (
              <S.DropdownLink
                key={category.name}
                as={Link}
                to={category.href}
                onClick={() => {
                  setIsMobileCategoryDropdownOpen(false);
                  setIsNavOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth'})
                }}
              >
                {category.name}
              </S.DropdownLink>
            ))}
          </S.DropdownMenu>
        </S.MobileCategoryWrapper>
        <S.NavLink href="https://specmaru.com/" target="_blank" rel="noopener noreferrer">스펙비교</S.NavLink>
      </S.MobileExpandedNav>
    </S.HeaderContainer>
  );
}

export default Header;