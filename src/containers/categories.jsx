import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { encodeQuery } from '../utils';
import {
  RESEARCH_DESIGN, SE_METHOD, SE_METHODOLOGY,
  SEARCH_CONDITION_FIELD_TYPE,
} from '../constants';
import { ModuleTitle, StyledLink } from '../components/misc';
import * as searchActions from '../actions/search';


const listData = {
  design: {
    field: SEARCH_CONDITION_FIELD_TYPE.DESIGN,
    title: 'Research Design',
    items: RESEARCH_DESIGN,
  },
  method: {
    field: SEARCH_CONDITION_FIELD_TYPE.METHOD,
    title: 'SE Method',
    items: SE_METHOD,
  },
  methodology: {
    field: SEARCH_CONDITION_FIELD_TYPE.METHODOLOGY,
    title: 'SE Methodology',
    items: SE_METHODOLOGY,
  },
};

const Link = StyledLink.withComponent('a');

class Categories extends Component {
  onRedirect(e, field, option) {
    e.preventDefault();
    this.props.history.push(`/search/${encodeQuery({
      conditions: [
        {
          type: 1, // AND
          field,
          operator: 3, // is equel to
          option,
        },
      ],
    })}`);
  }

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
            <Link key={i} onClick={e => this.onRedirect(e, data.field, i + 1)}>
              {item}
            </Link>
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
)(withRouter(Categories));
