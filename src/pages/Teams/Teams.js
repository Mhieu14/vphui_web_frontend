import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { Container } from 'components/Layout';
import { useQuery } from '@apollo/client';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Head from 'components/Head';
import TeamsCard from './TeamCards';
import { GET_AUTH_USER } from 'graphql/user';




const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`;

/**
 * Teams
 */
const Teams = () => {

  useEffect( () => {
    getTeams()
  }, [teams])
  const token = localStorage.getItem('token');
  
  // let [userid, setUserid] = useState('')
  let [teams, setTeams] = useState([])
  // const getUserId = () => {
  //   axios({method: "get",
  //   url: "",
  //   headers: { "Authorization": `${token}`
  //   }})
  // .then(res => {
  //   setTeams(res.data.data);
  // })
  // const { userid } = useQuery(GET_AUTH_USER, {
  //   variables: {id}
  // });
  const {id} = useQuery(GET_AUTH_USER);
  const getTeams = () => {
    axios({method: "get",
    url: `http://localhost:3001/api/team/getListTeamsUser?user_id=${id}`,
    headers: { "Authorization": `${token}`
    }})
  .then(res => {
    setTeams(res.data.data);
  })
  }
  
  const renderContent = () => {
  
    if (!teams.length > 0) return <Empty text="No Team yet." />
  // axios.get(`http://localhost:4000/graphql`)
  // .then(res => {
  //   let userid = res.data.getAuthUser.id;
  //   setUserid(userid);
  // })
  
  
  
    
    ;

    return (
      <InfiniteScroll
        data={teams}  
      >
        {(data) => {
          

          return (
            <Fragment>
              <TeamsContainer>
                {data.map((team) => (
                  <TeamsCard key={team.id} team={team.fullname} role = {team.role} />
                ))}
              </TeamsContainer>

              
            </Fragment>
          );
        }}
      </InfiniteScroll>
    );
  };
  
  return (
    <Root maxWidth="md">
      <Head title="Find new People" />

      {renderContent()}
    </Root>
  );
};

export default Teams;
