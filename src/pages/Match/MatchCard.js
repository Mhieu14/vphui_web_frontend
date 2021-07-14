import React, { Fragment } from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import Modal from 'components/Modal';
import MatchDetail from './MatchDetail';
import { useStore } from 'store';
import { splitTime } from 'utils/date';
import { CloseIcon } from 'components/icons';


const List = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
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

const Flex = styled.div`
  display: flex;
//   justify-content: space-between;

  &.flex-end{
      justify-content: flex-end;
  }
  &.space-between{
    justify-content: space-between;
  }
`
const FlexItem = styled.div`
  align-self: center;

  &.col1{
    width: 35%;
    text-align: right;
  }
  &.col2{
    width: 30%;
    text-align: center
  }
  &.col3{
    width: 35%;
    text-align: left;
  }
  &.ml-xs{
    margin-left: 5px;
  }
  &.mr-xs{
    margin-right: 5px;
  }
  &.pl-xs{
    padding-left: 20px;
    font-size: 40px;
    font-weight: bold;
  }
  &.pr-xs{
    padding-right: 20px;
    font-size: 40px;
    font-weight: bold;
  }
`;

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const InitialLetters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.font.size.lg};
  background-color: ${(p) => p.color};
`;


const Fullname = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
`
const Teamname = styled.div`
  font-size: 12px;
  padding: 0px 5px;
`;


const StatusCancel = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: red;
  color: white;
  font-weight: bold;
`;


const MatchCard = ({ match, reload = () => { } }) => {
  // const [{ auth }] = useStore();
  const {
    timeStart,
    status,
    teamA,
    teamB,
    teamAGoalUpdateByA,
    teamBGoalUpdateByA,
    teamAGoalUpdateByB,
    teamBGoalUpdateByB,
    isAdmin
  } = match || {};
  const [year, month, date, hour, minute] = splitTime(timeStart);

  const [aDisplay, bDisplay] = getGoalsDisplay(
    teamAGoalUpdateByA,
    teamBGoalUpdateByA,
    teamAGoalUpdateByB,
    teamBGoalUpdateByB,
    status
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(true);
  }

  const handleClose = (p) => {
    if (p > 0) reload();
    setIsOpen(false);
  }

  const renderByStatus = () => {
    switch (status) {
      case 'finished': return <h2>VS</h2>;
      case 'cancelled': return (
        <StatusCancel>
          {/* <CloseIcon color="white" /> */}
          cancelled
        </StatusCancel>
      )
      default: return (
        <Fragment>
          <div><b style={{ color: 'green' }}>{date}/{month}/{year}</b></div>
          <div style={{ color: 'green' }}>{hour}:{minute}</div>
        </Fragment>
      )
    }
  }

  return (
    <Fragment>
      <List>
        <Item onClick={toggleModal}>
          <Flex>
            <FlexItem className="col1">
              <Flex className="flex-end">
                <FlexItem className="mr-xs">
                  <Fullname>{teamA.fullname}</Fullname>
                  <Teamname>@{teamA.teamname}</Teamname>
                </FlexItem>
                <FlexItem>
                  <RenderInitialLetters text={teamA.fullname} />
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem className="col2">
              <Flex className="space-between">
                <FlexItem className="pl-xs">{aDisplay}</FlexItem>
                <FlexItem>
                  {renderByStatus()}
                </FlexItem>
                <FlexItem className="pr-xs">{bDisplay}</FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem className="col3">
              <Flex>
                <FlexItem>
                  <RenderInitialLetters text={teamB.fullname} />
                </FlexItem>
                <FlexItem className="ml-xs">
                  <Fullname>{teamB.fullname}</Fullname>
                  <Teamname>@{teamB.teamname}</Teamname>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </Item>
      </List>
      <Modal open={isOpen} onClose={() => { }}>
        <MatchDetail match={match} matchup={{}} teamList={[]} onClose={handleClose} />
      </Modal>
    </Fragment>
  )
};


/**
 * aa: goal A update by A
 * ba: goal B update by A
 * ab: goal A update by B
 * bb: goal B update by B
 */
const getGoalsDisplay = (aa, ba, ab, bb, status) => {
  if (status !== 'finished') return ["", ""];

  const getValidValue = (a, b) => {
    if (a === b) {
      if (a == undefined) return "?";
      return a;
    } else {
      if (![a, b].includes(undefined)) return "?";
      if (a === undefined) return b;
      return a
    }
  }
  const goalA = getValidValue(aa, ab);
  const goalB = getValidValue(ba, bb);
  return [goalA, goalB];
}

const RenderInitialLetters = ({ text = " " }) => {
  const idColor = text.length % 7;
  const color = COLOR_MAPPING[idColor];

  // If a fullName contains more word than two, take first two word
  const splitWords = text.split(' ').slice(0, 2).join(' ');
  // Take only first letters from split words
  const firstLetters = splitWords
    .split(' ')
    .map((a) => a.charAt(0))
    .join(' ');

  return (
    <ImageContainer>
      {<InitialLetters color={color}>{firstLetters}</InitialLetters>}
    </ImageContainer>
  )
}

const COLOR_MAPPING = {
  0: 'red',
  1: 'orange',
  2: 'pink',
  3: 'green',
  4: 'blue',
  5: 'indigo',
  6: 'violet'
}

export default MatchCard;
