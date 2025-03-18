import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/user';

type LoginUserDto = {
  username: string;
  password: string;
  remember?: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const onFinish: FormProps<LoginUserDto>['onFinish'] = async (
    values: LoginUserDto,
  ) => {
    console.log('Success:', values);

    try {
      const res = await login(values);
      message.success('登录成功!');
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log(error);
      message.error(error.message || error.response.data.message);
    }
  };

  const onFinishFailed: FormProps<LoginUserDto>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={18} className="h-screen bg-black">
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
              <Form.Item<LoginUserDto>
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<LoginUserDto>
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item<LoginUserDto>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <div className="flex items-center">
                  <Checkbox>记住我</Checkbox>

                  <Button type="link" onClick={handleRegister}>
                    没有账号?去注册
                  </Button>
                </div>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" className="w-40">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
