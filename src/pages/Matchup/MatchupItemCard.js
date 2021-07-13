import React, { Fragment } from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import Modal from 'components/Modal';
import MatchupDetail from './MatchupDetail';


const List = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
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
  margin: 10px 0px;
`
const LI = styled.li`
  color: ${(p) => p.theme.colors.error.main};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`


/**
 * Matchup item
 */
const MatchupMyself = ({ matchup, teamList, reload = () => { } }) => {
  // const [{ auth }] = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const { _id, description, stadium, teamCreate, timeStart, attentions } = matchup || {};
  const attentionCount = attentions?.length || 0;

  const selectMatchup = () => {
    setIsOpen(true);
  }

  const toggleModal = (evt) => {
    console.log("evt", evt)
    if (evt > 1) reload();
    setIsOpen(false);
  }

  console.log("run???")

  return (
    <Fragment>
      <List key={_id}>
        <Item onClick={selectMatchup}>
          <b>{description}</b>
          <Flex>
            <div>
              <UL>
                <li>{timeStart}</li>
                <li>@{teamCreate.teamname} - {teamCreate.fullname}</li>
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

export default MatchupMyself;
