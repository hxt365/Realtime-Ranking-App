import moment from 'moment';
import firebase from 'firebase';

const newBonus = (name, bonus, comment) => {
  return {
    datetime: moment().format('YYYY-MM-DD H:m:s'),
    name,
    bonus,
    comment: comment ?? '',
  };
};

const getEventBonusFromFirebase = newEventBonus => {
  const res = newEventBonus.map(change => {
    const serializedData = change.doc.data();
    return {
      ...serializedData,
      key: change.doc.id,
      datetime: moment(serializedData.datetime, 'YYYY-MM-DD H:m:s'),
    };
  });
  return res;
};

const createEventBonusFormFirebase = async values => {
  const db = firebase.firestore();
  const eventBonus = await db.collection('event-bonus').add(values);
  return {
    ...values,
    datetime: moment(values.datetime, 'YYYY-MM-DD H:m:s'),
    key: eventBonus.id,
  };
};

export { newBonus, getEventBonusFromFirebase, createEventBonusFormFirebase };
