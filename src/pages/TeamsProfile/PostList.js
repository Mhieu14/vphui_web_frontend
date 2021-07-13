import React, { useState, useEffect } from 'react';
import Empty from 'components/Empty';
import { Spacing } from 'components/Layout';
import { sendGet } from 'utils/request';

const PostList = ({ user, team }) => {

    console.log("team", { user, team })
    useEffect(() => {
        const url = "match/listMatchTeam";
        const { teamname } = team;
        sendGet(url, { teamname }).then(rs => {
            console.log("rs match history", rs.data)
            // 60ed5b7d481c94572673d191
        })

        sendGet('match/detail', { match_id: "60ed5b7d481c94572673d191" }).then(rs => {
            console.log("detail", rs)
        })
    }, []);

    return (
        <Spacing bottom="lg">
            <Empty text="Chưa có hoạt động." />
        </Spacing>
    );

};

export default PostList;
