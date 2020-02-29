import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import 'components/NewPlayerForm/NewPlayerForm.scss';
import { PlayersContext } from 'services/context';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const btnLayout = {
  wrapperCol: { offset: 10 },
};

function NewPlayerForm({ newPlayerSubmitHanler }) {
  const [username, setUsername] = useState({ value: '' });
  const playersContext = useContext(PlayersContext);
  const [form] = Form.useForm();

  const onFinish = values => {
    newPlayerSubmitHanler(values);
    form.resetFields();
  };

  const validateUsername = name => {
    const { players } = playersContext;
    const id = players.findIndex(player => player.name === name);
    return id === -1;
  };

  const onChangeUsernameHandler = e => {
    const { value } = e.target;
    setUsername({
      ...validateUsername(value),
      value,
    });
  };

  return (
    <Form name="new-player-form" {...layout} onFinish={onFinish} form={form}>
      <Form.Item
        label="Username"
        name="name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input username!',
          },
          () => ({
            validator(rule, value) {
              if (!value) return Promise.resolve();
              if (validateUsername(value)) return Promise.resolve();
              return Promise.reject('Username already existed!');
            },
          }),
        ]}
      >
        <Input value={username.value} onChange={onChangeUsernameHandler} />
      </Form.Item>
      <Form.Item {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewPlayerForm;
