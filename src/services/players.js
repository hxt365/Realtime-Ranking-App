import firebase from 'services/firebase';

const newPlayer = name => {
  return {
    name,
    win: 0,
    lose: 0,
    streak: 0,
    bonus: 0,
    point: 50,
    level: 1,
  };
};

const calcLevel = point => {
  const RANK_POINTS = [0, 50, 100, 150, 200, 300, 400, 500];
  return RANK_POINTS.filter(p => p <= point).length - 1;
};

const calcPlusPoint = (type, rankDiff, chain, bonus, streak) => {
  let plus = 5 + rankDiff + chain / 2 + bonus + 5 * streak;
  if (type === 'Bo3') plus = 15 + rankDiff + chain + bonus;
  return plus;
};

const calcMinusPoint = (type, rankDiff) => {
  let minus = -2.5 - rankDiff;
  if (type === 'Bo3') minus = -7.5 - rankDiff;
  return minus;
};

const getPlayerByKey = (players, key) => {
  return players.find(player => player.key === key);
};

const getPlayerIdByKey = (players, key) => {
  return players.findIndex(player => player.key === key);
};

const getPlayersFromFirebase = newPlayers => {
  const added = newPlayers
    .filter(change => change.type === 'added')
    .map(change => ({ ...change.doc.data(), key: change.doc.id }));
  const modified = newPlayers
    .filter(change => change.type === 'modified')
    .map(change => ({ ...change.doc.data(), key: change.doc.id }));
  return { added, modified };
};

const createPlayerFromFirebase = async values => {
  const db = firebase.firestore();
  const player = await db.collection('players').add(values);
  return {
    ...values,
    key: player.id,
  };
};

const updatePlayerByKeyFromFirebase = async (key, values) => {
  const valuesWithoutKey = { ...values };
  delete valuesWithoutKey.key;
  const db = firebase.firestore();
  db.collection('players')
    .doc(key)
    .set(valuesWithoutKey);
};

export {
  newPlayer,
  calcLevel,
  calcPlusPoint,
  calcMinusPoint,
  getPlayerByKey,
  getPlayerIdByKey,
  getPlayersFromFirebase,
  createPlayerFromFirebase,
  updatePlayerByKeyFromFirebase,
};
