import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Header.styles';

function Header({ categories }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPCCategoryDropdownOpen, setIsPCCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const pcCategoryWrapperRef = useRef(null);
  
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

  return (
    <S.HeaderContainer $isNavOpen={isNavOpen} ref={headerRef}>
      <S.TopHeaderRow>
        <S.Logo as={Link} to="/">행복스토어</S.Logo>

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
