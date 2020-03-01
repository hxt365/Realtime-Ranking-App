import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function PlayerSelect({ players, selectPlayerHanler }) {
  return (
    <Select
      showSearch
      placeholder="Select a player"
      onChange={value => selectPlayerHanler(value)}
      optionFilterProp="children"
      filterOption={(input, option) => {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
    >
      {players?.map(player => (
        <Option key={player.key} value={player.key}>
          {player.name}
        </Option>
      ))}
    </Select>
  );
}

export default PlayerSelect;
