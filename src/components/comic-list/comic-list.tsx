import { Comic, ComicFilters, ComicService, httpClient } from 'api';
import { DEFAULT_FILTERS, Filters } from 'components/filters';
import { LoadingIndicator } from 'components/loading-indicator';
import React, { useEffect, useState } from 'react';
import { MdSearch, MdSync } from 'react-icons/md';
import { FlexColumn, FlexRow } from 'styles/utils';
import {
  ComicCardImage,
  ComicGrid,
  ComicCard,
  ComidCardInfo,
  FilterButton,
} from './comic-list.styles';

export const ComicList = () => {
  const comicService: ComicService = new ComicService(httpClient);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    loadComics(DEFAULT_FILTERS);
  }, []);

  return (
    <FlexColumn>
      <FlexColumn>
        <FlexRow gap="1em" aligment="center">
          <h1>Comics</h1>
          <FilterButton onClick={toggleFilters}>
            <MdSearch size={30} />
          </FilterButton>
        </FlexRow>
        {showFilters && <Filters onFilter={loadComics} />}
      </FlexColumn>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <ComicGrid>
          {comics.map((comic, index) => (
            <ComicCard>
              <ComicCardImage key={index}>
                <img
                  src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                  alt="image"
                />
              </ComicCardImage>
              <ComidCardInfo>
                <span>{comic.title}</span>
                <span>#{comic.issueNumber}</span>
                <input type="checkbox" />
              </ComidCardInfo>
            </ComicCard>
          ))}
        </ComicGrid>
      )}
    </FlexColumn>
  );
};
