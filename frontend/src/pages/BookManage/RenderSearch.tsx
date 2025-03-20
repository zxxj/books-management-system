import { Button, Card, Form, Input } from 'antd';
import { QueryParams } from './types';
import { CreateBookModal } from './CreateBookModal';
import { useState } from 'react';

export const renderSearch = (
  setQueryParams: (name: string) => void, // 传入图书列表查询参数
  setRandom: (random: number) => void, // 传入随机数,用于确认后刷新图书列表
) => {
  const [visible, setVisible] = useState<boolean>(false); // 控制Modal隐藏/显示

  // 显示Modal
  const handleClick = async () => {
    setVisible(true);
  };

  // 点击查询按钮
  const searchFormFinish = async (values: QueryParams) => {
    setQueryParams(values.name);
  };

  // 关闭Modal
  const handleClose = () => {
    setVisible(false);
    setRandom(Math.random());
  };

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
              onClick={() => handleClick()}
            >
              添加图书
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {CreateBookModal({
        visible: visible,
        handleClose: () => handleClose(),
      })}
    </div>
  );
};
