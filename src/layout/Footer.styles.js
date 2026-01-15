import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 25px 20px;
  font-size: 15px;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 20px 15px; /* 모바일에서 패딩 조절 */
    font-size: 13px; /* 모바일에서 글자 크기 줄이기 */
  }
`;