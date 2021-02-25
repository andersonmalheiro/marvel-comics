import { Comic } from 'api/services/models';
import { FlexColumn } from 'styles/utils';
import React from 'react';
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
  const moneyFormatter = Intl.NumberFormat('pt-br');

  return (
    <StyledPopup open={open} onClose={close} closeOnDocumentClick>
      <Avatar
        src={`${data.thumbnail.path}/portrait_incredible.${data.thumbnail.extension}`}
      />
      <CloseButton onClick={close}>x</CloseButton>
      <Grid>
        <FlexColumn padding="95px 1em 1em 1em" width="100%">
          <InfoRow>
            <strong>Title:</strong>
            <span>{data.title || '---'}</span>
          </InfoRow>
          <InfoRow>
            <strong>Issue number:</strong>
            <span>{data.issueNumber || '---'}</span>
          </InfoRow>
          <InfoRow>
            <strong>Last modified:</strong>
            <span>
              {data.modified
                ? dateFormatter.format(new Date(data.modified))
                : '---'}
            </span>
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
        <FlexColumn padding="95px 1em 1em 1em" width="100%">
          <InfoRow>
            <strong>Creators:</strong>
            <div>
              {data.creators.items.map((creator, index) => (
                <span>{creator.name + ', '}</span>
              ))}
            </div>
          </InfoRow>
        </FlexColumn>
      </Grid>
    </StyledPopup>
  );
};
