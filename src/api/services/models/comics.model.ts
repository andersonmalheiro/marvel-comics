export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: URL[];
  series: Summary;
  variants: Summary[];
  collections: Summary[];
  collectedIssues: Summary[];
  dates: [
    {
      type: string;
      date: string;
    }
  ];
  prices: [
    {
      type: string;
      price: number;
    }
  ];
  thumbnail: Image;
  images: Image[];
  creators: Resource;
  characters: Resource;
  stories: Resource;
  events: Resource;
  selected?: boolean;
}

export interface ComicFilters {
  title?: string;
  titleStartsWith?: string;
  startYear?: string;
  issueNumber?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  format?: string;
}

interface URL {
  type: string;
  url: string;
}

interface TextObject {
  type: string;
  url: string;
}

interface Resource {
  available: number;
  returned: number;
  collectionURI: string;
  items: ResourceItem[];
}

interface ResourceItem {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
}

interface Image {
  path: string;
  extension: string;
}

interface Summary {
  resourceURI: string;
  name: string;
}
