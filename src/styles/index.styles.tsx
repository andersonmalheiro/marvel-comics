import styled from 'styled-components';

export const StyledMain = styled.div`
  height: calc(100vh - 70px);
  overflow: hidden;
  overflow-y: auto;
  padding: 2em;
`;

export const ComicGrid = styled.ul`
  display: grid;
  padding: 0;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: auto;
  /* gap: 1em; */
  transition: all 0.3s ease-in-out;

  @media (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const ComicImage = styled.li`
  max-height: 324px;
  max-width: 216px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  padding: 10px;
  cursor: pointer;

  img {
    height: auto;
    width: 100%;
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }
  }
`;
