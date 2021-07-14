import React, { Fragment } from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import Modal from 'components/Modal';
import MatchupDetail from './MatchupDetail';
import { useStore } from 'store';
import { splitTime } from 'utils/date';

const List = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
  border-left: 5px solid gray;
  margin: 15px 0px;
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  cursor: pointer;
  width: 100%;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  font-size: ${(p) => p.theme.font.size.xxs};
  background-color: ${(p) => p.theme.colors.white};
  &:hover{
    background: ${(p) => p.theme.colors.grey[300]};
  }
  &:last-child {
    border-bottom: 0;
  }
`;

const UL = styled.ul`
  padding: 0px 20px;
  margin: 10px 0px 0px;
  & li{
    margin: 3px 0px;
  }
`
const LI = styled.li`
  color: ${(p) => p.theme.colors.error.main};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`
const B = styled.b`
  font-size: 15px;
`


/**
 * Matchup item
 */
const MatchupItemCard = ({ matchup, teamList = [], reload = () => { } }) => {
  const [{ auth }] = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const { _id, description, stadium, teamCreate, timeStart, attentions } = matchup || {};
  const [year, month, date, hour, minute] = splitTime(timeStart);
  const attentionCount = attentions?.length || 0;
  const teamIds = teamList.map(i => i.id);

  let styleCustom = {};
  // if (matchup.userCreate === auth.user.id || matchup.is_my_team_admin_matchup) {
  if (matchup.is_my_team_admin_matchup) {
    styleCustom = { borderLeftColor: 'green' };
  } else {
    if (teamIds.includes(matchup.teamCreate._id)) {
      styleCustom = { borderLeftColor: 'orange' };
    }
    else {
      const isAttention = matchup.attentions.some(item => teamIds.includes(item.teamCreate._id));
      if (isAttention) styleCustom = { borderLeftColor: 'orange' };
    }
  }

  const selectMatchup = () => {
    setIsOpen(true);
  }

  const toggleModal = (evt) => {
    if (evt > 1) reload();
    setIsOpen(false);
  }

  return (
    <Fragment>
      <List key={_id} style={{ ...styleCustom }}>
        <Item onClick={selectMatchup}>
          <B>{description}</B>
          <Flex>
            <div>
              <UL>
                <li>{date}/{month}/{year} {hour}:{minute} </li>
                <li>@{teamCreate.teamname}</li>
                <li>{stadium?.name} </li>
              </UL>
            </div>

            <div>
              <UL>
                {attentionCount > 0
                  ?
                  <LI>Attentions: {attentionCount}</LI>
                  :
                  <li>Attentions: {attentionCount}</li>
                }
              </UL>
            </div>
          </Flex>
        </Item>
      </List>
      <Modal open={isOpen} onClose={() => { }}>
        <MatchupDetail matchup={matchup} teamList={teamList} onClose={toggleModal} />
      </Modal>
    </Fragment>
  )
};


export default MatchupItemCard;
