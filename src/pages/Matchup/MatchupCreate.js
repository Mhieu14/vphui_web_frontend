import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { Container } from 'components/Layout';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Head from 'components/Head';
import StadiumsCard from './StadiumsCard';
import CreateMatchup from 'components/CreateMatchup';
import { A } from 'components/Text';
import * as Routes from 'routes';
import { Switch, Route, generatePath } from 'react-router-dom';

import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit';
import { sendGet, sendPost } from 'utils/request';
import { useStore } from 'store';
import { Button } from 'components/Form';



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
  &.active{
    color: blue;
  }
  @media (min-width: ${(p) => p.theme.screen.md}) {
    padding: 0 ${(p) => p.theme.spacing.lg};
  }
`;

const ModalBody = styled.div`
  border-radius: 5px;
  background: white;
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.sm};
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  transition: color 0.1s;
  display: block;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
  font-weight: ${(p) => (p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal)};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.xs)};
  max-width: 200px;
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin: 15px 0px 10px;
`

const Input = styled.input`
  height: 40px;
  min-width: 300px;
  display: block;
  background: #e5e5e5;
  border: none;
  outline: none;
  padding: 0px 10px;
  margin: 5px 0px;
  border-radius: 5px;
`;

const InputArea = styled.textarea`
//   height: 40px;
  min-width: 300px;
  display: block;
  background: #e5e5e5;
  border: none;
  outline: none;
  padding: 0px 10px;
  margin: 5px 0px;
  border-radius: 5px;
`;


const Select = styled.select`
  height: 40px;
  width: 300px;
  display: block;
  background: #e5e5e5;
  border: none;
  outline: none;
  padding: 3px 10px;
  margin: 5px 0px;
  border-radius: 5px;
`;

const Option = styled.option`
 
`


/**
 * Form Matchup Create
 */
const MatchupCreate = ({ teamList = [], onReload, onCancel }) => {
    const [{ auth }] = useStore();
    const teamListSelectable = teamList.filter(i => i.role === 'admin');
    const [stadiumList, setStadiumList] = useState([]);
    const [teamname, setTeamname] = useState("");
    const [stadiumId, setStadiumId] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        sendGet('stadium/getAll').then(rs => {
            setStadiumList(rs?.data?.data || [])
        })
    }, [])

    const handleCreate = () => {
        const url = "matchup/create";
        let [date, time] = timeStart.split('T');
        const data = {
            teamname,
            stadium_id: stadiumId,
            time_start: `${date} ${time}:00`,
            description,
        }
        sendPost(url, null, data)
            .then(rs => {
                console.log("rs create", rs)
                onReload();
            })
            .catch(err => {
                console.log("err create", err)
            })

    }

    const handleCancel = () => {
        onCancel();
    }

    const handleChangeTeam = (evt) => {
        setTeamname(evt.target.value);
    }

    const handleChangeStadium = (evt) => {
        setStadiumId(evt.target.value);
    }

    const handleChangeTimeStart = (evt) => {
        setTimeStart(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const renderContent = () => {
        return (
            <ModalBody>
                <Text>Team</Text>
                <Select value={teamname} onChange={handleChangeTeam}>
                    <option value="" hidden></option>
                    {teamListSelectable.map(item =>
                        <option key={item.id} value={item.teamname}>{item.fullname}</option>
                    )}
                </Select>

                <Text>Stadium</Text>
                <Select value={stadiumId} onChange={handleChangeStadium}>
                    <option value="" hidden></option>
                    {stadiumList.map(item =>
                        <option key={item._id} value={item._id}>{item.name}</option>
                    )}
                </Select>

                <Text>Time start</Text>
                <Input type="datetime-local" value={timeStart} onChange={handleChangeTimeStart} />

                <Text>Description</Text>
                <InputArea rows={5} value={description} onChange={handleChangeDescription} />
                <br />
                <Buttons>
                    <Button onClick={handleCreate}
                        disabled={
                            [
                                teamname,
                                stadiumId,
                                timeStart,
                                description.trim(),
                            ].includes("")
                        }
                    >
                        Lập kèo
                    </Button>
                    <Button text onClick={handleCancel}>Hủy</Button>
                </Buttons>
            </ModalBody>
        );
    };

    return (
        <Root maxWidth="md">
            {/* <CreateMatchup /> */}
            <Head title="Find new Stadiums" />
            {renderContent()}
        </Root>
    );
};

export default MatchupCreate;
