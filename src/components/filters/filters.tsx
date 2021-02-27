import { Button, FlexColumn, FlexRow } from 'styles/utils';
import React, { FormEvent, useState } from 'react';
import { Input, Select } from '../inputs';
import { ComicFilters } from 'api';
import { FieldGrid } from './filters.styles';
import { Form } from 'components/form';
import { useForm } from 'hooks/useForm';

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

  const clear = () => {
    setValues(DEFAULT_FILTERS);
    onFilter(DEFAULT_FILTERS);
  };

  const onSubmit = () => {
    onFilter(values);
  };

  const { handleChange, handleSubmit, values, setValues } = useForm(onSubmit);

  return (
    <FlexColumn margin="0 0 1em 0">
      <Form onSubmit={handleSubmit}>
        <FieldGrid>
          <Input
            label={'Name'}
            type={'text'}
            name="title"
            id="title"
            data-testid="title"
            value={values?.title || ''}
            placeholder="Search by title..."
            onChange={handleChange}
          />
          <Input
            label={'Issue number'}
            type="number"
            min={0}
            name="issueNumber"
            id="issueNumber"
            data-testid="issueNumber"
            value={values?.issueNumber || ''}
            placeholder="Search by issue number..."
            onChange={handleChange}
          />

          <Select
            label={'Format'}
            name="format"
            id="format"
            data-testid="format"
            value={values?.format || ''}
            placeholder="Select a format..."
            onChange={handleChange}
            options={formats}
            labelKey={'name'}
            valueKey={'value'}
          />
        </FieldGrid>

        <FlexRow aligment="center" justify="center" padding="1em" gap="1em">
          <Button
            onClick={clear}
            styling="default"
            id="clear"
            data-testid="clear"
            type="button"
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
