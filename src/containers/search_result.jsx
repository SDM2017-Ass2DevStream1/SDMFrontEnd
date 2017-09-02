import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';


class SearchResult extends Component {
  renderItems() {
    const { search: { items } } = this.props;
    const Li = styled.li`
      background: yellow;
    `;
    const Title = styled.h3`
      font-size: 16px;
      color: blue;
    `;
    const Description = styled.p`
      color: red;
    `;

    return items.map((item) => {
      return (
        <Li key={item.id} className="item {styles.item}">
          <Title>{item.title}</Title>
          <Description>{item.desc}</Description>
        </Li>
      );
    });
  }

  render() {
    return (
      <ul>{this.renderItems()}</ul>
    );
  }
}

const mapStateToProps = ({ search }) => {
  return { search };
};

export default connect(
  mapStateToProps,
)(SearchResult);
