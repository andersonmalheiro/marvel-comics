import React, { useEffect, useRef } from 'react';
import { Comic } from 'api';
import {
  ComicCard,
  ComicCardImage,
  ComicGrid,
  ComidCardInfo,
} from './comic-list.styles';
import { EmptyIndicator } from 'components/empty-indicator';

interface ComicListProps {
  data: Comic[];
  onClickComic?: (...args: any[]) => void;
  onSelectComic?: (...args: any[]) => void;
  onScroll?: (...args: any[]) => void;
  showSelect: boolean;
  emptyMessage?: string;
}

export const ComicList = (props: ComicListProps) => {
  const {
    data,
    emptyMessage,
    onClickComic,
    onSelectComic,
    onScroll,
    showSelect,
  } = props;
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref.current && onScroll) {
      ref.current.addEventListener('scroll', (e) => onScroll(e));
    }
  }, []);

  return (
    <React.Fragment>
      {data && data.length ? (
        <ComicGrid ref={ref}>
          {data &&
            data.map((comic) => (
              <ComicCard key={comic.id}>
                <ComicCardImage
                  onClick={() => onClickComic(comic)}
                  id={String(comic.id)}
                >
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
                        checked={comic?.selected || false}
                        onChange={(e) => onSelectComic(e, comic)}
                      />
                      <span>Selecionar</span>
                    </label>
                  )}
                  <span>{comic.title}</span>
                  <span>#{comic.issueNumber}</span>
                </ComidCardInfo>
              </ComicCard>
            ))}
        </ComicGrid>
      ) : (
        <EmptyIndicator message={emptyMessage} />
      )}
    </React.Fragment>
  );
};
