import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  RESEARCH_DESIGN, SE_METHOD, SE_METHODOLOGY,
} from '../constants';
import { ModuleTitle, StyledLink } from '../components/misc';
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
  renderModule(data) {
    const Container = styled.div`
      margin-bottom: 30px;
    `;

    const List = styled.div`
      font-size: 14px;
      line-height: 2;
      margin-left: -25px;
    `;

    return (
      <Container>
        <ModuleTitle>{data.title}</ModuleTitle>
        <List>
          {_.values(data.items).map((item, i) => (
            <StyledLink
              key={i}
              to="/search/eyJwYWdlIjo0fQ%3D%3D"
            >
              {item}
            </StyledLink>
          ))}
        </List>
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.renderModule(listData.design)}
        {this.renderModule(listData.method)}
        {this.renderModule(listData.methodology)}
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
