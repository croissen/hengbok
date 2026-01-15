import React, { useState } from 'react';
import * as S from './Header.styles';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Logo href="#">행복스토어</S.Logo>

        <S.Nav isNavOpen={isNavOpen}>
          <S.NavLink href="#">카테고리</S.NavLink>
          <S.NavLink href="#">베스트</S.NavLink>
          <S.NavLink href="#">신상품</S.NavLink>
        </S.Nav>

        <S.HamburgerIcon onClick={toggleNav}>{isNavOpen ? '✕' : '☰'}</S.HamburgerIcon>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

export default Header;