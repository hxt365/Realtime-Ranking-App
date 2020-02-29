import moment from 'moment';

const newMatch = (key, winner, loser, type, chain, bonus, comment) => {
  let rankDiff = loser.level - winner.level;
  if (rankDiff < 0) rankDiff = 0;
  return {
    key,
    datetime: moment(),
    winner: winner.name,
    loser: winner.name,
    type,
    streak: winner.streak === 2,
    chain,
    rankDiff,
    bonus,
    comment,
  };
};

const createHistory = (
  players,
  history,
  setHistory,
  winner,
  loser,
  type,
  chain,
  bonus,
  comment,
) => {
  const newHistory = [...history];
  const match = newMatch(
    newHistory.length,
    players[winner],
    players[loser],
    type,
    chain,
    bonus,
    comment,
  );
  newHistory.push(match);
  setHistory(newHistory);
};

export { createHistory };
