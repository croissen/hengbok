import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
  }
`;

export const HeroSection = styled.section`
  position: relative; 
  width: 100%;
  height: 400px; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  overflow: hidden; 

  @media (max-width: 768px) {
    height: 300px; 
    margin-bottom: 30px;
  }
`;
export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  border-radius: 8px;

  h1 {
    font-size: 48px;
    margin-bottom: 15px;
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;

export const ProductCat = styled.h2`
  display: flex;
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 25px;
    padding: 0 20px;
  }
`

export const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 20px;
  }
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

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

export const ProductName = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ff6f61;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  gap: 10px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  width: 60%;
  max-width: 500px;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff6f61;
  }

  @media (max-width: 768px) {
    width: 80%;
    max-width: none;
    font-size: 14px;
    padding: 10px 12px;
  }
`;

export const SearchButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    width: 20%;
    font-size: 14px;
    padding: 10px 12px;
  }
`;

export const DisclaimerText = styled.p`
  font-size: 13px;
  color: #888;
  text-align: center;
  margin-top: -30px; /* HeroSection margin-bottom과 겹치게 위로 살짝 올림 */
  margin-bottom: 50px; /* 검색 섹션과 간격 유지 */
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: -20px;
    margin-bottom: 30px;
    padding: 0 15px;
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 50px 0;
`;