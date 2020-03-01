import React, { useContext, useState } from 'react';
import { Form, Button, Input, InputNumber, Radio, Tooltip } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StarFilled } from '@ant-design/icons';
import PlayerSelect from 'components/share/PlayerSelect';
import 'components/HistoryForm/HistoryForm.scss';
import { PlayersContext } from 'services/context';
import { RANK } from 'constants/player';
import Point from 'components/share/Point';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

function HistoryForm({ submitHandler }) {
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [chain, setChain] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [type, setType] = useState('Bo1');
  const playersContext = useContext(PlayersContext);
  const [form] = Form.useForm();

  const onFinish = values => {
    submitHandler(values);
    form.resetFields();
    setWinner(null);
    setLoser(null);
    setChain(0);
    setBonus(0);
    setType('Bo1');
  };

  const selectPlayerHanler = (item, id) => {
    const newFieldsValue = {};
    newFieldsValue[item] = id;
    form.setFieldsValue({
      ...newFieldsValue,
    });
    if (item === 'winner')
      setWinner({
        level: playersContext.players[id].level,
        streak: playersContext.players[id].streak === 2,
      });
    else if (item === 'loser') setLoser({ level: playersContext.players[id].level });
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
            <span className="rank">{winner ? RANK[winner.level] : 'Winner'}</span>
            {winner?.streak && (
              <Tooltip placement="top" title="Winstreak">
                <StarFilled style={{ fontSize: '1.5rem', marginLeft: '.5rem', color: '#FFBE00' }} />
              </Tooltip>
            )}
            <PlayerSelect
              players={playersContext.players}
              selectPlayerHanler={id => selectPlayerHanler('winner', id)}
            />
            <Point
              type={type}
              win
              streak={winner?.streak}
              rankDiff={winner && loser ? loser.level - winner.level : null}
              chain={chain}
              bonus={bonus}
            />
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
            <span className="rank">{loser ? RANK[loser.level] : 'Loser'}</span>
            <PlayerSelect
              players={playersContext.players}
              selectPlayerHanler={id => selectPlayerHanler('loser', id)}
            />
            <Point type={type} rankDiff={winner && loser ? loser.level - winner.level : null} />
          </div>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="Game type"
        name="type"
        rules={[{ required: true, message: 'Game type is required' }]}
      >
        <Radio.Group onChange={e => setType(e.target.value)}>
          <Radio value="Bo1">Bo1</Radio>
          <Radio value="Bo3">Bo3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Chain point"
        name="chain"
        rules={[{ required: true, message: 'Chain point is required' }]}
      >
        <InputNumber min={0} onChange={value => setChain(value)} />
      </Form.Item>
      <Form.Item
        label="Bonus"
        name="bonus"
        rules={[{ required: true, message: 'Bonus point is required' }]}
      >
        <InputNumber onChange={value => setBonus(value)} />
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
