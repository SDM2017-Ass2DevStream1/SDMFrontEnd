import _ from 'lodash';
import React from 'react';
import {
  Paper as MuiPaper,
  TableHeaderColumn as MuiTableHeaderColumn,
  TableRowColumn as MuiTableRowColumn,
  RaisedButton as MuiRaisedButton,
} from 'material-ui';
import { colors } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { muiTheme } from '../constants/styles';


export const Paper = ({ style, ...rest }) => {
  return (
    <MuiPaper
      style={{
        padding: '25px 30px',
        marginBottom: '40px',
        ...style,
      }}
      {...rest}
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

const columnStyles = {
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1.5,
  padding: '10px',
  height: 'auto',
  minHeight: '48px',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
};

export const TableHeaderColumn = (options) => {
  const opts = _.merge({
    visibility: true,
    flex: 1,
    value: '',
    justifyContent: 'flex-start',
    forceShow: false,
  }, options);

  const { value, forceShow, justifyContent } = opts;

  return (
    (forceShow || opts.visibility) && <MuiTableHeaderColumn
      style={{
        ...columnStyles,
        justifyContent,
        flex: opts.flex,
      }}
    >
      {value}
    </MuiTableHeaderColumn>
  );
};

export const TableRowColumn = (options) => {
  const opts = {
    ...{
      key: '',
      value: '',
      flex: 1,
      visibility: true,
      forceShow: false,
      justifyContent: 'flex-start',
    },
    ...options,
  };
  const {
    key, value, flex, visibility, forceShow, justifyContent,
  } = opts;

  const props = {};

  if (!_.isEmpty(key)) {
    props.key = key;
  }

  return (
    (forceShow || visibility) && <MuiTableRowColumn
      {...props}
      style={{
        ...columnStyles,
        justifyContent,
        flex,
      }}
    >
      {value}
    </MuiTableRowColumn>
  );
};

export const IconButton = ({ overlayStyle, ...rest }) => (
  <MuiRaisedButton
    primary
    labelPosition="before"
    overlayStyle={{
      display: 'flex',
      alignItems: 'center',
      ...overlayStyle,
    }}
    {...rest}
  />
);

export const StyledLink = styled(Link)`
  position: relative;
  display: inline-block;
  margin-left: 25px;
  text-decoration: none;
  color: ${colors.lightBlue500};
  &:after {
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 0;
    height: 1px;
    content: '';
    background: ${colors.lightBlue500};
    transition: width .5s ease;
  }
  &:hover&:after {
    width: 100%
  }
`;
