import { useApolloClient } from '@apollo/client';
import Avatar from 'components/Avatar';
import { Spacing } from 'components/Layout';
import { A } from 'components/Text';
import { UPDATE_NOTIFICATION_SEEN } from 'graphql/notification';
import { GET_AUTH_USER } from 'graphql/user';
import { useClickOutside } from 'hooks/useClickOutside';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import * as Routes from 'routes';
import { useStore } from 'store';
import styled from 'styled-components';






const NotificationItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  font-size: ${(p) => p.theme.font.size.xxs};
  background-color: ${(p) => p.theme.colors.white};

  &:last-child {
    border-bottom: 0;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: ${(p) => p.theme.spacing.xs};
`;

const PostImage = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/**
 * Renders user notifications
 */
const Notification = ({ notification, close }) => {
  const [{ auth }] = useStore();
  const client = useApolloClient();
  const ref = React.useRef(null);
  const { author, follow, like, comment, member, matchup, match } = notification;

  useClickOutside(ref, close);

  useEffect(() => {
    const updateNotificationSeen = async () => {
      try {
        await client.mutate({
          mutation: UPDATE_NOTIFICATION_SEEN,
          variables: {
            input: {
              userId: auth.user.id,
            },
          },
          refetchQueries: () => [{ query: GET_AUTH_USER }],
        });
      } catch (err) { }
    };

    updateNotificationSeen();
  }, [auth.user.id, auth.user.newNotifications.length, client]);


  if (member) {
    const { teamname } = member.team;
    return (
      <NotificationItem ref={ref}>
        <Action>
          <A to={generatePath(Routes.TEAM_PROFILE, { teamname })}>
            Bạn được mời với nhóm <b>@{teamname}</b>.
          </A>
        </Action>
      </NotificationItem>
    )
  }

  if (matchup) {
    const { teamname } = matchup.teamCreate;
    return (
      <NotificationItem ref={ref}>
        <Action>
          <A to={generatePath(Routes.MATCHUPHOME)}>
            Có đội bóng mới quan tâm kèo của nhóm <b>@{teamname}</b>
          </A>
        </Action>
      </NotificationItem>
    )
  }

  if (match) {
    const { teamA, teamB } = match;
    return (
      <NotificationItem ref={ref}>
        <Action>
          <A to={generatePath(Routes.MATCH)}>
            Kèo đấu mới được xác nhận cho <b>@{teamA.teamname}</b> và <b>@{teamB.teamname}</b>
          </A>
        </Action>
      </NotificationItem>
    )
  }

  if (!follow && !like && !comment) return null;

  return (
    <NotificationItem ref={ref}>
      <A
        to={generatePath(Routes.USER_PROFILE, {
          username: author.username,
        })}
      >
        <LeftSide>
          <Avatar image={author.image} size={34} />

          <Spacing left="xs" />

          <Name>{author.fullName}</Name>
        </LeftSide>
      </A>

      {follow && <Action>started following you</Action>}

      {like && (
        <Action>
          likes your photo
          <A to={generatePath(Routes.POST, { id: like.post.id })}>
            <PostImage>
              <Image src={like.post.image} />
            </PostImage>
          </A>
        </Action>
      )}

      {comment && (
        <Action>
          commented on your photo
          <A to={generatePath(Routes.POST, { id: comment.post.id })}>
            <PostImage>
              <Image src={comment.post.image} />
            </PostImage>
          </A>
        </Action>
      )}
    </NotificationItem>
  );
};

Notification.propTypes = {
  close: PropTypes.func,
};

export default Notification;
