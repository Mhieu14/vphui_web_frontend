import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { Container } from 'components/Layout';
import { useQuery } from '@apollo/client';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Head from 'components/Head';
import StadiumsCard from './StadiumsCard';




import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit';

import { useStore } from 'store';



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
const Stadiums = () => {
  const [{ auth }] = useStore();
  const variables = {
    userId: auth.user.id,
    skip: 0,
    limit: PEOPLE_PAGE_USERS_LIMIT,
  };
  useEffect( () => {
    getStadiums()
  }, [])

  // let [userid, setUserid] = useState('')
  let [stadiums, setStadiums] = useState([])
  const getStadiums = () => {
    axios.get('http://localhost:3001/api/stadium/getAll')
  .then(res => {
    setStadiums(res.data.data);
  })
  }
  console.log(stadiums)
  const renderContent = () => {
  
    if (!stadiums.length > 0) return <Empty text="No Stadiums yet." />
  

    return (
      <InfiniteScroll
      
        dataKey="getUsers.users"
        
        variables={variables}
        
        data={stadiums}  
      >
        {(data) => {
          

          return (
            <Fragment>
              <TeamsContainer>
                {data.map((stadium) => (
                  <StadiumsCard key={stadium._id} stadium={stadium} />
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
      <Head title="Find new Stadiums" />

      {renderContent()}
    </Root>
  );
};

export default Stadiums;
