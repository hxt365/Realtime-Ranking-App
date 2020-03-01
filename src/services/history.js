import moment from 'moment';
import firebase from 'firebase';

const newMatch = (winner, loser, type, chain, bonus, comment) => {
  let rankDiff = loser.level - winner.level;
  if (rankDiff < 0) rankDiff = 0;
  return {
    datetime: moment().format('YYYY-MM-DD H:m:s'),
    winner: winner.name,
    loser: winner.name,
    type,
    streak: winner.streak === 2,
    chain,
    rankDiff,
    bonus,
    comment: comment ?? '',
  };
};

const getHistoryFromFirebase = newHistory => {
  const res = newHistory.map(change => {
    const serializedData = change.doc.data();
    return {
      ...serializedData,
      key: change.doc.id,
      datetime: moment(serializedData.datetime, 'YYYY-MM-DD H:m:s'),
    };
  });
  return res;
};

const createHistoryFromFirebase = async values => {
  const db = firebase.firestore();
  const history = await db.collection('history').add(values);
  return {
    ...values,
    datetime: moment(values.datetime, 'YYYY-MM-DD H:m:s'),
    key: history.id,
  };
};

export { newMatch, getHistoryFromFirebase, createHistoryFromFirebase };
