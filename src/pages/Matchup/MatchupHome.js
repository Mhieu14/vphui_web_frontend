import React, { Fragment } from 'react';
import styled from 'styled-components';
import Head from 'components/Head';
import { A } from 'components/Text';
import * as Routes from 'routes';
import { Switch, Route, generatePath } from 'react-router-dom';
import { Container, Content } from 'components/Layout';
import MatchupAttention from './MatchupAttention';
import MatchupSuggest from './MatchupSuggest';
import MatchupMyself from './MatchupMyself';



const Root = styled(Container)`
    margin-top: ${(p) => p.theme.spacing.lg};
    min-height: 500px;
    @media (min-width: ${(p) => p.theme.screen.lg}) {
      margin-left: ${(p) => p.theme.spacing.lg};
      padding: 0;
    }
  `;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.xs};
  margin-top: ${(p) => p.theme.spacing.sm};
`;

const List = styled.div`
  padding: 0 ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.grey[800]};
  white-space: nowrap;
  cursor: pointer;
  &:hover{
    color: blue;
  }
  & a{
    font-weight: bold;
  }
  &.active a{
    color: blue;
  }
  @media (min-width: ${(p) => p.theme.screen.md}) {
    padding: 0 ${(p) => p.theme.spacing.lg};
  }
`;
const HR = styled.div` 
  border-top: 1px solid #cccccc;
  margin-top: 10px;
`
/**
 * Stadiums
 */
const MatchupHome = ({ location }) => {
  const { pathname } = location;
  const { MATCHUPHOME, MATCHUP_ATTENTION, MATCHUP_SUGGEST } = Routes;

  const renderContent = () => {
    return (
      <Fragment>
        <Info>
          <List className={pathname === MATCHUPHOME && 'active'}>
            <A to={generatePath(MATCHUPHOME)}>Kèo của tôi</A>
          </List>
          <List className={pathname === MATCHUP_ATTENTION && 'active'}>
            <A to={generatePath(MATCHUP_ATTENTION)}>Kèo đang quan tâm</A>
          </List>
          <List className={pathname === MATCHUP_SUGGEST && 'active'}>
            <A to={generatePath(MATCHUP_SUGGEST)}>Đề xuất cho bạn</A>
          </List>
        </Info>
        <HR />

        <Switch>
          <Route exact path={Routes.MATCHUPHOME} component={MatchupMyself} />
          <Route exact path={Routes.MATCHUP_ATTENTION} component={MatchupAttention} />
          <Route exact path={Routes.MATCHUP_SUGGEST} component={MatchupSuggest} />
        </Switch>
      </Fragment>
    );
  };

  return (
    <Content>
      {/* <Root maxWidth="md"> */}
      <Head title="Find new Matchup" />
      {renderContent()}
      {/* </Root> */}
    </Content>
  );
};

export default MatchupHome;
