import styled, { keyframes } from 'styled-components';

const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
  background-color:rgb(255, 255, 255);
`;

export const MainContent = styled.main`
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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
  text-decoration: none;
  color: white;
  background-color: black; 

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
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => props.$opacity};
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  border-radius: 8px;
  transition: opacity 0.5s ease-in-out;

  h1 {
    font-size: 48px;
    margin-bottom: 15px;
    text-shadow:
      0 1px 2px rgba(0,0,0,0.9),
      0 2px 4px rgba(0,0,0,0.8),
      0 4px 8px rgba(0,0,0,0.6),
      0 8px 16px rgba(0,0,0,0.4);
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
    text-shadow:
      0 1px 2px rgba(0,0,0,0.9),
      0 2px 4px rgba(0,0,0,0.8),
      0 4px 8px rgba(0,0,0,0.6);
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
  font-size: 32px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ProductCatDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 25px;
    padding: 0 15px;
  }
`;

export const MoreLink = styled.a`
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6f61;
  }
`;

export const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  padding: 0 10px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    ${({ $isSearchResults }) => $isSearchResults ? `
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      overflow-x: visible;
      -webkit-overflow-scrolling: auto;
      scroll-snap-type: none;
    ` : `
      display: flex;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      gap: 15px;
    `}
    padding: 0 15px;
    margin: 0 0 30px 10px;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
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
    overflow: hidden;

    ${({ $isSearchResults }) => $isSearchResults ? `
      flex: none;
      margin-right: 0;
      scroll-snap-align: none;
    ` : `
      width: calc(50% - 15px);
      flex-shrink: 0;
      margin-right: 0;
      scroll-snap-align: start;
    `}
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
  margin-top: 10px;

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
  background-color: #ef4e4e;
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
  margin-top: -30px;
  margin-bottom: 50px;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: -30px;
    margin-bottom: 30px;
    padding: 0 15px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    text-align: left;
    
    & > span {
      display: inline-block;
      white-space: nowrap;
      animation: ${slideLeft} 15s linear infinite;
    }
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
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
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
export const CoupangDiv = styled.div`
  text-align: center;
  margin: 100px 0 400px 0;
  padding: 0 20%;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
export const CoupangP = styled.p`
  color: #555;
  font-size: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;