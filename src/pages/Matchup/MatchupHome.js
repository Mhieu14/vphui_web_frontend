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
  
  
  
  
  import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit';
  
  import { useStore } from 'store';
import Matchup from '.';
  
  
  
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
   * Stadiums
   */
  const MatchupHome = () => {
    const [{ auth }] = useStore();
    const variables = {
      userId: auth.user.id,
      skip: 0,
      limit: PEOPLE_PAGE_USERS_LIMIT,
    };
    let [allMatchup, setAllMatchup] = useState([])
    useEffect( () => {
      getAllMatchup()
    }, [])
    const token = localStorage.getItem('token');
        const getAllMatchup = () =>{axios({
          method: "get",
          url: "http://localhost:3001/api/matchup/getAll",
          headers: { "Authorization":`${token}`
          }
          }).then(res => {
            setAllMatchup(res.data.data)
          })}
        console.log(allMatchup)
        
    const renderContent = () => {
    
      if (!allMatchup.length > 0) return <Empty text="No Match up yet." />
    
  
      return (
        <InfiniteScroll
        
          dataKey="getUsers.users"
          
          variables={variables}
          
          data={allMatchup}  
        >
          {(data) => {
            
  
            return (
              <Fragment>
                <TeamsContainer>
                  {data.map((matchup) => (
                    <StadiumsCard key={matchup._id} description={matchup.description} teamname={matchup.teamname} time_start={matchup.timeStart} />
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
        <CreateMatchup />
        <Head title="Find new Stadiums" />
  
        {renderContent()}
      </Root>
    );
  };
  
  export default MatchupHome;
