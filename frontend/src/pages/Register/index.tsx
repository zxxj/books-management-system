import type { FormProps } from 'antd';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/user';

type RegisterUserDto = {
  username: string;
  password: string;
  repassword: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const onFinish: FormProps<RegisterUserDto>['onFinish'] = async (
    values: RegisterUserDto,
  ) => {
    console.log('Success:', values);

    if (values.password !== values.repassword) {
      setTimeout(() => {
        message.error('两次密码输入的不一致!');
      }, 0);
      return;
    }

    try {
      const res = await register(values);
      console.log(res);
      message.success('注册成功!');
      navigate('/');
    } catch (error: any) {
      setTimeout(() => {
        message.error(error.message || error.response.data.message);
      }, 0);
    }
  };

  const onFinishFailed: FormProps<RegisterUserDto>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row>
        <Col
          span={18}
          className="h-screen bg-[url('/background.png')] bg-cover bg-center"
        >
          <div>1111</div>
        </Col>
        <Col span={6} className="h-screen bg-white ">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center text-2xl mb-30">
              <img
                src="/public/logo.png"
                alt="logo"
                className="w-16 rounded-3xl mr-2.5"
              />
              koala图书管理系统
            </div>

            <Form
              name="basic"
              labelCol={{ span: 6 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="w-4/5"
            >
              <Form.Item<RegisterUserDto>
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<RegisterUserDto>
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<RegisterUserDto>
                label="确认密码"
                name="repassword"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<RegisterUserDto> valuePropName="checked" label={null}>
                <Button type="link" onClick={handleLogin}>
                  已有账号?去登录
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" className="w-40">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
