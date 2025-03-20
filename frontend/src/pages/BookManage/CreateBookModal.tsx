import { Form, Input, Modal, message } from 'antd';
import { IBook, ICreateModalProps } from './types';
import { useForm } from 'antd/es/form/Form';
import { create } from '../../api/book';
import { CoverUpload } from './CoverUpload';

export const CreateBookModal = (props: ICreateModalProps) => {
  const [form] = useForm<IBook>();
  const handleOk = async () => {
    await form.validateFields();

    const values = form.getFieldsValue();
    console.log(values);
    try {
      await create(values);
      form.resetFields();
      props.handleClose();
      message.success('图书添加成功!');
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <Modal
        open={props.visible}
        title="添加图书"
        onOk={handleOk}
        onCancel={() => props.handleClose()}
        destroyOnClose
        okText="添加"
        cancelText="关闭"
      >
        <Form form={form}>
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
