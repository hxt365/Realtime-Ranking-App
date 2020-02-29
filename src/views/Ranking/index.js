import React, { useState, useContext } from 'react';
import 'views/Ranking/Ranking.scss';
import RankTable from 'components/RankTable';
import BonusForm from 'components/BonusForm';
import { Affix, Tooltip, Button, Modal } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined } from '@ant-design/icons';
import NewPlayerForm from 'components/NewPlayerForm';
import { PlayersContext, EventBonusContext } from 'services/context';

function Ranking() {
  const [targetedPlayer, setTargetedPlayer] = useState(null);
  const [addingNewPlayer, setAddingNewPlayer] = useState(false);
  const playersContext = useContext(PlayersContext);
  const eventBonusContext = useContext(EventBonusContext);

  const cancelBonusHanler = () => {
    setTargetedPlayer(null);
  };

  const addBonusHandler = ({ key, name }) => {
    setTargetedPlayer({
      id: key,
      name,
    });
  };

  const bonusSubmitHandler = ({ point, comment }) => {
    eventBonusContext.addBonusForPlayer(targetedPlayer.id, point, comment);
    setTargetedPlayer(null);
  };

  const toggleAddingNewPlayerHanler = () => {
    setAddingNewPlayer(c => !c);
  };

  const newPlayerSubmitHanler = ({ name }) => {
    playersContext.addNewPlayer(name);
    setAddingNewPlayer(false);
  };

  return (
    <section className="ranking">
      <h1>Player ranking</h1>
      <RankTable selectToAddBonusHandler={addBonusHandler} />
      <Modal visible={targetedPlayer != null} footer={null} onCancel={cancelBonusHanler} centered>
        <BonusForm playerName={targetedPlayer?.name} submitHandler={bonusSubmitHandler} />
      </Modal>
      <Affix style={{ position: 'fixed', right: '5%', bottom: '10rem' }}>
        <Tooltip title="Add a new player" placement="left">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size="large"
            onClick={toggleAddingNewPlayerHanler}
          />
        </Tooltip>
      </Affix>
      <Modal
        visible={addingNewPlayer}
        footer={null}
        onCancel={toggleAddingNewPlayerHanler}
        centered
      >
        <NewPlayerForm newPlayerSubmitHanler={newPlayerSubmitHanler} />
      </Modal>
    </section>
  );
}

export default Ranking;
