import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableRow, SelectField, MenuItem,
} from 'material-ui';
import {
  NavigationArrowDropDown, NavigationArrowDropUp,
} from 'material-ui/svg-icons';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import { SEARCH_RESULTS_COLUMN, SORT_BY_METHOD } from '../constants';
import { BORDER, muiTheme } from '../constants/styles';
import {
  ModuleTitle, TableHeaderColumn, TableRowColumn,
} from '../components/misc';
import * as searchActions from '../actions/search';


const flexOptions = {
  [SEARCH_RESULTS_COLUMN.TITLE]: 6,
  [SEARCH_RESULTS_COLUMN.AUTHORS]: 3,
  [SEARCH_RESULTS_COLUMN.YEAR]: 2,
  [SEARCH_RESULTS_COLUMN.RATING]: 2,
  [SEARCH_RESULTS_COLUMN.DESIGN]: 3,
  [SEARCH_RESULTS_COLUMN.METHOD]: 3,
  [SEARCH_RESULTS_COLUMN.METHODOLOGY]: 3,
};

const visibilityOptions = {
  [SEARCH_RESULTS_COLUMN.AUTHORS]: 'Authors',
  [SEARCH_RESULTS_COLUMN.YEAR]: 'Publish Year',
  [SEARCH_RESULTS_COLUMN.RATING]: 'Credibility Rating',
  [SEARCH_RESULTS_COLUMN.DESIGN]: 'Research Design',
  [SEARCH_RESULTS_COLUMN.METHOD]: 'SE Method',
  [SEARCH_RESULTS_COLUMN.METHODOLOGY]: 'SE Methodology',
};

const styles = {
  table: {
    borderBottom: BORDER,
  },
  headerRow: {
    display: 'flex',
    height: 'auto',
    marginBottom: '-1px',
  },
  bodyRow: {
    display: 'flex',
    height: 'auto',
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.5,
    padding: '10px 0',
    height: 'auto',
    minHeight: '48px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  sortBy: {
    fontSize: '14px',
  },
};

const Label = styled.span`
  font-weight: bold;
  line-height: 24px;
  margin-right: 10px;
  height: 24px;
`;

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onChangeSortBy = this.onChangeSortBy.bind(this);
  }

  onPaginationChange(page) {
    this.props.actions.fetchArticles({
      ...this.props.search.query,
      page,
    });
  }

  onChangeVisibility(values) {
    const columns = _.keys(_.pickBy(
      visibilityOptions, item => values.includes(item),
    ));

    this.props.actions.setVisibleColumns(columns);
  }

  onChangeSortBy(key) {
    this.props.actions.sortSearchResultsBy(key, this.props.search.query);
  }

  renderVisibility() {
    const { search: { visibility } } = this.props;

    const Container = styled.div`
      margin-right: -25px;
      flex: 1;
      display: flex;
      align-items: center;
    `;

    const values = _.values(_.pick(visibilityOptions, _.keys(_.pickBy(visibility))));

    return (
      <Container>
        <Label>Visible Columns: </Label>
        <SelectField
          multiple
          value={values}
          hintText="Select visible columns"
          onChange={(e, key, values) => this.onChangeVisibility(values)}
        >
          {_.toPairs(visibilityOptions).map(([key, value]) => (
            <MenuItem
              key={key}
              insetChildren
              checked={visibility[key]}
              value={value}
              primaryText={value}
            />
          ))}
        </SelectField>
      </Container>
    );
  }

  renderSettings() {
    const Container = styled.div`
      padding-bottom: 20px;
      border-bottom: ${BORDER};
    `;

    const Content = styled.div`
      display: flex;
      align-items: center;
    `;

    return (
      <Container>
        <ModuleTitle>Search Results</ModuleTitle>
        <Content>
          {this.renderVisibility()}
        </Content>
      </Container>
    );
  }

  renderItems() {
    const { search: { items, visibility } } = this.props;

    return items.map((item) => {
      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          {_.values(SEARCH_RESULTS_COLUMN).map(key => (
            TableRowColumn({
              key,
              value: item[key],
              flex: flexOptions[key],
              visibility: visibility[key],
              forceShow: key === SEARCH_RESULTS_COLUMN.TITLE,
              justifyContent: [
                SEARCH_RESULTS_COLUMN.YEAR, SEARCH_RESULTS_COLUMN.RATING,
              ].includes(key) && 'center',
            })
          ))}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    const { search: { visibility, query: { sortBy } } } = this.props;
    const { palette } = muiTheme;

    const Label = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      color: ${props => props.highlight && palette.accent1Color || palette.accent3Color}
    `;
    const Operations = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const ArrowDropUp = styled(NavigationArrowDropUp)`
      color: ${palette.accent3Color} !important;
      margin-bottom: -8px;
    `;
    const HighlightArrowDropUp = ArrowDropUp.extend`
      color: ${palette.accent1Color} !important;
    `;
    const ArrowDropDown = styled(NavigationArrowDropDown)`
      color: ${palette.accent3Color} !important;
      margin-top: -8px;
    `;
    const HighlightArrowDropDown = ArrowDropDown.extend`
      color: ${palette.accent1Color} !important;
    `;

    const CustomizedHeaderColumn = ({ key, label, ...rest }) => {
      const shouldHighlight = sortBy.key === key;

      return TableHeaderColumn({
        flex: flexOptions[key],
        visibility: visibility[key],
        label: (
          <Label
            onClick={() => this.onChangeSortBy(key)}
            highlight={shouldHighlight}
          >
            {label}
            <Operations>
              {shouldHighlight && sortBy.order === SORT_BY_METHOD.ASC ?
                <HighlightArrowDropUp /> : <ArrowDropUp />
              }
              {shouldHighlight && sortBy.order === SORT_BY_METHOD.DESC ?
                <HighlightArrowDropDown /> : <ArrowDropDown />
              }
            </Operations>
          </Label>
        ),
        ...rest,
      });
    };

    return (
      <Table selectable={false} style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow
            style={{
              ...styles.headerRow,
            }}
          >
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.TITLE,
              label: 'Title',
              forceShow: true,
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.AUTHORS,
              label: 'Authors',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.YEAR,
              label: 'Publish Year',
              justifyContent: 'center',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.RATING,
              label: 'Credibility Rating (0-5)',
              justifyContent: 'center',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.DESIGN,
              label: 'Research Design',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.METHOD,
              label: 'SE Method',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.METHODOLOGY,
              label: 'SE Methodology',
            })}
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {this.renderItems()}
        </TableBody>
      </Table>
    );
  }

  renderPagination() {
    const { search: { query, total } } = this.props;
    const Div = styled.div`
      margin-top: 25px;
    `;

    return (total &&
      <Div>
        <Pagination
          currentPage={query.page}
          totalPages={Math.ceil(total / query.limit)}
          onChange={this.onPaginationChange}
        />
      </Div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSettings()}
        {this.renderSearchResults()}
        {this.renderPagination()}
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
)(SearchResult);
