import React from 'react';

const ListLinks = function(props) {
  if (props.idFile === props.idLink) {
    return <p>{props.link}</p>;
  } else {
    return <p />;
  }
};

export default ListLinks;
