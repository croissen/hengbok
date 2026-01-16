import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px 20px;
    justify-content: center;
    position: relative;
  }
`;

export const Logo = styled.a`
  font-size: 28px;
  font-weight: bold;
  color: #ff6f61;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 0;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 25px;
  justify-content: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #f9f9f9;
    max-height: ${(props) => (props.isNavOpen ? '300px' : '0')};
    overflow: hidden;
    transition: max-height 0.4s ease-in-out, border 0.4s ease-in-out;
    border-top: ${(props) => (props.isNavOpen ? '1px solid #eee' : 'none')};
    z-index: 10;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 17px;
  transition: color 0.3s ease;
  white-space: nowrap;
  padding: 0;

  &:hover {
    color: #ff6f61;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    border-bottom: 1px solid #eee;
    color: #333;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #eee;
    }
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 28px;
    color: #555;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
  }
`;