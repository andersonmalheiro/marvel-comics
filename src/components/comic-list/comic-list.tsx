import React, { useEffect, useRef } from 'react';
import { Comic } from 'api';
import {
  ComicCard,
  ComicCardImage,
  ComicGrid,
  ComidCardInfo,
} from './comic-list.styles';

interface ComicListProps {
  data: Comic[];
  onClickComic?: (...args: any[]) => void;
  onSelectComic?: (...args: any[]) => void;
  onScroll?: (...args: any[]) => void;
  showSelect: boolean;
}

export const ComicList = (props: ComicListProps) => {
  const { data, onClickComic, onSelectComic, onScroll, showSelect } = props;
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref.current && onScroll) {
      ref.current.addEventListener('scroll', (e) => onScroll(e));
    }
  }, []);

  return (
    <ComicGrid ref={ref}>
      {data &&
        data.map((comic) => (
          <ComicCard key={comic.id}>
            <ComicCardImage onClick={() => onClickComic(comic)}>
              <img
                src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                alt="image"
              />
            </ComicCardImage>
            <ComidCardInfo>
              {showSelect && (
                <label htmlFor={String(comic.id)} className="select">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={String(comic.id)}
                    onChange={(e) => onSelectComic(e, comic)}
                  />
                  Selecionar
                </label>
              )}
              <span>{comic.title}</span>
              <span>#{comic.issueNumber}</span>
            </ComidCardInfo>
          </ComicCard>
        ))}
    </ComicGrid>
  );
};
