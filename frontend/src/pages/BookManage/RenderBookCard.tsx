import { Button } from 'antd';
import { IBook } from './types';
import { UpdateBookModal } from './UpdateBookModal';
import { useState } from 'react';

export const RenderBookCard = ({
  book,
  setRandom,
}: {
  book: IBook;
  setRandom: (random: number) => void;
}) => {
  const url = `http://localhost:3000/`;
  const [bookId, setBookId] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = async (type: string, bookId: number) => {
    setBookId(bookId);
    setVisible(true);
    if (type === 'detail') {
    } else if (type === 'update') {
      console.log(bookId);
    }
  };

  const handleDelete = () => {
    console.log('de');
  };

  // 关闭Modal
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div
      className="overflow-hidden border border-black rounded-lg cursor-pointer w-72 h-96 mb-7"
      key={book.id}
    >
      <div className="rounded-b-lg bg-amber-400 h-60">
        <img
          className="w-full h-full bg-center bg-cover "
          src={`${url}${book.cover}`}
        />
      </div>
      <div className="flex flex-col ">
        <div className="text-lg font-bold text-center ">{book.name}</div>
        <div className="mr-5 text-end">{book.author}</div>
        <div className="mx-2.5 w-56 h-12 text line-clamp-2">
          {book.description}
        </div>

        <div className="mx-2.5 flex justify-between">
          <Button
            color="default"
            variant="solid"
            onClick={() => handleClick('detail', book.id)}
          >
            详情
          </Button>
          <Button
            color="default"
            variant="solid"
            onClick={() => handleClick('update', book.id)}
          >
            修改
          </Button>
          <Button color="default" variant="solid" onClick={handleDelete}>
            删除
          </Button>
        </div>
      </div>

      {UpdateBookModal({
        visible: visible,
        handleClose: () => handleClose(),
        bookId: bookId,
        setRandom: setRandom,
      })}
    </div>
  );
};
