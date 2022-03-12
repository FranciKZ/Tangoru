import React from 'react';

interface IKeyboardRowProps {
  children: React.ReactNode;
}

function KeyboardRow({ children }: IKeyboardRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

KeyboardRow.whyDidYouRender = true;
export default React.memo(KeyboardRow);
