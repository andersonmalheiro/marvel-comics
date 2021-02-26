import Head from 'next/head';
import React from 'react';
import { AppNavbar } from 'components';
import { StyledMain } from 'styles/index.styles';
import { ComicListWrapper } from 'components/comic-list-wrapper';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Marvel Comics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppNavbar />

      <StyledMain>
        <ComicListWrapper />
      </StyledMain>
    </React.Fragment>
  );
}
