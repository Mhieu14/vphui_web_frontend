import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import MemberCard from './MemberCard';
import InviteMember from './InviteMember';
import { sendPost } from 'utils/request';

const PeopleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`;

const SearchContainer = styled.div`
  display: none;
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  max-width: 250px;

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    display: block;
  }
`;


const Root = styled.div`
  width: 100%;
`;


const MemberList = ({ user, teamname, memberList, isAdmin, reloadTeamInfo }) => {

    const emitUserSelected = (userSelected) => {
        const url = 'member/add';
        const data = {
            teamname,
            username: userSelected.username,
        }
        sendPost(url, null, data).then(rs => {
            reloadTeamInfo();
        })
    }

    const removeUser = (userSelected) =>{
        const url = 'member/remove';
        const data = {
            teamname,
            username: userSelected.username
        }
        sendPost(url, null, data).then(rs =>{
            reloadTeamInfo();
        })
    }

    const markAdmin = (userSelected) =>{
        const url = 'member/markAdmin';
        const data = {
            teamname,
            member_id: userSelected.member_id,
        }
        sendPost(url, null, data).then(rs =>{
            reloadTeamInfo();
        })
    }

    return (
        <Root>
            {isAdmin
            &&
            <SearchContainer>
                <InviteMember
                    memberList={memberList}
                    backgroundColor="white"
                    forMessage
                    placeholder=" Thêm thành viên"
                    emitUserSelected={emitUserSelected}
                />
            </SearchContainer>
            }
            <br/>
            <PeopleContainer>
                {memberList.map((u) => (
                    <MemberCard key={u.user_id} user={u} isAdmin={isAdmin} markAdmin={markAdmin} removeUser={removeUser} />
                ))}
            </PeopleContainer>
        </Root>
    )
};

export default MemberList;
