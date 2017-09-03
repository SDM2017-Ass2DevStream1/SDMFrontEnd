import React from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';


export const MiscPaper = ({ style, ...rest }) => {
  return (
    <Paper
      {...rest}
      style={{
        padding: '25px 30px',
        marginBottom: '30px',
        ...style,
      }}
    />
  );
};

export const MiscTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;
