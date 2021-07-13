import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Head from 'components/Head';
import { useStore } from 'store';
import { sendGet } from 'utils/request';
import MatchupItemCard from './MatchupItemCard';
import Empty from 'components/Empty';
import { Spacing } from 'components/Layout';


/**
 * Matchup suggestt
 */
const MatchSuggest = () => {
    const [{ auth }] = useStore();
    const [loading, setLoading] = useState(true);
    const [matchupList, setMatchupList] = useState([]);
    const [teamList, setTeamList] = useState([]);


    useEffect(() => {
        // getMatchupList();
        // getTeamsByUser();
        const p1 = new Promise((resolve, reject) => {
            sendGet('team/getListTeamsUser', { username: auth.user?.username }).then(rs => resolve(rs?.data?.data));
        });
        const p2 = new Promise((resolve, reject) => {
            sendGet('matchup/getAll').then(rs => resolve(rs?.data?.data));
        })

        Promise.all([p1, p2]).then(([teams, matchups]) => {
            // const currentUserId = auth.user.id;
            // const teamIds = teams.map(item => item.id);

            // let matchupData = matchups.filter(item => {
            //     if (item.userCreate === currentUserId) return false;
            //     if (teamIds.includes(item.teamCreate._id)) return false;
            //     return !item.attentions.some(elm => teamIds.includes(elm.teamCreate._id))
            // });

            setTeamList(teams);
            setMatchupList(matchups.reverse());
            setLoading(false);
        })
    }, [])

    const getMatchupList = () => {
        const url = 'matchup/getAll';
        sendGet(url)
            .then(rs => {
                const matchups = rs?.data?.data || [];
                // const currentUserId = auth.user.id;
                // const teamIds = teamList.map(item => item.id);


                // let matchupData = matchups.filter(item => {
                //     if (item.userCreate === currentUserId) return false;
                //     if (teamIds.includes(item.teamCreate._id)) return false;
                //     return !item.attentions.some(elm => teamIds.includes(elm.teamCreate._id))
                // });

                setMatchupList(matchups.reverse());
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const renderContent = () => {
        if (loading) return;

        return (
            <Fragment>
                <Spacing top="lg" />
                {matchupList?.length
                    ?
                    matchupList.map(item =>
                        <MatchupItemCard matchup={item} teamList={teamList} key={item._id} reload={getMatchupList} />
                    )
                    :
                    <Empty text="Chưa có Kèo" />
                }
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Head title="All matchup" />
            {renderContent()}
        </Fragment>
    );
};

export default MatchSuggest;
