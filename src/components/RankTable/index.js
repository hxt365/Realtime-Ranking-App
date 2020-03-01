import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { PlayersContext } from 'services/context';
import 'components/RankTable/RankTable.scss';
import { RANK } from 'constants/player';

function RankTable({ selectToAddBonusHandler }) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [players, setPlayers] = useState(null);
  const searchInput = useRef(null);
  const playersContext = useContext(PlayersContext);

  useEffect(() => {
    if (!playersContext.players) return;
    const playersList = [...playersContext.players];
    playersList.sort((a, b) => b.point - a.point);
    setPlayers(
      playersList.map((player, id) => {
        return { ...player, order: id + 1 };
      }),
    );
  }, [playersContext.players]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'No',
      dataIndex: 'order',
      key: 'order',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Win',
      dataIndex: 'win',
      key: 'win',
      width: '8%',
    },
    {
      title: 'Lose',
      dataIndex: 'lose',
      key: 'lose',
      width: '8%',
    },
    {
      title: 'Streak',
      dataIndex: 'streak',
      key: 'streak',
      width: '8%',
    },
    {
      title: 'Event bonus',
      dataIndex: 'bonus',
      key: 'bonus',
      width: '10%',
    },
    {
      title: 'Rank point',
      dataIndex: 'point',
      key: 'point',
      width: '10%',
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: 'Rank',
      key: 'rank',
      width: '10%',
      render: record => RANK[record.level],
      filters: RANK.map((rank, id) => {
        return { text: rank, value: id };
      }),
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Rank level',
      dataIndex: 'level',
      key: 'level',
      width: '8%',
    },
    {
      title: '',
      key: 'action',
      width: '13%',
      render: record => (
        <Button
          type="dashed"
          shape="round"
          icon={<PlusOutlined />}
          size="small"
          onClick={() => selectToAddBonusHandler(record)}
        >
          Bonus
        </Button>
      ),
    },
  ];

  return (
    <div className="rank-table">
      <Table columns={columns} dataSource={players} pagination={false} bordered />
    </div>
  );
}

export default RankTable;
