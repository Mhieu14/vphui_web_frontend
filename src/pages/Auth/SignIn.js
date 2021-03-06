import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { A } from 'components/Text';
import { Spacing } from 'components/Layout';
import { Error } from 'components/Text';
import { InputText, Button } from 'components/Form';

import { SIGN_IN } from 'graphql/user';

import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.sm};
`;

const InputContainer = styled(Spacing)`
  width: 100%;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 1px;
`;

const ForgotPassword = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.white};
`;

/**
 * Sign In page
 */
const SignIn = ({ history, location, refetch }) => {
  const [values, setValues] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');
  const [signin, { loading }] = useMutation(SIGN_IN);

  useEffect(() => {
    setError('');
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError('All fields are required');
      return;
    }

    setError('');
    try {
      const response = await signin({
        variables: { input: { emailOrUsername, password } },
      });
      localStorage.setItem('token', response.data.signin.token);
      console.log(response)
      await refetch();
      history.push(Routes.HOME);
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const { emailOrUsername, password } = values;

  return (
    <form onSubmit={handleSubmit}>
      <Root>
        <InputContainer>
          {error && (
            <ErrorMessage>
              <Error size="xxs" color="white">
                {error}
              </Error>
            </ErrorMessage>
          )}

          <InputText
            autoFocus
            type="text"
            name="emailOrUsername"
            values={emailOrUsername}
            onChange={handleChange}
            placeholder="T??n ????ng nh???p"
            borderColor="white"
          />
        </InputContainer>

        <InputContainer left="xs" right="xs">
          <InputText
            type="password"
            name="password"
            values={password}
            onChange={handleChange}
            placeholder="M???t kh???u"
            borderColor="white"
          />
          <A to={Routes.FORGOT_PASSWORD}>
            <ForgotPassword>Qu??n m???t kh???u?</ForgotPassword>
          </A>
        </InputContainer>

        <Button disabled={loading}>????ng Nh???p</Button>
      </Root>
    </form>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
