import _ from 'lodash';
import React from 'react';
import { Paper as MuiPaper, TableHeaderColumn } from 'material-ui';
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

export const renderHeaderColumn = (options) => {
  const opts = _.merge({
    visibility: true,
    flex: undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1.5,
      padding: '10px 0',
      height: 'auto',
      minHeight: '48px',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
    label: '',
    justifyContent: 'flex-start',
    forceShow: false,
  }, options);

  const { label, forceShow, justifyContent } = opts;

  return (
    (forceShow || opts.visibility) && <TableHeaderColumn
      style={{
        ...opts.style,
        justifyContent,
        flex: opts.flex,
      }}
      title={label}
    >
      {label}
    </TableHeaderColumn>
  );
};
