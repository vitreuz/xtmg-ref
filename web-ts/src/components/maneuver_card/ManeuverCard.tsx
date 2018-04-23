import * as React from 'react';
import { Bearing, Maneuver } from '../../client/Ship';
import XWingFont from '../xwing_font/index';
import { FontType } from '../xwing_font/XWingFont';

export interface ManeuverCardProps {
  maneuvers: Maneuver[][];
}

function ManeuverCard({ maneuvers }: ManeuverCardProps) {
  return (
    <div className="maneuver-card">
      <table className="maneuver-card-table">
        <tbody>{listRows(maneuvers)}</tbody>
      </table>
    </div>
  );
}

function listRows(maneuvers: Maneuver[][]) {
  const { rows, start } = formatRows(maneuvers);

  const jsx = rows.map((row, speed) => {
    const hasManeuver =
      row.length > 0 && !!row.reduce((prev, cur) => prev + cur);
    if (hasManeuver || start < 0) {
      return <ManeuverRow speed={speed + start} row={row} key={speed} />;
    }

    return;
  });

  return jsx.reverse();
}

function formatRows(maneuvers: Maneuver[][]) {
  let rows: Maneuver[][] = [];
  let start: number = 0;
  const maxLen = maneuvers.reduce(
    (prev, cur) => (rowLen(cur) > prev ? rowLen(cur) : prev),
    0
  );

  Array.from(maneuvers).forEach((row, speed) => {
    const hasReverse = row.length > Bearing.ReverseBankLeft;
    if (hasReverse) {
      const reverseRow = [0].concat(row.slice(Bearing.ReverseBankLeft));

      rows.unshift(reverseRow);
      start = -1 * speed;
    }

    rows.push(row.slice(0, maxLen + 1));
  });

  return { rows: rows, start: start };
}

function rowLen(maneuvers: Maneuver[]): number {
  if (maneuvers.length === 0) {
    return 0;
  }

  return maneuvers.reduce((prev, cur, i) => {
    if (!!cur && i < Bearing.ReverseBankLeft) {
      return i;
    }

    return prev;
  });
}

interface ManeuverRowProps {
  speed: number;
  row: Maneuver[];
}
export function ManeuverRow({ speed, row }: ManeuverRowProps) {
  return (
    <tr className="maneuver-card-row">
      <th className="maneuver-card-row-speed">{speed}</th>
      {listCells(row, speed)}
    </tr>
  );
}

function listCells(row: Maneuver[], speed: number) {
  return row.map((difficulty, i) => {
    const bearing = speedBearing(i, speed);

    if (i > Bearing.TurnRight && difficulty === Maneuver.none) {
      return;
    }

    return (
      <td className="maneuver-card-cell" key={i}>
        {!!difficulty && (
          <XWingFont symbol={bearing} type={FontType.maneuver} />
        )}
      </td>
    );
  });
}

function speedBearing(index: number, speed: number) {
  if (speed === 0) {
    return Bearing.Stop;
  }
  if (speed < 0) {
    return index + Bearing.ReverseBankLeft - 1;
  }

  return index;
}

export default ManeuverCard;
