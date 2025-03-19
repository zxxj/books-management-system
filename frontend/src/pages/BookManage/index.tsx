import { Button, Card, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { list } from '../../api/book';

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export const BookMange = () => {
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookList, setBookList] = useState<Array<Book>>([]);

  const listBook = async () => {
    try {
      const res = await list();
      setBookList(res.data);
    } catch (error) {
      console.log('图书列表获取失败!');
    }
  };

  const renderBookCard = (book: Book) => {
    return (
      <div
        className="w-64 h-96 border border-black rounded-lg overflow-hidden cursor-pointer mb-7"
        key={book.id}
      >
        <div className=" bg-amber-400 h-60 rounded-b-lg">{book.cover}</div>
        <div className="flex flex-col ">
          <div className=" text-center text-lg font-bold">{book.name}</div>
          <div className=" text-end mr-5">{book.author}</div>
          <div className="mx-2.5 w-56 h-12 text line-clamp-2">
            {book.description}
          </div>
          <div className="mx-2.5 flex justify-between">
            <Button
              color="default"
              variant="solid"
              onClick={() => handleClick('info', book)}
            >
              详情
            </Button>
            <Button
              color="default"
              variant="solid"
              onClick={() => handleClick('edit', book)}
            >
              修改
            </Button>
            <Button color="default" variant="solid" onClick={handleDelete}>
              删除
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="mb-5">
        <Card>
          <div className="w-60 flex items-center">
            <div className="w-30">图书名称:</div>
            <Input />
          </div>
        </Card>
      </div>
    );
  };

  // 新增/编辑/修改 => Modal
  const handleClick = (type: string, book: Book) => {
    if (type === 'info') {
      console.log(book);
      setModalTitle('图书详情');
    } else {
      setModalTitle('修改图书信息');
    }
    setModalOpen(true);
  };

  const handleDelete = () => {
    console.log('de');
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    listBook();
  }, []);

  return (
    <div className="flex justify-center h-screen w-screen overflow-hidden bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-11/12 mt-10 mb-10 h-auto">
        <Card className="w-full h-full">
          {renderSearch()}

          <div
            className="flex flex-wrap overflow-y-auto justify-between"
            style={{ height: '700px' }}
          >
            {bookList.map((item) => renderBookCard(item))}
            <div className="w-64 h-0"></div>
            <div className="w-64 h-0"></div>
            <div className="w-64 h-0"></div>
            <div className="w-64 h-0"></div>
            <div className="w-64 h-0"></div>
            <div className="w-64 h-0"></div>
          </div>
        </Card>
      </div>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};
