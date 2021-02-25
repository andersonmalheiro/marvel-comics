import Head from 'next/head';
import React from 'react';
import { AppNavbar } from 'components';
import { StyledMain } from 'styles/index.styles';
import { ComicList } from 'components';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Marvel Comics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppNavbar />

      <StyledMain>
        <ComicList />
      </StyledMain>
    </React.Fragment>
  );
}
