import Head from 'next/head';
import { ComicGrid, StyledMain, ComicImage } from 'styles/index.styles';
import { AppNavbar } from 'components';
import { ComicService, httpClient } from 'api';
import { useEffect, useState } from 'react';
import { Comic, ComicFilters } from 'api/services/models';
import { FlexColumn } from 'styles/utils';
import { Filters, DEFAULT_FILTERS } from 'components/filters';

export default function Home() {
  const comicService: ComicService = new ComicService(httpClient);
  const [comics, setComics] = useState<Comic[]>([]);

  const loadComics = async (filters: ComicFilters) => {
    const res = await comicService.list(filters);
    try {
      if (res && res.results) {
        setComics(res.results);
      }
    } catch (error) {
      setComics([]);
    }
  };

  useEffect(() => {
    loadComics(DEFAULT_FILTERS);
  }, []);

  return (
    <div>
      <Head>
        <title>Marvel Comics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppNavbar />

      <StyledMain>
        <FlexColumn padding="0 10px">
          <h1>Comics</h1>
          <Filters onFilter={loadComics} />
        </FlexColumn>

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
      </StyledMain>
    </div>
  );
}
