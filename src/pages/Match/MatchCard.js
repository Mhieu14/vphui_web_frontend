import React, { Fragment } from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import Modal from 'components/Modal';
import MatchDetail from './MatchDetail';
import { useStore } from 'store';
import { splitTime } from 'utils/date';


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


const MatchCard = ({ match, reload = () => { } }) => {
    const [{ auth }] = useStore();
    const { status, teamA, teamB, stadium, timeStart } = match;
    const [year, month, date, hour, minute] = splitTime(timeStart);

    console.log("match", match)
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
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
                            <b>{date}/{month}/{year}</b>
                            <div>{hour}:{minute}</div>
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
            <Modal open={isOpen} onClose={toggleModal}>
                {/* <MatchupDetail matchup={matchup} teamList={teamList} onClose={toggleModal} /> */}
                model
            </Modal>
        </Fragment>
    )
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

const COLOR_MAPPING = {
    0: 'red',
    1: 'orange',
    2: 'yellow',
    3: 'green',
    4: 'blue',
    5: 'indigo',
    6: 'violet'
}

export default MatchCard;
