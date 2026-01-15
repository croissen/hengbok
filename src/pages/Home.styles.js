// src/pages/Home.styles.js (또는 src/Home.styles.js)
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
`;

export const Header = styled.header`
  background-color: #fff;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #ff6f61; /* 행복스토어에 어울리는 색상 */
  margin: 0;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 25px;
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 17px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6f61;
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const HeroSection = styled.section`
  background-color: #fce4ec; /* 부드러운 핑크톤 */
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 48px;
    color: #d81b60; /* 강렬한 핑크 */
    margin-bottom: 15px;
  }

  p {
    font-size: 20px;
    color: #ad1457;
    margin-bottom: 30px;
  }
`;

export const ActionButton = styled.button`
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e65c50;
  }
`;

export const ProductGrid = styled.section`
  h2 {
    font-size: 32px;
    color: #333;
    text-align: center;
    margin-bottom: 40px;
  }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

export const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const ProductName = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ff6f61;
`;

export const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 25px 20px;
  font-size: 15px;
  margin-top: auto;
`;