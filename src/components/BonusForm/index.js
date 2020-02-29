import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import 'components/BonusForm/BonusForm.scss';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const btnLayout = {
  wrapperCol: { offset: 11 },
};

function BonusForm({ player, submitHandler }) {
  const onFinish = values => {
    submitHandler(values);
  };
  return (
    <Form name="bonus-form" {...layout} onFinish={onFinish}>
      <Form.Item {...tailLayout}>
        <span className="bonus-form__intro">
          Bonus for&nbsp;
          <em>{player?.name}</em>
          &nbsp;!
        </span>
      </Form.Item>
      <Form.Item
        label="Bonus point"
        name="point"
        rules={[{ required: true, message: 'Please input bonus point!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="Comment" name="comment">
        <Input />
      </Form.Item>
      <Form.Item {...btnLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BonusForm;
