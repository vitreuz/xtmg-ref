import * as React from 'react';

interface MBProps {
  currentID: number;
  lock: boolean;
  type: any;
  onClick: (id: number) => void;
}
function MenuBar(props: MBProps): JSX.Element {
  return (
    <div className="menu-bar">
      <ul className="menu-bar-list">{listButtons(props)}</ul>
    </div>
  );
}

function listButtons(props: MBProps): JSX.Element[] {
  const { type, lock, currentID, onClick } = props;

  const keys = Object.keys(type).filter(
    k => typeof type[k as any] === 'number'
  );

  return keys.map((key, i) => (
    <li className="menu-bar-list-item" key={i}>
      <button
        className="menu-bar-list-button"
        onClick={() => onClick(type[key])}
        disabled={type[key] === currentID || !!lock}
      >
        {key}
      </button>
    </li>
  ));
}

export default MenuBar;
