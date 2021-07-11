import React, { useState, useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loading } from 'components/Loading';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

import { useClickOutside } from 'hooks/useClickOutside';
import { useDebounce } from 'hooks/useDebounce';

import { SEARCH_USERS } from 'graphql/user';

const StyledLoading = styled(Loading)`
  position: absolute;
  top: 14px;
  right: 16px;
`;

/**
 * Renders search input
 */
const Search = ({ hideIcon, forMessage, backgroundColor, placeholder, autoFocus, memberList, emitUserSelected, ...others }) => {
  const client = useApolloClient();
  const memberIdList = memberList.map(member => member.user_id);

  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Close search result on click outside
  const inputRef = useRef(null);
  useClickOutside(inputRef, () => setIsOpenSearchResult(false));

  // Debounce search query value
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const search = async () => {
      const { data } = await client.query({
        query: SEARCH_USERS,
        variables: { searchQuery: debounceSearchQuery },
      });
      const dataResult = data.searchUsers.filter(item => !memberIdList.includes(item.id));

      setUsers(dataResult);
      setLoading(false);

      const openSearchResult = debounceSearchQuery !== '';
      setIsOpenSearchResult(openSearchResult);
    };

    debounceSearchQuery ? search() : setIsOpenSearchResult(false);

    return () => setLoading(false);
  }, [debounceSearchQuery, client]);

  const handleInputChange = async (e) => {
    // Trim white space only from beginning
    const value = e.target.value.replace(/^\s+/g, '');
    setSearchQuery(value);
    if (value) {
      setLoading(true);
    }
  };

  const handleInputFocus = () => searchQuery && setIsOpenSearchResult(true);

  return (
    <SearchInput
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      value={searchQuery}
      inputRef={inputRef}
      placeholder={placeholder}
      hideIcon={hideIcon}
      backgroundColor={backgroundColor}
      autoFocus={autoFocus}
      {...others}
    >
      {loading && <StyledLoading size="xxs" />}

      {isOpenSearchResult
        &&
        <SearchResult
          users={users}
          forMessage={forMessage}
          emitUserSelected={(user) => { 
            setSearchQuery("");
            emitUserSelected(user) 
          }}
        />}
    </SearchInput>
  );
};

Search.propTypes = {
  hideIcon: PropTypes.bool,
  forMessage: PropTypes.bool,
  backgroundColor: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default Search;
