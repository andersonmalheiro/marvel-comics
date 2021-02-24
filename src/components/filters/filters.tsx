import { Button, FlexColumn, FlexRow } from 'styles/utils';
import React, { useState } from 'react';
import { Container, Input, Label } from './filters.styles';
import { ComicFilters } from 'api';

interface FilterProps {
  onFilter: (...args: any[]) => void;
}

export const DEFAULT_FILTERS: ComicFilters = {
  title: '',
  issueNumber: '',
  limit: 30,
  orderBy: 'title',
};

export const Filters = (props: FilterProps) => {
  const { onFilter } = props;
  const [filters, setFilters] = useState<ComicFilters>(DEFAULT_FILTERS);

  const handleFilterChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;

    setFilters((prevState: ComicFilters) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const clear = () => {
    setFilters(DEFAULT_FILTERS);
    onFilter(DEFAULT_FILTERS);
  };

  return (
    <FlexColumn>
      <Container>
        <FlexColumn>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            data-testid="title"
            value={filters?.title}
            placeholder="Search by title..."
            onChange={handleFilterChange}
          />
        </FlexColumn>
        <FlexColumn>
          <Label htmlFor="issueNumber">Issue</Label>
          <Input
            type="number"
            min={0}
            name="issueNumber"
            id="issueNumber"
            data-testid="issueNumber"
            value={filters?.issueNumber}
            placeholder="Search by issue number..."
            onChange={handleFilterChange}
          />
        </FlexColumn>
      </Container>
      <FlexRow aligment="center" justify="center" padding="1em" gap="1em">
        <Button
          onClick={clear}
          styling="default"
          id="clear"
          data-testid="clear"
        >
          Clear
        </Button>
        <Button
          onClick={() => onFilter(filters)}
          styling="danger"
          data-testid="submit"
          id="submit"
        >
          Filter
        </Button>
      </FlexRow>
    </FlexColumn>
  );
};
