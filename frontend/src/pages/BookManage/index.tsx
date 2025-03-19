import { Button, Card, Input, Modal, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { create, list, listById } from '../../api/book';

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

interface QueryParams {
  name: string;
}

export const BookMange = () => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [queryParams, setQueryParams] = useState<string>('');
  const [modalForm] = Form.useForm();

  const listBook = async () => {
    try {
      const res = await list(queryParams);
      setBookList(res.data);
    } catch (error) {
      console.log('图书列表获取失败!');
    }
  };

  const renderBookCard = (book: Book) => {
    return (
      <div
        className="overflow-hidden border border-black rounded-lg cursor-pointer w-72 h-96 mb-7"
        key={book.id}
      >
        <div className="rounded-b-lg bg-amber-400 h-60">
          <img
            className="w-full h-full bg-center bg-cover "
            src={`http://localhost:3000/${book.cover}`}
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
          <Form layout="inline" onFinish={searchFormFinish}>
            <Form.Item name="name" label="图书名称">
              <Input style={{ width: '200px' }} />
            </Form.Item>

            <Form.Item>
              <Button
                className="mr-4"
                color="default"
                variant="solid"
                htmlType="submit"
              >
                查询图书
              </Button>
              <Button
                color="default"
                variant="solid"
                onClick={() => handleClick('add')}
              >
                添加图书
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  const searchFormFinish = async (values: QueryParams) => {
    setQueryParams(values.name);
  };

  // 新增/编辑/修改 => Modal
  const handleClick = async (type: string, book?: Book) => {
    if (type === 'info') {
      console.log(book);
      setModalTitle('图书详情');
    } else if (type === 'edit') {
      const res = await listById(book?.id as number);
      modalForm.setFieldsValue(res.data);
      setModalTitle('修改图书信息');
    } else if (type === 'add') {
      setModalTitle('添加图书');
    }
    setModalOpen(true);
  };

  const handleDelete = () => {
    console.log('de');
  };

  const handleOk = async () => {
    const values = await modalForm.validateFields();
    values.cover = values.cover.file.response;

    try {
      await create(values);
      message.success('图书添加成功!');
      setModalOpen(false);
      setQueryParams('');
    } catch (error) {
      message.error('图书添加失败!');
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    listBook();
  }, [queryParams]);

  return (
    <div className="flex justify-center h-screen w-screen overflow-hidden bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-11/12 h-auto mt-10 mb-10">
        <Card className="w-full h-full">
          {renderSearch()}

          <div
            className="flex flex-wrap justify-between overflow-y-auto"
            style={{ height: '700px' }}
          >
            {bookList.map((item) => renderBookCard(item))}
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
          </div>
        </Card>
      </div>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 4 }} form={modalForm}>
          <Form.Item name="name" label="图书名称">
            <Input />
          </Form.Item>
          <Form.Item name="author" label="作者">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input />
          </Form.Item>
          <Form.Item name="cover" label="图书封面"></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
