const newPlayer = (key, name) => {
  return {
    key,
    name,
    win: 0,
    lose: 0,
    streak: 0,
    bonus: 0,
    point: 0,
    level: 0,
  };
};

const calcLevel = point => {
  const RANK_POINTS = [0, 50, 100, 150, 200, 300, 400, 500];
  return RANK_POINTS.filter(p => p <= point).length - 1;
};

const addPlayer = (players, setPlayers, name) => {
  const newPlayers = [...players];
  newPlayers.push(newPlayer(newPlayers.length, name));
  setPlayers(newPlayers);
};

const addPointForPlayer = (players, setPlayers, id, point) => {
  const newPlayers = [...players];
  newPlayers[id].bonus += point;
  newPlayers[id].point += point;
  newPlayers[id].level = calcLevel(newPlayers[id].point);
  setPlayers(newPlayers);
};

const updatePlayersAfterMatch = (players, setPlayers, winner, loser, chain, bonus) => {
  let rankDiff = players[loser].level - players[winner].level;
  if (rankDiff < 0) rankDiff = 0;
  const newPlayers = [...players];
  newPlayers[winner].streak += 1;
  newPlayers[winner].point += 5 + rankDiff + chain + bonus + 5 * (players[winner].streak === 3);
  if (newPlayers[winner].streak === 3) newPlayers[winner].streak = 0;
  newPlayers[winner].level = calcLevel(newPlayers[winner].point);
  newPlayers[loser].streak = 0;
  newPlayers[loser].level = calcLevel(newPlayers[loser].point);
  setPlayers(newPlayers);
};

export { addPlayer, addPointForPlayer, updatePlayersAfterMatch };
