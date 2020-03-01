import React, { useEffect, useState } from 'react';
import './App.scss';
import Layout from 'components/Layout';
import Ranking from 'views/Ranking';
import MatchHistory from 'views/MatchHistory';
import EventBonus from 'views/EventBonus';
import { Route, Redirect, Switch } from 'react-router-dom';
import { PlayersContext, HistoryContext, EventBonusContext } from 'services/context';
import {
  newPlayer,
  calcLevel,
  calcPlusPoint,
  calcMinusPoint,
  getPlayersFromFirebase,
  getPlayerIdByKey,
  updatePlayerByKeyFromFirebase,
  createPlayerFromFirebase,
} from 'services/players';
import {
  newBonus,
  getEventBonusFromFirebase,
  createEventBonusFormFirebase,
} from 'services/eventBonus';
import { newMatch, getHistoryFromFirebase, createHistoryFromFirebase } from 'services/history';
import { notification } from 'antd';
import firebase from 'services/firebase';

function App() {
  const [players, setPlayers] = useState([]);
  const [history, setHistory] = useState([]);
  const [eventBonus, setEventBonus] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('players')
      .onSnapshot(snapshot => {
        const newPlayers = getPlayersFromFirebase(snapshot.docChanges());
        setPlayers(s => [...s, ...newPlayers]);
      });
    firebase
      .firestore()
      .collection('history')
      .onSnapshot(snapshot => {
        const newHistory = getHistoryFromFirebase(snapshot.docChanges());
        setHistory(s => [...s, ...newHistory]);
      });
    firebase
      .firestore()
      .collection('event-bonus')
      .onSnapshot(snapshot => {
        const newEventBonus = getEventBonusFromFirebase(snapshot.docChanges());
        setEventBonus(s => [...s, ...newEventBonus]);
      });
  }, []);

  const openNotification = (type, message) => {
    if (type === 'pending')
      notification.info({
        message,
        placement: 'topRight',
      });
    else
      notification.success({
        message,
        placement: 'topRight',
      });
  };

  const addPointForPlayer = (id, key, point) => {
    const newPlayers = [...players];
    newPlayers[id].bonus += point;
    newPlayers[id].point += point;
    newPlayers[id].level = calcLevel(newPlayers[id].point);
    setPlayers(newPlayers);
    updatePlayerByKeyFromFirebase(key, newPlayers[id]);
  };

  const updatePlayersAfterMatch = (winnerId, winnerKey, loserId, loserKey, type, chain, bonus) => {
    const newPlayers = [...players];
    const streak = newPlayers[winnerId].streak === 3;
    let rankDiff = newPlayers[loserId].level - newPlayers[winnerId].level;
    if (rankDiff < 0) rankDiff = 0;

    if (type === 'Bo1') {
      newPlayers[winnerId].streak += 1;
      if (newPlayers[winnerId].streak === 3) newPlayers[winnerId].streak = 0;
    }
    newPlayers[winnerId].point += calcPlusPoint(type, rankDiff, chain, bonus, streak);
    newPlayers[winnerId].level = calcLevel(newPlayers[winnerId].point);

    newPlayers[loserId].streak = 0;
    newPlayers[loserId].point += calcMinusPoint(type, rankDiff);
    if (newPlayers[loserId].point < 0) newPlayers[loserId].point = 0;
    newPlayers[loserId].level = calcLevel(newPlayers[loserId].point);

    setPlayers(newPlayers);
    updatePlayerByKeyFromFirebase(winnerKey, newPlayers[winnerId]);
    updatePlayerByKeyFromFirebase(loserKey, newPlayers[loserId]);
  };

  const addNewPlayer = async name => {
    const newPlayers = [...players];
    openNotification('pending', 'Adding new player...');
    const player = await createPlayerFromFirebase(newPlayer(name));
    openNotification('success', `Welcome ${name}!`);
    newPlayers.push(player);
    setPlayers(newPlayers);
  };

  const createHistory = async (winnerId, loserId, type, chain, bonus, comment) => {
    const newHistory = [...history];
    
    openNotification('pending', 'Adding history...');
    const match = await createHistoryFromFirebase(
      newMatch(players[winnerId], players[loserId], type, chain, bonus, comment),
    );
    openNotification('success', `${players[winnerId].name}'s just won ${players[loserId].name}`);
    newHistory.push(match);
    setHistory(newHistory);
  };

  const createEventBonus = async (id, bonus, comment) => {
    const newEventBonus = [...eventBonus];
    openNotification('pending', 'Adding bonus...');
    const event = await createEventBonusFormFirebase(newBonus(players[id].name, bonus, comment));
    openNotification('success', `Added bonus for ${players[id].name}!`);
    newEventBonus.push(event);
    setEventBonus(newEventBonus);
  };

  const addBonusForPlayer = (key, bonus, comment) => {
    const id = getPlayerIdByKey(players, key);

    createEventBonus(id, bonus, comment);
    addPointForPlayer(id, key, bonus);
  };

  const addMatchHistory = ({ winnerKey, loserKey, type, chain, bonus, comment }) => {
    const winnerId = getPlayerIdByKey(players, winnerKey);
    const loserId = getPlayerIdByKey(players, loserKey);

    createHistory(winnerId, loserId, type, chain, bonus, comment);
    updatePlayersAfterMatch(winnerId, winnerKey, loserId, loserKey, type, chain, bonus);
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
