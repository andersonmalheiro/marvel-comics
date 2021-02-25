import { Comic, ComicFilters, ComicService, httpClient } from 'api';
import { DEFAULT_FILTERS, Filters } from 'components/filters';
import { LoadingIndicator } from 'components/loading-indicator';
import React, { useEffect, useState } from 'react';
import { FlexColumn } from 'styles/utils';
import { ComicImage, ComicGrid } from './comic-list.styles';

export const ComicList = () => {
  const comicService: ComicService = new ComicService(httpClient);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComics = async (filters: ComicFilters) => {
    setLoading(true);
    const res = await comicService.list(filters);
    try {
      setLoading(false);
      if (res && res.results) {
        setComics(res.results);
      }
    } catch (error) {
      setLoading(false);
      setComics([]);
    }
  };

  useEffect(() => {
    loadComics(DEFAULT_FILTERS);
  }, []);

  return (
    <FlexColumn>
      <FlexColumn padding="0 10px">
        <h1>Comics</h1>
        <Filters onFilter={loadComics} />
      </FlexColumn>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <ComicGrid>
          {comics.map((comic, index) => (
            <ComicImage key={index}>
              <img
                src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                alt="image"
              />
            </ComicImage>
          ))}
        </ComicGrid>
      )}
    </FlexColumn>
  );
};
