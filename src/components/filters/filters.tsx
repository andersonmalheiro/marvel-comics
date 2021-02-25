import { Button, FlexColumn, FlexRow } from 'styles/utils';
import React, { FormEvent, useState } from 'react';
import {
  FieldGrid,
  FieldSet,
  Form,
  Input,
  Label,
  Select,
} from './filters.styles';
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

const formats = [
  {
    name: 'Comic',
    value: 'comic',
  },
  {
    name: 'Magazine',
    value: 'magazine',
  },
  {
    name: 'Trade paperback',
    value: 'trade paperback',
  },
  {
    name: 'Hardcover',
    value: 'hardcover',
  },
  {
    name: 'Digest',
    value: 'digest',
  },
  {
    name: 'Graphic novel',
    value: 'graphic novel',
  },
  {
    name: 'Digital comic',
    value: 'digital comic',
  },
  {
    name: 'Infinite comic',
    value: 'infinite comic',
  },
];

export const Filters = (props: FilterProps) => {
  const { onFilter } = props;
  const [filters, setFilters] = useState<ComicFilters>();

  const handleChange = (event: { target: any }) => {
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

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFilter(filters);
  };

  return (
    <FlexColumn margin="0 0 1em 0">
      <Form onSubmit={onSubmit}>
        <FieldGrid>
          <FieldSet>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              id="title"
              data-testid="title"
              value={filters?.title || ''}
              placeholder="Search by title..."
              onChange={handleChange}
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="issueNumber">Issue</Label>
            <Input
              type="number"
              min={0}
              name="issueNumber"
              id="issueNumber"
              data-testid="issueNumber"
              value={filters?.issueNumber || ''}
              placeholder="Search by issue number..."
              onChange={handleChange}
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="issueNumber">Issue</Label>
            <Select
              name="format"
              id="format"
              data-testid="format"
              value={filters?.format || ''}
              placeholder="Search by issue number..."
              onChange={handleChange}
            >
              <option value="">Select a format...</option>
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.name}
                </option>
              ))}
            </Select>
          </FieldSet>
        </FieldGrid>
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
            type="submit"
            styling="danger"
            data-testid="submit"
            id="submit"
          >
            Filter
          </Button>
        </FlexRow>
      </Form>
    </FlexColumn>
  );
};
