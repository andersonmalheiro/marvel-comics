import { Comic } from 'api/services/models';
import { FlexColumn } from 'styles/utils';
import React, { useEffect, useState } from 'react';
import {
  StyledPopup,
  Avatar,
  InfoRow,
  CloseButton,
  Grid,
} from './comic-modal.styles';

interface AppModalProps {
  open: boolean;
  close: () => void;
  data: Comic;
}

export const ComicModal = (props: AppModalProps) => {
  const { open, close, data } = props;
  const dateFormatter = Intl.DateTimeFormat('pt-br');
  const [onSaleDate, setOnSaleDate] = useState('');
  const [creators, setCreators] = useState('');
  const [characters, setCharacters] = useState('');

  useEffect(() => {
    const { dates, creators, characters } = data;

    // Formatting date
    const onSale = dates.find((date) => date.type === 'onsaleDate');
    if (onSale) {
      const asDate = new Date(onSale.date);
      if (!isNaN(asDate.getTime())) {
        setOnSaleDate(dateFormatter.format(asDate));
      }
    }

    // Formatting creators
    const creatorsNames = creators.items.map((creator) => creator.name);
    setCreators(creatorsNames.join(', '));

    // Formatting characters
    const characterNames = characters.items.map((char) => char.name);
    setCharacters(characterNames.join(', '));
  }, [data]);

  return (
    <StyledPopup open={open} onClose={close} closeOnDocumentClick>
      <Avatar
        src={`${data.thumbnail.path}/portrait_incredible.${data.thumbnail.extension}`}
      />
      <CloseButton onClick={close}>x</CloseButton>
      <FlexColumn padding="95px 1em 1em 1em" width="100%">
        <InfoRow>
          <strong>Title:</strong>
          <span>{data.title || '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>Characters:</strong>
          <span>{characters || '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>Creators:</strong>
          <span>{creators || '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>Issue number:</strong>
          <span>{data.issueNumber || '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>On sale:</strong>
          <span>{onSaleDate ? onSaleDate : '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>Page count:</strong>
          <span>{data.pageCount || '---'}</span>
        </InfoRow>
        <InfoRow>
          <strong>ISBN:</strong>
          <span>{data.isbn || '---'}</span>
        </InfoRow>
      </FlexColumn>
    </StyledPopup>
  );
};
