import { Comic, ComicFilters, ComicService, httpClient } from 'api';
import { DEFAULT_FILTERS, Filters } from 'components/filters';
import { LoadingIndicator } from 'components/loading-indicator';
import React, { useEffect, useState } from 'react';
import { MdSearch, MdSend } from 'react-icons/md';
import { FlexColumn, FlexRow, GhostBtn } from 'styles/utils';
import {
  ComicCardImage,
  ComicGrid,
  ComicCard,
  ComidCardInfo,
} from './comic-list.styles';
import { Drawer, useDrawer } from 'components/drawer-component';
import { ComicModal } from 'components/comic-modal';

export const ComicList = () => {
  const comicService: ComicService = new ComicService(httpClient);
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedComics, setSelectedComics] = useState<Comic[]>([]);
  const [drawerOpen, toggleDrawer] = useDrawer();
  const [selectedComic, setSelectedComic] = useState<Comic>(null);
  const [showModal, setShowModal] = useState(false);

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

  const onSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    comic: Comic
  ) => {
    const target = event.target;
    const value = target.checked;

    if (value) {
      setSelectedComics((prev) => {
        return [...prev, comic];
      });
    } else {
      setSelectedComics((prev) => {
        return prev.filter((com) => com.id !== comic.id);
      });
    }
  };

  const openModal = (comic: Comic) => {
    setSelectedComic(comic);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComic(null);
  };

  return (
    <FlexColumn>
      <FlexColumn>
        <FlexRow gap="1em" aligment="center">
          <h1>Comics</h1>
          <GhostBtn onClick={toggleFilters}>
            <MdSearch size={20} />
          </GhostBtn>
          <GhostBtn onClick={toggleDrawer}>
            <MdSend size={20} />
          </GhostBtn>
        </FlexRow>
        {showFilters && <Filters onFilter={loadComics} />}
      </FlexColumn>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <ComicGrid>
          {comics.map((comic) => (
            <ComicCard key={comic.id}>
              <ComicCardImage onClick={() => openModal(comic)}>
                <img
                  src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                  alt="image"
                />
              </ComicCardImage>
              <ComidCardInfo>
                <label htmlFor={String(comic.id)} className="select">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={String(comic.id)}
                    onChange={(e) => onSelect(e, comic)}
                  />
                  Selecionar
                </label>
                <span>{comic.title}</span>
                <span>#{comic.issueNumber}</span>
              </ComidCardInfo>
            </ComicCard>
          ))}
        </ComicGrid>
      )}

      <Drawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={'Send email'}
      >
        <ComicGrid>
          {selectedComics.map((comic) => (
            <ComicCard key={comic.id}>
              <ComicCardImage>
                <img
                  src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                  alt="image"
                />
              </ComicCardImage>
              <ComidCardInfo>
                <label htmlFor={String(comic.id)} className="select">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={String(comic.id)}
                    onChange={(e) => onSelect(e, comic)}
                  />
                  Selecionar
                </label>
                <span>{comic.title}</span>
                <span>#{comic.issueNumber}</span>
              </ComidCardInfo>
            </ComicCard>
          ))}
        </ComicGrid>
      </Drawer>

      {selectedComic && (
        <ComicModal data={selectedComic} open={showModal} close={closeModal} />
      )}
    </FlexColumn>
  );
};
