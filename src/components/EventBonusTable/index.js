import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useRef, useContext } from 'react';
import { EventBonusContext } from 'services/context';
import 'components/EventBonusTable/EventBonusTable.scss';

function EventBonusTable() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const eventBonusContext = useContext(EventBonusContext);

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
    render: text => {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      );
    },
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
      width: '15%',
      render: record => {
        return record.format('DD-MM-YYYY');
      },
      sorter: (a, b) => a.datetime - b.datetime,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Bonus point',
      dataIndex: 'bonus',
      key: 'bonus',
      width: '10%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: '45%',
    },
  ];

  let data = null;
  if (eventBonusContext.eventBonus) {
    data = [...eventBonusContext.eventBonus];
    data.sort((a, b) => b.datetime - a.datetime);
  }
  return (
    <div className="history-table">
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </div>
  );
}

export default EventBonusTable;
