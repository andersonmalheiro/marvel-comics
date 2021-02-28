import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, shallow } from 'enzyme';
import { ComicList } from '../components/comic-list';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('Comic list', () => {
  it('should render correctly', () => {
    shallow(<ComicList data={[]} showSelect={false} />);
  });

  it('should show an empty indicator when passed an empty array as data', () => {
    const { getByText } = render(<ComicList data={[]} showSelect={false} />);
    expect(getByText('No data...')).toBeInTheDocument();
  });

  it('should call onClick', () => {
    const data: any[] = [
      {
        id: 'test123',
        digitalId: 0,
        title: ' Fantastic Four by Dan Slott Vol. 1 (Hardcover)',
        issueNumber: 0,
        variantDescription: '',
        description: null,
        modified: '2021-02-22T16:40:08-0500',
        isbn: '978-1-302-92827-8',
        pageCount: 368,
        resourceURI: 'http://gateway.marvel.com/v1/public/comics/91992',
        dates: [
          {
            type: 'onsaleDate',
            date: '2021-03-10T00:00:00-0500',
          },
          {
            type: 'focDate',
            date: '2020-10-05T00:00:00-0400',
          },
        ],
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/70/6033d20f666c9',
          extension: 'jpg',
        },
        creators: {
          available: 1,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/91992/creators',
          items: [
            {
              resourceURI: 'http://gateway.marvel.com/v1/public/creators/4430',
              name: 'Jeff Youngquist',
              role: 'editor',
            },
          ],
          returned: 1,
        },
        characters: {
          available: 0,
          collectionURI:
            'http://gateway.marvel.com/v1/public/comics/91992/characters',
          items: [],
          returned: 0,
        },
      },
    ];

    const onClick = jest.fn((data) => {
      return data;
    });

    const wrapper = shallow(
      <ComicList data={data} showSelect={false} onClickComic={onClick} />
    );

    const comicCard = wrapper.find('#test123').at(0);
    comicCard.simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });
});
