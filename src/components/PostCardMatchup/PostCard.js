import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';
import axios from 'axios';
import Comment from 'components/Comment';
import CreateComment from 'components/CreateComment';
import Like from 'components/Like';
import { DotsIcon, PostCommentIcon } from 'components/icons';
import { Spacing } from 'components/Layout';
import { A, H3 } from 'components/Text';
import { Button } from 'components/Form';
// import PostCardOption from 'components/PostCard/PostCardOption';
// import Modal from 'components/Modal';
import Avatar from 'components/Avatar';

import { useStore } from 'store';

import * as Routes from 'routes';

import { timeAgo } from 'utils/date';

const Root = styled.div`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.sm};
  padding-bottom: ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
`;

const CreatedAt = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.text.hint};
  border-bottom: 1px solid ${(p) => p.theme.colors.text.secondary};
  border: 0;
  margin-top: 2px;
`;

const Author = styled(A)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.colors.primary.main};
`;

const Poster = styled.img`
  display: block;
  width: 100%;
  max-height: 700px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const Title = styled.div`
  word-break: break-word;
  white-space: pre-line;
`;

const BottomRow = styled.div`
  overflow: hidden;
`;

const CountAndIcons = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.text.secondary};
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;

const Comments = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const StyledButton = styled(Button)`
  padding: 0;
  padding-left: 4px;
  font-size: ${(p) => p.theme.font.size.xxs};
`;

const CommentLine = styled.div`
  margin-bottom: 5px;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;

/**
 * Component for rendering user post
 */

const PostCard = ({ teamname,time_start,description,name,author, createdAt}) => {
 

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);



  const openOption = () => setIsOptionOpen(true);

  return (
    
      <Root>
        
        <TopRow>
          <Author
            to={generatePath(Routes.USER_PROFILE, {
              username: author.username,
            })}
          >
            <Avatar image={author.image} />

            <Spacing left="xs">
              <Name>{author.fullName}</Name>
              <CreatedAt>{timeAgo(createdAt)}</CreatedAt>
            </Spacing>
          </Author>

          <Button ghost onClick={openOption}>
            <DotsIcon />
          </Button>
        </TopRow>

        <Spacing left="sm" bottom="sm" top="xs" right="sm">
          <Title>
            <H3>{description}</H3>
          </Title>
        </Spacing>
        <Spacing left="sm" bottom="sm" top="xs" right="sm">
          <Title>
            <H3>{teamname}</H3>
          </Title>
        </Spacing>
        <Spacing left="sm" bottom="sm" top="xs" right="sm">
          <Title>
            <H3>{name}</H3>
          </Title>
        </Spacing>
        <Spacing left="sm" bottom="sm" top="xs" right="sm">
          <Title>
            <H3>{time_start}</H3>
          </Title>
        </Spacing>

        

        {/* <BottomRow>
          <CountAndIcons>
            <Count>
              {likes.length} likes
              <Spacing />
              <StyledButton onClick={toggleComment} text>
                {comments.length} comments
              </StyledButton>
            </Count>

            <Icons>
              <Like fullWidth withText user={author} postId={postId} likes={likes} />

              <Button fullWidth text onClick={toggleCreateComment}>
                <PostCommentIcon /> <Spacing inline left="xxs" /> <b>Comment</b>
              </Button>
            </Icons>
          </CountAndIcons>

          {isCommentOpen && (
            <>
              <Spacing top="xs">
                <CommentLine />
                <CreateComment post={{ id: postId, author }} focus={isCommentOpen} />
              </Spacing>

              {comments.length > 0 && <CommentLine />}

              <Comments>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} postId={postId} postAuthor={author} />
                ))}
              </Comments>
            </>
          )}
        </BottomRow> */}
      </Root>
    
  );
};

PostCard.propTypes = {
  author: PropTypes.object.isRequired,
  imagePublicId: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default PostCard;