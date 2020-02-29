import moment from 'moment';

const newBonus = (key, name, bonus, comment) => {
  return {
    key,
    datetime: moment(),
    name,
    bonus,
    comment,
  };
};

const createEventBonus = (players, eventBonus, setEventBonus, id, bonus, comment) => {
  const newEventBonus = [...eventBonus];
  newEventBonus.push(newBonus(newEventBonus.length, players[id].name, bonus, comment));
  setEventBonus(newEventBonus);
};

export { createEventBonus };
