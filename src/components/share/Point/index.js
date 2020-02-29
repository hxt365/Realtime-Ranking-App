import React from 'react';
import 'components/share/Point/Point.scss';

function Point({ win, streak, rankDiff, chain, bonus }) {
  let winPoint = null;
  let rankDiffPoint = null;
  let chainPoint = null;
  let bonusPoint = null;
  let streakPoint = null;

  if (win) winPoint = <span>+&nbsp;5</span>;
  else winPoint = <span>-&nbsp;2.5</span>;

  if (rankDiff > 0) {
    if (win)
      rankDiffPoint = (
        <span>
          &nbsp;+&nbsp;
          {rankDiff}
        </span>
      );
    else
      rankDiffPoint = (
        <span>
          &nbsp;-&nbsp;
          {rankDiff}
        </span>
      );
  }

  if (chain)
    chainPoint = (
      <span>
        &nbsp;+&nbsp;
        {chain}
      </span>
    );

  if (bonus)
    bonusPoint = (
      <span>
        &nbsp;+&nbsp;
        {bonus}
      </span>
    );

  if (streak) streakPoint = <span>&nbsp;+&nbsp;5</span>;

  return (
    <div className="point">
      {winPoint}
      {streakPoint}
      {rankDiffPoint}
      {chainPoint}
      {bonusPoint}
    </div>
  );
}

export default Point;
