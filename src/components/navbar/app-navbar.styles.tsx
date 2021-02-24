import styled from 'styled-components';
import Link from 'next/link';

export const Nav = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 70px;
  justify-content: space-between;
  padding: 10px 2em;
  background: #E23636;
`;

export const NavLogo = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 20px;
  gap: 1em;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-3px);
      transition: all 0.3s ease-in-out;
    }
  }
`;

export const StyledLink = styled(Link)``;

export const NavAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background: #b4b4b4;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
`;
