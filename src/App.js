import React, { useEffect, useState } from 'react';
import './App.scss';
import Layout from 'components/Layout';
import Ranking from 'views/Ranking';
import MatchHistory from 'views/MatchHistory';
import EventBonus from 'views/EventBonus';
import { Route, Redirect, Switch } from 'react-router-dom';
import { playersData, historyData, eventBonusData } from 'services/mock-data';
import { PlayersContext, HistoryContext, EventBonusContext } from 'services/context';

function App() {
  const [players, setPlayers] = useState(null);
  const [history, setHistory] = useState(null);
  const [eventBonus, setEventBonus] = useState(null);

  useEffect(() => {
    setPlayers(playersData);
    setHistory(historyData);
    setEventBonus(eventBonusData);
  }, []);

  return (
    <div className="App">
      <PlayersContext.Provider value={players}>
        <HistoryContext.Provider value={history}>
          <EventBonusContext.Provider value={eventBonus}>
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
