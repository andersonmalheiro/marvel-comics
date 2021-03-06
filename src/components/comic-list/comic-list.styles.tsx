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

export const ComicCard = styled.li`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px 40px 8px 8px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const ComicCardImage = styled.div`
  cursor: pointer;
  img {
    border-radius: 8px 40px 8px 40px;
    height: auto;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
`;

export const ComidCardInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;

  .select {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;

    input {
      margin: 0;
      margin-right: 5px;
      padding: 0;
      height: 15px;
      width: 15px;
    }
  }
`;
