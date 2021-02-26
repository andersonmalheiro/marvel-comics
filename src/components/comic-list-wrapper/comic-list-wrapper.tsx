import React, { useEffect, useState } from 'react';
import { Comic, ComicFilters, ComicService, httpClient } from 'api';
import { ComicList } from 'components/comic-list';
import { ComicModal } from 'components/comic-modal';
import { Drawer, useDrawer } from 'components/drawer-component';
import { DEFAULT_FILTERS, Filters } from 'components/filters';
import { LoadingIndicator } from 'components/loading-indicator';
import { MdSearch, MdSend } from 'react-icons/md';
import { FlexColumn, FlexRow, GhostBtn } from 'styles/utils';

export const ComicListWrapper = () => {
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
        <ComicList
          data={comics}
          showSelect={true}
          onClickComic={openModal}
          onSelectComic={onSelect}
        />
      )}

      <Drawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={'Send email'}
      >
        <ComicList data={selectedComics} showSelect={false} />
      </Drawer>

      {selectedComic && (
        <ComicModal data={selectedComic} open={showModal} close={closeModal} />
      )}
    </FlexColumn>
  );
};
