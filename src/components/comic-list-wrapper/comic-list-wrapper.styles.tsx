import styled from 'styled-components';

export const ComicGrid = styled.ul`
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-template-rows: auto;
  gap: 1em;
  transition: all 0.3s ease-in-out;

  @media (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;
