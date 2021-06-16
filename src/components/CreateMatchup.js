import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import axios from 'axios'
import { Spacing, Overlay, Container } from 'components/Layout';
import { Error } from 'components/Text';
import { Button } from 'components/Form';
import Avatar from 'components/Avatar';


import { useStore } from 'store';


const Root = styled(Container)`
  border: 0;
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.sm} 0;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin: 0 ${(p) => p.theme.spacing.xs};
  padding-left: ${(p) => p.theme.spacing.sm};
  padding-top: ${(p) => p.theme.spacing.xs};
  border: 0;
  outline: none;
  resize: none;
  transition: 0.1s ease-out;
  height: ${(p) => (p.focus ? '80px' : '40px')};
  font-size: ${(p) => p.theme.font.size.xs};
  background-color: ${(p) => p.theme.colors.grey[100]};
  border-radius: ${(p) => p.theme.radius.md};
`;

const ImagePreviewContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
  padding: ${(p) => p.theme.spacing.sm} 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

/**
 * Component for creating a post
 */
const CreateMatchup = () => {
  const [{ auth }] = useStore();
  const [description, setDescription] = useState('');
  const [stadium_id, setStadiumid] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [time_start, setTimestart] = useState('');
  const [teamname, setTeamName] = useState('')

  const handleReset = () => {
    
    setIsFocused(false);
    setDescription('');
    setStadiumid('');
    setTeamName('');
    setTimestart('');
  };

  const handleOnFocus = () => setIsFocused(true);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleTimestart = (e) => setTimestart(e.target.value);
  const handleStadiumid = (e) => setStadiumid(e.target.value)
  const handleTeamname = (e) => setTeamName(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description,
      time_start,
      stadium_id,
      teamname
    };
    try {
      const result = await axios({
      method: "post",
      url: "http://localhost:3001/api/matchup/create",
      data: data,
      headers: { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzQ2ODQ2Njg4YzM4MjkwOTAyMDgxNyIsImZ1bGxOYW1lIjoiQnVpIE1pbmggSGlldSIsImVtYWlsIjoiYnVpbWluaGhpZXVubzVAZ21haWwuY29tIiwiaWF0IjoxNjIzODIxMzEwLCJleHAiOjE2NTUzNzg5MTB9.zycct5P4s3yHhQaPL2Kd9UBi60jTSfDRdGrlBC_SjXI", "Content-Type" : "application/json"
      },
      })
      handleReset();
      console.log(result);
    } catch(error) {
      console.log(error)
    }
      
      
      console.log(data)
  };
  const isShareDisabled = !stadium_id || !teamname || !time_start || !description;

  return (
    <>
      {isFocused && <Overlay onClick={handleReset} />}

      <Root zIndex={isFocused ? 'md' : 'xs'} color="white" radius="sm" padding="sm">
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <Avatar image={auth.user.image} size={40} />
            
            <Textarea
              type="textarea"
              name="description"
              focus={isFocused}
              onFocus={handleOnFocus}
              placeholder="Description"
              value={description}
              onChange={handleDescription}
            />
            <Textarea
              type="time"
              name="time"
              focus={isFocused}
              onFocus={handleOnFocus}
              placeholder="Time start"
              value={time_start}
              onChange={handleTimestart}
            />
            <Textarea
              type="textarea"
              name="stadium"
              focus={isFocused}
              onFocus={handleOnFocus}
              placeholder="Stadium"
              value={stadium_id}
              onChange={handleStadiumid}
            />
            <Textarea
              type="textarea"
              name="teamname"
              focus={isFocused}
              onFocus={handleOnFocus}
              placeholder="Team name"
              value={teamname}
              onChange={handleTeamname}
            />
        
          </Wrapper>

          

          {isFocused && (
            <Options>
              <Buttons>
                <Button text type="button" onClick={handleReset}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isShareDisabled} >
                  Create Match up
                </Button>
              </Buttons>
            </Options>
          )}
          
        </form>
      </Root>
    </>
  );
};

export default CreateMatchup;
