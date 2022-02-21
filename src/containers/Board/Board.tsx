import React from 'react';
import WordRow from '../../components/WordRow/WordRow';

function Board() {
  const renderWordRows = () => {
    const result = [];

    for (let i = 0; i < 6; i += 1) {
      result.push(<WordRow key={`row_${i}`} rowIndex={i} />);
    }

    return result;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {renderWordRows()}
    </div>
  );
}

export default Board;
