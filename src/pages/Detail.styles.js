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
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

export const ProductCat = styled.h2`
  font-size: 32px;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ProductCatDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 0 15px;
  }
`;

export const BackTextButton = styled.button`
  background: none;
  border: none;
  color: #555; 
  font-size: 14px;
  cursor: pointer;
  text-decoration: none; 
  padding: 0;

  &:hover {
    color: #ff6f61; 
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  padding: 0 10px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 0 15px;
    margin-bottom: 30px;
  }
`;

export const ProductCard = styled.a`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  max-height: 300px;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 15px;
    max-height: 250px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: 150px;
  object-fit: contain;
  border-radius: 5px;

  @media (max-width: 768px) {
    height: 120px;
    max-width: 150px;
  }
`;

export const ProductName = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 0;
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;
  padding: 0 5px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 14px;
    height: 34px;
    -webkit-line-clamp: 2;
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 50px 0;
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, visibility 0.3s, background-color 0.3s;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  z-index: 1000;

  &:hover {
    background-color: #e65c50;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
    font-size: 20px;
  }
`;