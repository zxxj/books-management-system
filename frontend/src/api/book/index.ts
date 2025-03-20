import { apiInstance } from '..';

interface BookDto {
  id?: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export const list = (name?: string) => {
  return apiInstance.get('/book/list', {
    params: {
      name,
    },
  });
};

export const create = (createBookDto: BookDto) => {
  return apiInstance.post('/book/create', {
    name: createBookDto.name,
    author: createBookDto.author,
    description: createBookDto.description,
    cover: createBookDto.cover,
  });
};

export const listById = (id: number) => {
  return apiInstance.get(`/book/${id}`);
};

export const update = (bookObj: BookDto) => {
  return apiInstance.put(`/book/update`, {
    id: bookObj.id,
    name: bookObj.name,
    author: bookObj.author,
    description: bookObj.description,
    cover: bookObj.cover,
  });
};
