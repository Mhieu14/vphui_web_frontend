import { useMutation } from '@apollo/client';
import { NotificationType } from 'constants/NotificationType';
import { CREATE_COMMENT } from 'graphql/comment';
import { GET_FOLLOWED_POSTS, GET_POST, GET_POSTS } from 'graphql/post';
import { GET_AUTH_USER, GET_USER } from 'graphql/user';
import { useNotifications } from 'hooks/useNotifications';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import { Button, Textarea } from './Form';






const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

/**
 * Creates a comment for a post
 */
const CreateComment = ({ post, focus }) => {
  const [{ auth }] = useStore();
  const notification = useNotifications();
  const [comment, setComment] = useState('');
  const buttonEl = useRef(null);
  const TextareaEl = useRef(false);
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_FOLLOWED_POSTS, variables: { userId: auth.user.id } },
      { query: GET_USER, variables: { username: auth.user.username } },
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: auth.user.id } },
      { query: GET_POST, variables: { id: post.id } },
    ],
  });

  useEffect(() => {
    focus && TextareaEl.current.focus();
  }, [focus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createComment({
      variables: { input: { comment, author: auth.user.id, postId: post.id } },
    });
    setComment('');

    // Create notification on comment
    if (auth.user.id !== post.author.id) {
      notification.create({
        user: post.author,
        postId: post.id,
        notificationType: NotificationType.COMMENT,
        notificationTypeId: data.createComment.id,
      });
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      buttonEl.current.click();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="B??nh lu???n..."
        onKeyDown={onEnterPress}
        ref={TextareaEl}
      />

      <Button
        type="submit"
        color={comment ? 'primary.main' : 'grey[500]'}
        weight="bold"
        text
        ref={buttonEl}
        disabled={!comment || loading}
      >
        ????ng
      </Button>
    </Form>
  );
};

CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  focus: PropTypes.bool,
};

export default CreateComment;
