import React, { useEffect, useState } from 'react';
import './App.scss';
import Layout from 'components/Layout';
import Ranking from 'views/Ranking';
import MatchHistory from 'views/MatchHistory';
import EventBonus from 'views/EventBonus';
import { Route, Redirect, Switch } from 'react-router-dom';
import { playersData, historyData, eventBonusData } from 'services/mock-data';
import { PlayersContext, HistoryContext, EventBonusContext } from 'services/context';
import { addPlayer, addPointForPlayer, updatePlayersAfterMatch } from 'services/players';
import { createEventBonus } from 'services/eventBonus';
import { createHistory } from 'services/history';

function App() {
  const [players, setPlayers] = useState(null);
  const [history, setHistory] = useState(null);
  const [eventBonus, setEventBonus] = useState(null);

  useEffect(() => {
    setPlayers(playersData);
    setHistory(historyData);
    setEventBonus(eventBonusData);
  }, []);

  const addNewPlayer = name => {
    addPlayer(players, setPlayers, name);
  };

  const addBonusForPlayer = (id, bonus, comment) => {
    addPointForPlayer(players, setPlayers, id, bonus);
    createEventBonus(players, eventBonus, setEventBonus, id, bonus, comment);
  };

  const addMatchHistory = ({ winner, loser, type, chain, bonus, comment }) => {
    createHistory(players, history, setHistory, winner, loser, type, chain, bonus, comment);
    updatePlayersAfterMatch(players, setPlayers, winner, loser, type, chain, bonus);
  };

  return (
    <div className="App">
      <PlayersContext.Provider value={{ players, addNewPlayer }}>
        <HistoryContext.Provider value={{ history, addMatchHistory }}>
          <EventBonusContext.Provider value={{ eventBonus, addBonusForPlayer }}>
            <Layout>
              <Switch>
                <Route path="/ranking" exact>
                  <Ranking />
                </Route>
                <Route path="/history" exact>
                  <MatchHistory />
                </Route>
                <Route path="/bonus" exact>
                  <EventBonus />
                </Route>
                <Redirect to="/ranking" />
              </Switch>
            </Layout>
          </EventBonusContext.Provider>
        </HistoryContext.Provider>
      </PlayersContext.Provider>
    </div>
  );
}

export default App;
