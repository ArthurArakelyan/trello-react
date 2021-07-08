import React from 'react';

const Textarea = (props) => {
  const {enterClick, ...other} = props;

  return (
    <textarea
      onKeyDown={(e) => {
        if(e.keyCode === 13) {
          e.preventDefault();
          enterClick(e);
        }
      }}
      {...other}
    />
  );
}

export default Textarea;
