import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: padding-bottom 0.3s ease-in-out;
`;

export const TopHeaderRow = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

export const Logo = styled.a`
  font-size: 28px;
  font-weight: bold;
  color: #ff6f61;
  text-decoration: none;
  flex-shrink: 0;
`;

export const PCNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileExpandedNav = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  overflow: hidden;
  max-height: ${({ $isNavOpen }) => ($isNavOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  font-size: 18px;
  color: #333;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.2s ease;
  white-space: nowrap;
  line-height: 1.2;
  vertical-align: middle;
  display: inline-block;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    color: #ff6f61;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    text-align: left;
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 30px;
    cursor: pointer;
    z-index: 1002;
    position: relative;
    right: 0;
    top: 0;
    padding: 0 15px;
  }
`;

export const PCCategoryWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;

  ${NavLink} {
    padding: 0;
    height: auto;
  }
`;

export const PCategoryDropdownMenu = styled.div`
  position: absolute;
  top: 170%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 1001;
  overflow: hidden;
  margin-top: 10px;
`;

export const PCCategoryDropdownLink = styled.a`
  display: block;
  padding: 10px 15px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #ff6f61;
  }
`;

export const MobileCategoryWrapper = styled.div`
  width: 100%;
  
  ${NavLink} {
    padding-right: 0;
    display: flex;
    align-items: center;
    line-height: normal;
    justify-content: space-between;
    width: 100%;
  }
`;

export const DropdownArrow = styled.span`
  margin-left: 5px;
  display: inline-block;
  border: solid #333;
  border-width: 0 2px 2px 0;
  padding: 3px;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  transition: transform 0.3s ease-in-out;
  margin-bottom: 2px;
`;

export const DropdownMenu = styled.div`
  position: static;
  box-shadow: none;
  border: none;
  background-color: #f9f9f9;
  min-width: auto;
  width: 100%;
  border-top: 1px solid #eee;
  padding: 0 20px;
  margin-top: 0;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  transition: max-height 0.3s ease-in-out;
`;

export const DropdownLink = styled.a`
  display: block;
  padding: 10px 0;
  font-size: 15px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;
  line-height: 1.2;
  border-bottom: 1px dashed #eee;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
    color: #ff6f61;
  }
`;