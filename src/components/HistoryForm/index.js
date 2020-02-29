import React from 'react';
import { Form, Button, Input, InputNumber, Radio, Tooltip } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StarFilled } from '@ant-design/icons';
import PlayerSelect from 'components/share/PlayerSelect';
import 'components/HistoryForm/HistoryForm.scss';
import { playersData } from 'services/mock-data';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

function HistoryForm({ submitHandler }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    submitHandler(values);
  };

  const selectPlayerHanler = (item, name) => {
    const newFieldsValue = {};
    newFieldsValue[item] = name;
    form.setFieldsValue({
      ...newFieldsValue,
    });
  };

  return (
    <Form
      name="history-form"
      {...layout}
      onFinish={onFinish}
      initialValues={{
        type: 'Bo1',
        chain: 0,
        bonus: 0,
      }}
      form={form}
    >
      <Form.Item {...tailLayout}>
        <Form.Item
          name="winner"
          style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
          rules={[{ required: true, message: 'Winner is required' }]}
        >
          <div className="wrapper">
            <span className="rank">Winner</span>
            <Tooltip placement="top" title="Winstreak">
              <StarFilled style={{ fontSize: '1.5rem', marginLeft: '.5rem', color: '#FFBE00' }} />
            </Tooltip>
            <PlayerSelect
              players={playersData}
              selectPlayerHanler={name => selectPlayerHanler('winner', name)}
            />
            <span className="point">+5</span>
          </div>
        </Form.Item>
        <Form.Item
          style={{ display: 'inline-block', width: '30px', lineHeight: '86px', margin: '0 20px' }}
        >
          <span>won</span>
        </Form.Item>
        <Form.Item
          name="loser"
          style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
          rules={[{ required: true, message: 'Loser is required' }]}
        >
          <div className="wrapper">
            <span className="rank">Loser</span>
            <PlayerSelect
              players={playersData}
              selectPlayerHanler={name => selectPlayerHanler('loser', name)}
            />
            <span className="point">-2.5</span>
          </div>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Game type"
        name="type"
        rules={[{ required: true, message: 'Game type is required' }]}
      >
        <Radio.Group>
          <Radio value="Bo1">Bo1</Radio>
          <Radio value="Bo3">Bo3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Chain point"
        name="chain"
        rules={[{ required: true, message: 'Chain point is required' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Bonus"
        name="bonus"
        rules={[{ required: true, message: 'Chain point is required' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="Comment" name="comment">
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default HistoryForm;
