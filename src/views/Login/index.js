import React, { useCallback, useState } from 'react';
import 'views/Login/Login.scss';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import firebase from 'services/firebase';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

function Login() {
  const [errMsg, setErrMsg] = useState(null);
  const history = useHistory();

  const login = useCallback(
    async ({ email, password }) => {
      setErrMsg(null);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push('/');
      } catch (err) {
        // console.log(err);
        setErrMsg("Couldn't log in, please try again!");
      }
    },
    [history],
  );

  return (
    <section className="login">
      <h2>Login with admin account</h2>
      <Form {...layout} name="login-form" onFinish={login}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {errMsg && (
          <Form.Item {...tailLayout}>
            <span className="login__err">{errMsg}</span>
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Login;
