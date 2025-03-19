import { apiInstance } from '..';

interface CreateBookDto {
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

export const create = (createBookDto: CreateBookDto) => {
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
