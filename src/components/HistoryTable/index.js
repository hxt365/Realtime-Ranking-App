import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined, StarTwoTone } from '@ant-design/icons';
import React, { useState, useRef, useContext } from 'react';
import 'components/HistoryTable/HistoryTable.scss';
import { HistoryContext } from 'services/context';

function HistoryTable() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const historyContext = useContext(HistoryContext);

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
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
      width: '10%',
      render: record => {
        return record.format('DD-MM-YYYY');
      },
      sorter: (a, b) => a.datetime - b.datetime,
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      key: 'winner',
      width: '20%',
      ...getColumnSearchProps('winner'),
    },
    {
      title: 'Winstreak',
      dataIndex: 'streak',
      key: 'streak',
      width: '5%',
      render: record => {
        return record && <StarTwoTone style={{ fontSize: '1.8rem' }} />;
      },
      filters: [
        {
          text: 'Streak',
          value: true,
        },
        {
          text: 'No streak',
          value: false,
        },
      ],
      onFilter: (value, record) => record.streak === value,
    },
    {
      title: 'Chain point',
      dataIndex: 'chain',
      key: 'chain',
      width: '5%',
    },
    {
      title: 'Game type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      filters: [
        {
          text: 'Bo1',
          value: 'Bo1',
        },
        {
          text: 'Bo3',
          value: 'Bo3',
        },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Plus point',
      key: 'plus',
      width: '5%',
      render: record => {
        const res = 5 + record.chain + record.bonus + record.rankDiff + 5 * record.streak;
        return res;
      },
    },
    {
      title: 'Loser',
      dataIndex: 'loser',
      key: 'loser',
      width: '20%',
      ...getColumnSearchProps('loser'),
    },
    {
      title: 'Minus point',
      key: 'minus',
      width: '5%',
      render: record => {
        const res = -2.5 - record.rankDiff;
        return res;
      },
    },
    {
      title: 'Rank difference',
      dataIndex: 'rankDiff',
      key: 'rankDiff',
      width: '5%',
    },
    {
      title: 'Bonus point',
      dataIndex: 'bonus',
      key: 'bonus',
      width: '5%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: '10%',
    },
  ];

  let data = null;
  if (historyContext.history) {
    data = [...historyContext.history];
    data.sort((a, b) => b.datetime - a.datetime);
  }
  return (
    <div className="history-table">
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </div>
  );
}

export default HistoryTable;
