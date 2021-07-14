import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
// import Empty from 'components/Empty';
import { A } from 'components/Text';
import { Button } from 'components/Form';
// import { useStore } from 'store';
// import Modal from 'components/Modal';
import { CloseIcon } from 'components/icons';
import { sendPost, sendGet } from 'utils/request';
import { splitTime } from 'utils/date';
import { Spacing } from 'components/Layout';


const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBody = styled.div`
  min-width: 800px;
  border-radius: 5px;
  background: white;
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px;
  margin: 0px;
`
const WrapIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(p) => p.theme.colors.grey[200]};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  min-width: 500px;
  & caption{
    font-weight: bold;
    margin: 30px 0px 5px 10px;
    text-align: left;
  }

`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  &.goal{
    color: green;
    font-weight: bold;
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const Title = styled.div`
  background: #ccc;
  text-align: center;
  padding: 15px 10px;
  font-weight: bold;
  border-radius: 5px 5px 0px 0px;
`;

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
  width: 100%;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  font-size: ${(p) => p.theme.font.size.xxs};
  background-color: #f3f3f3;
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
const InputGoals = styled.input`
  height: 40px;
  width: 100px;
  background: #e5e5e5;
  border: none;
  outline: none;
  padding: 0px 10px;
  margin: 5px 0px;
  border-radius: 5px;
  text-align: center;
`;

const StatusCancel = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: red;
  color: white;
  font-weight: bold;
`;



const MatchDetail = ({ match, onClose = () => { } }) => {
  // const [{ auth }] = useStore();
  const [newMatch, setNewMatch] = useState(match);
  const { _id,
    stadium,
    timeStart,
    status,
    teamA,
    teamB,
    teamAGoalUpdateByA,
    teamBGoalUpdateByA,
    teamAGoalUpdateByB,
    teamBGoalUpdateByB,
    is_admin
  } = newMatch || {};
  const [year, month, date, hour, minute] = splitTime(timeStart);
  const [goalsA, setGoalsA] = useState("");
  const [goalsB, setGoalsB] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [callRequestCount, setCallRequestCount] = useState(0);
  const [aDisplay, bDisplay] = getGoalsDisplay(
    teamAGoalUpdateByA,
    teamBGoalUpdateByA,
    teamAGoalUpdateByB,
    teamBGoalUpdateByB,
    status
  );

  useEffect(() => {
    getDetailMatch();
  }, [])

  const getDetailMatch = () => {
    sendGet('match/detail', { match_id: match._id }).then(rs => {
      setNewMatch(rs?.data?.data || {});
    })
  }
  const callRequestUpdateMatch = (isCancel = false) => {
    const url = 'match/updateMatchResult';
    let data = {
      match_id: _id,
      total_goals_a: goalsA,
      total_goals_b: goalsB,
      isCancel,
    }

    sendPost(url, null, data)
      .then(rs => {
        getDetailMatch();
        setIsModify(false);
        setCallRequestCount(callRequestCount + 1);
      })
      .catch(err => {
        alert("error")
      })
  }

  const updateMatch = () => {
    callRequestUpdateMatch(false);
  }

  const cancelMatch = () => {
    callRequestUpdateMatch(true);

  }

  const changeGoalsA = (evt) => {
    const newValue = formatNumber(evt.target.value);
    setGoalsA(newValue);

  }

  const changeGoalsB = (evt) => {
    const newValue = formatNumber(evt.target.value);
    setGoalsB(newValue);
  }

  const formatNumber = (value) => {
    let valueFormatted = Number(value);
    if (isNaN(valueFormatted)) {
      valueFormatted = 0;
    }
    return valueFormatted;
  }

  const toggleModify = () => {
    setIsModify(!isModify);
  }

  const cancelModify = () => {
    setIsModify(false);
    setGoalsA("");
    setGoalsB("");
  }

  const handleClose = () => {
    onClose(callRequestCount);
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
    <ModalBody>
      <Title>Chi tiết trận đấu</Title>
      <WrapIcon onClick={handleClose} >
        <CloseIcon />
      </WrapIcon>

      <List>
        <Item>
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

      {(is_admin && !isModify)
        &&
        <Buttons>
          <Button onClick={toggleModify}>Cập nhật điểm</Button>
          <Button onClick={cancelMatch}>Hủy trận đấu</Button>
        </Buttons>
      }

      {isModify
        &&
        <Fragment>
          <Table>
            <tbody>
              <tr>
                <Th width="50%">Team</Th>
                <Th width="50%">Goals</Th>
              </tr>
              <tr>
                <Td>@{teamA.teamname}</Td>
                <Td>
                  <InputGoals type='text' maxLength={2} value={goalsA} onChange={changeGoalsA} />
                </Td>
              </tr>
              <tr>
                <Td>@{teamB.teamname}</Td>
                <Td>
                  <InputGoals type='text' maxLength={2} value={goalsB} onChange={changeGoalsB} />
                </Td>
              </tr>
            </tbody>
          </Table>
          <Buttons>
            <Button disabled={[goalsA, goalsB].includes("")} onClick={updateMatch}>Cập nhật</Button>
            <Button onClick={cancelModify}>Hủy</Button>
          </Buttons>
        </Fragment>
      }

      <Spacing top="md" />

      {!isModify
        &&
        <Fragment>
          <Table>
            <caption>Thông tin chung</caption>
            <tbody>
              <tr>
                <Th width="25%">Thời gian</Th>
                <Th width="50%">Địa điểm</Th>
                <Th width="25%">Trạng thái</Th>
              </tr>
              <tr>
                <Td>{date}/{month}/{year} {hour}:{minute}</Td>
                <Td>{stadium?.name}</Td>
                <Td>{status}</Td>
              </tr>
            </tbody>
          </Table>

          <Table>
            <caption>Thông tin nhập điểm</caption>
            <tbody>
              <tr>
                <Th width="25%">Điểm Team A</Th>
                <Th width="50%">Team nhập điểm</Th>
                <Th width="25%">Điểm Team B</Th>
              </tr>
              <tr>
                <Td className="goal">{teamAGoalUpdateByA}</Td>
                <Td>@{teamA.teamname} (A)</Td>
                <Td className="goal">{teamBGoalUpdateByA}</Td>
              </tr>
              <tr>
                <Td className="goal">{teamAGoalUpdateByB}</Td>
                <Td>@{teamB.teamname} (B)</Td>
                <Td className="goal">{teamBGoalUpdateByB}</Td>
              </tr>
            </tbody>
          </Table>

        </Fragment>

      }

      <Spacing bottom="xs" />

    </ModalBody>

  );
};


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
      if (a === undefined) return "?";
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

const COLOR_MAPPING = {
  0: 'red',
  1: 'orange',
  2: 'pink',
  3: 'green',
  4: 'blue',
  5: 'indigo',
  6: 'violet'
}

export default MatchDetail;
