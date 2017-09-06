import React from 'react';
import { Paper as MuiPaper } from 'material-ui';
import styled from 'styled-components';

import { muiTheme } from '../constants/styles';


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
  border-left: 2px solid ${muiTheme.palette.primary1Color};
  padding: 3px 0 3px 10px;
  margin-bottom: 15px;
`;
