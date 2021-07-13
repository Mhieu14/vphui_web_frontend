import React from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'components/Form';

// const Button = styled.button`
//   height: 27px;
//   cursor: pointer;
//   outline: none;
//   font-size: ${(p) => p.theme.font.size.xxs};
//   font-weight: ${(p) => p.theme.font.weight.bold};
//   transition: background-color 0.2s, border-color 0.1s;
//   border-radius: ${(p) => p.theme.radius.sm};
//   color: ${(p) => p.theme.colors.white};
//   padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
//   border: 0;
//   background-color: ${(p) => p.theme.colors.primary.main};
//   margin-bottom: 15px;
//   &:hover {
//     border-color: ${(p) => p.theme.colors.border.dark};
//   }
//   &:disabled{
//     background: gray;
//     cursor: text;
//   }
// `;
const InputGroup = styled.div`
  position: relative;
`

const Prefix = styled.div`
  position: absolute;
  top: 11px;
  left: 5px;
  color: gray;
`

const InputPrefix = styled.input`
  height: 40px;
  min-width: 300px;
  display: block;
  background: #e5e5e5;
  border: none;
  outline: none;
  padding: 0px 10px 0px 50px;
  margin: 5px 0px;
  border-radius: 5px;
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

const ModalBody = styled.div`
  border-radius: 5px;
  background: white;
  z-index: 99;
  padding: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.sm};
`
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  transition: color 0.1s;
  display: inline-block;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
  font-weight: ${(p) => (p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal)};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.xs)};
  max-width: 200px;
  font-weight: ${(p) => p.theme.font.weight.bold};
`

/**
 * Team create
 */
const TeamCreate = ({ onSubmit, onCancel }) => {
  const [fullname, setFullname] = useState("");
  const [teamname, setTeamname] = useState("");


  const changeTeamname = (evt) => {
    const newValue = evt.target.value.replaceAll(' ', '');
    setTeamname(newValue);
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
      <InputGroup>
        <Prefix>team_</Prefix>
        <InputPrefix value={teamname} onChange={changeTeamname} />
      </InputGroup>

      <br />
      <Text>Full name</Text>
      <Input value={fullname} onChange={changeFullname} />
      <br />
      <Buttons>
        <Button onClick={handleCreate}
          disabled={[teamname.trim(), fullname.trim()].includes("")}
        >
          Tạo đội bóng
        </Button>
        <Button text onClick={handleCancel}>Hủy</Button>
      </Buttons>
    </ModalBody>
  );
};

export default TeamCreate;
