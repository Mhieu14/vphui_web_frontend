import React from 'react';
import Empty from 'components/Empty';
import { Spacing } from 'components/Layout';

const PostList = ({ user, team }) => {


    return (
        <Spacing bottom="lg">
            <Empty text="Chưa có hoạt động." />
        </Spacing>
    );

};

export default PostList;
