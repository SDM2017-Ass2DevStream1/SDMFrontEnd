import React from 'react';
import { Paper as MuiPaper } from 'material-ui';
import styled from 'styled-components';


export const Paper = ({ style, ...rest }) => {
  return (
    <MuiPaper
      {...rest}
      style={{
        padding: '25px 30px',
        marginBottom: '40px',
        ...style,
      }}
    />
  );
};

export const ModuleTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 25px;
`;
