import React from 'react';
import { useState } from 'react'
import styled from 'styled-components';

const Button = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${(p) => p.theme.font.size.xxs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border: 0;
  background-color: ${(p) => p.theme.colors.primary.main};
  margin-bottom: 15px;
  &:hover {
    border-color: ${(p) => p.theme.colors.border.dark};
  }
  &:disabled{
    background: gray;
    cursor: text;
  }
`;

const Input = styled.input`
  height: 40px;
  min-width: 300px;
  display: block;
  background: #e5e5e5;
  border: none;
  outline: none;
`;

const ModalBody = styled.div`
  border-radius: 5px;
  background: white;
  z-index: 99;
  padding: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.sm};
`

const Cancel = styled.button`
  background: none;
  border: none;
  cursor: pointer
`
const Text = styled.div`

`

/**
 * Team create
 */
const TeamCreate = ({ onSubmit, onCancel }) => {
  const [fullname, setFullname] = useState("");
  const [teamname, setTeamname] = useState("");


  const changeTeamname = (evt) => {
    setTeamname(evt.target.value);
  }

  const changeFullname = (evt) => {
    setFullname(evt.target.value);
  }

  const handleCreate = () => {
    onSubmit({ fullname, teamname })
  }

  const handleCancel = () => {
    onCancel();
  }

  return (
    <ModalBody>
      <Text>Team name</Text>
      <Input value={teamname} onChange={changeTeamname} />
      <br />
      <Text>Full name</Text>
      <Input value={fullname} onChange={changeFullname} />
      <br />
      <Button onClick={handleCreate}
        disabled={[teamname.trim(), fullname.trim()].includes("")}
      >
        Tạo đội bóng
      </Button>
      <Cancel onClick={handleCancel}>Hủy</Cancel>
    </ModalBody>
  );
};

export default TeamCreate;
