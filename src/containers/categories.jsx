import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  RESEARCH_DESIGN, SE_METHOD, SE_METHODOLOGY,
} from '../constants';
import { ModuleTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const listData = {
  design: {
    title: 'Research Design',
    items: RESEARCH_DESIGN,
  },
  method: {
    title: 'SE Method',
    items: SE_METHOD,
  },
  methodology: {
    title: 'SE Methodology',
    items: SE_METHODOLOGY,
  },
};

class Categories extends Component {
  renderItems(data) {
    const Container = styled.div`
      margin-bottom: 30px;
    `;

    const List = styled.ul`
      font-size: 14px;
      line-height: 2;
      margin-left: -25px;
    `;

    const Item = styled.li`
      display: inline-block;
      margin-left: 25px;
    `;

    return (
      <Container>
        <ModuleTitle>{data.title}</ModuleTitle>
        <List>
          {_.values(data.items).map((item, i) => {
            return (
              <Item key={i}>
                <Link to="/search/eyJwYWdlIjo0fQ%3D%3D">{item}</Link>
              </Item>
            );
          })}
        </List>
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.renderItems(listData.design)}
        {this.renderItems(listData.method)}
        {this.renderItems(listData.methodology)}
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => {
  return { search };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(searchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
