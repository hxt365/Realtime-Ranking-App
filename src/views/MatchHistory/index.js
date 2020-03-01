import React, { useState, useContext } from 'react';
import HistoryTable from 'components/HistoryTable';
import { Affix, Button, Tooltip, Modal } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined } from '@ant-design/icons';
import HistoryForm from 'components/HistoryForm';
import 'views/MatchHistory/MatchHistory.scss';
import { HistoryContext, AuthContext } from 'services/context';

function MatchHistory() {
  const { currentUser } = useContext(AuthContext);
  const [openingModal, setOpeningModal] = useState(false);
  const historyContext = useContext(HistoryContext);

  const toggleOpeningModalHandler = () => {
    setOpeningModal(c => !c);
  };

  const historySubmitHandler = values => {
    historyContext.addMatchHistory(values);
    setOpeningModal(false);
  };

  return (
    <section className="match-history">
      <h1>Match History</h1>

      <HistoryTable />

      {!!currentUser && (
        <Affix style={{ position: 'fixed', right: '5%', bottom: '10rem' }}>
          <Tooltip title="Add a match history" placement="left">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="large"
              onClick={toggleOpeningModalHandler}
            />
          </Tooltip>
        </Affix>
      )}

      <Modal visible={openingModal} footer={null} onCancel={toggleOpeningModalHandler} centered>
        <HistoryForm submitHandler={historySubmitHandler} />
      </Modal>
    </section>
  );
}

export default MatchHistory;
