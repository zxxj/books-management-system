import { Form, Input, Modal, message } from 'antd';
import { IBook, IUpdateModalProps } from './types';
import { useForm } from 'antd/es/form/Form';
import { listById, update } from '../../api/book';
import { CoverUpload } from './CoverUpload';
import { useEffect } from 'react';

export const UpdateBookModal = (props: IUpdateModalProps) => {
  const [form] = useForm<IBook>();
  console.log(props);
  const getBookDetailById = async () => {
    try {
      const { data } = await listById(props.bookId as number);
      form.setFieldsValue({ ...data });
    } catch (error: any) {
      message.error('图书信息获取失败!', error.response.data.message);
    }
  };

  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    try {
      await update(values);
      form.resetFields();
      props.handleClose();
      message.success('图书信息更新成功!');
      props.setRandom(Math.random());
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (props.visible) getBookDetailById(); // modal打开时请求数据,关闭时不请求;
  }, [props.visible]);
  return (
    <>
      <Modal
        open={props.visible}
        title="修改图书信息"
        onOk={handleOk}
        onCancel={() => props.handleClose()}
        destroyOnClose
        okText="更新"
        cancelText="关闭"
      >
        <Form form={form}>
          <Form.Item name="id" label="图书id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="图书名称"
            rules={[{ required: true, message: '请输入图书名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="图书作者"
            rules={[{ required: true, message: '请输入图书作者!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="图书描述"
            rules={[{ required: true, message: '请输入图书描述!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="cover"
            label="图书封面"
            rules={[{ required: true, message: '请上传图书封面!' }]}
          >
            <CoverUpload />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
