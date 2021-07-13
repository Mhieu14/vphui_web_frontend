import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Empty from 'components/Empty';
import { A } from 'components/Text';
import { Button } from 'components/Form';
import { useStore } from 'store';
import Modal from 'components/Modal';
import { CloseIcon } from 'components/icons';
import { sendPost, sendGet } from 'utils/request';
import { EmptyIcon } from 'components/icons';
import { Loading } from 'components/Loading';

const LI = styled.li`
  color: ${(p) => p.theme.colors.error.main};
`

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBody = styled.div`
  min-width: 400px;
  border-radius: 5px;
  background: white;
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);s
  // padding: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.sm};
`
const WrapIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(p) => p.theme.colors.grey[200]};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
`

const Main = styled.div`
  position: relative;
  border-radius: 5px;
  background: white;
  z-index: 99;
  padding: 0px 15px 15px 15px;
`;

const Flex = styled.div`
  display: flex;
  min-height: 30px;
`

const FlexItem = styled.div`
  padding: 0px;
  align-self: center;
  min-width: 50px;
`
const UL = styled.ul`
  padding: 0 10px 10px 10px;
  margin: 0;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  min-width: 500px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const ButtonMini = styled.button`
  background: #e1e1e1;
  border: none;
  margin: 10px 3px;
  width: 18px;
  height: 18px;
  font-size: 13px;
  &.create{
      &:hover{
      background: green;
      color: white;
    }
  }

    &.remove {
      &:hover{
      background: red;
      color: white;
    }
  }
`;

const Title = styled.div`
  background: #ccc;
  text-align: center;
  padding: 15px 10px;
  font-weight: bold;
  border-radius: 5px 5px 0px 0px;
`;

const Item = styled.div`
  cursor: pointer;
  padding: 10px;
  border-top: 1px solid #d3d3d3;
  &:hover{
    background: #ddd;
  }
`

const MatchDetail = ({ matchup, teamList = [], onClose = () => { } }) => {
  const [{ auth }] = useStore();
  const { id: currentUserId } = auth.user;
  const { _id, description, stadium, teamCreate, timeStart, userCreate, is_my_team_admin_matchup } = matchup || {};
  const [isOpen, setIsOpen] = useState(false);
  // const [teamListSelectable, setTeamListSelectable] = useState([]);
  const [attentionList, setAttentionList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const myTeamIds = teamList.map(item => item.id);
  // const attentionCount = attentionList?.length || 0;
  const [callRequestCount, setCallRequestCount] = useState(0);


  useEffect(() => {
    getAttentionList();
  }, [])

  const getAttentionList = () => {
    const url = "matchup/getDetail";
    const params = {
      matchup_id: _id,
    };
    sendGet(url, params)
      .then(rs => {
        console.log("detail again", rs)
        setCallRequestCount(callRequestCount + 1);
        setAttentionList(rs?.data?.data?.attentions || []);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const createAttention = () => {
    setIsOpen(true);
    // setTeamListSelectable(teamList);
  }

  const confirmAttention = (id) => {
    const url = "matchup/confirmAttention";
    const data = {
      attention_id: id,
    }
    sendPost(url, null, data).then(rs => {
      onClose(2);
    })
  }

  const removeAttention = (id) => {
    const url = "matchup/removeAttention";
    const data = {
      attention_id: id,
    }
    sendPost(url, null, data).then(rs => {
      getAttentionList();
    })
  }

  const removeMatchup = () => {
    const url = "matchup/delete";
    const data = {
      matchup_id: _id,
    }
    sendPost(url, null, data).then(rs => {
      console.log("remove", rs)
      onClose(2);
    })

  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const selectTeamAttention = (teamSelected) => {
    const url = "matchup/createAttention";
    const data = {
      matchup_id: _id,
      teamname: teamSelected.teamname,
    }

    sendPost(url, null, data).then(rs => {
      console.log("rs create attention", rs.data);
      getAttentionList();
      setIsOpen(false);
    })
  }

  const closeAll = () => {
    console.log("callRequestCount", callRequestCount)
    onClose(callRequestCount);
  }

  const renderTeamList = () => {
    console.log("renderTeamList")
    let teamAttentionIds = attentionList.map(item => item.teamCreate._id);
    teamAttentionIds.push(teamCreate._id);
    const teamListSelectable = teamList.filter(item => !teamAttentionIds.includes(item.id))
    return (
      <ModalBody>
        <WrapIcon onClick={toggleModal} >
          <CloseIcon />
        </WrapIcon>
        <Title>Chọn đội muốn quan tâm kèo:</Title>
        {teamListSelectable.map(item =>
          <Item onClick={selectTeamAttention.bind(this, item)} >
            <b>@{item.teamname}</b> - {item.fullname}
          </Item>
        )}

        {!teamListSelectable.length
          &&
          <Empty text="Không có đội bóng phù hợp!" />
        }
      </ModalBody>
    )
  }

  console.log("detail", { matchup, teamList })
  return (
    <Fragment>

      <Main style={{ display: isOpen && 'none' }}>
        <WrapIcon onClick={closeAll} >
          <CloseIcon />
        </WrapIcon>
        <h1 style={{ textAlign: 'center' }}>{description}</h1>
        <Table>
          <tbody>
            <tr>
              <Td>Địa điểm</Td>
              <Td>{stadium?.name}</Td>
            </tr>
            <tr>
              <Td>Đội mở kèo</Td>
              <Td>{teamCreate?.fullname}</Td>
            </tr>
            <tr>
              <Td>Thời gian bắt đầu</Td>
              <Td>{timeStart}</Td>
            </tr>
            <tr>
              <Td>Thành viên tạo</Td>
              <Td></Td>
            </tr>
            <tr>
              <Td>Đội quan tâm</Td>
              <Td>
                {loading
                  ?
                  <Loading />
                  :
                  <Fragment>
                    {attentionList.map((item, index) =>
                      <Fragment key={item._id}>
                        <Flex>
                          <FlexItem>
                            @{item.teamCreate.teamname}
                          </FlexItem>

                          <FlexItem>
                            {is_my_team_admin_matchup
                              &&
                              <ButtonMini title="Confirm" className="create" onClick={confirmAttention.bind(this, item._id)}>+</ButtonMini>
                            }
                            {(is_my_team_admin_matchup || item.is_my_team_admin_attention)
                              &&
                              <ButtonMini title="Remove" className="remove" onClick={removeAttention.bind(this, item._id)}>x</ButtonMini>
                            }
                          </FlexItem>
                        </Flex>
                      </Fragment>
                    )}

                    {!attentionList.length
                      &&
                      <Fragment>
                        <EmptyIcon />
                      </Fragment>
                    }
                  </Fragment>
                }
              </Td>
            </tr>

          </tbody>
        </Table>
        <Buttons>
          {!is_my_team_admin_matchup
            &&
            <Button onClick={createAttention}>Quan tâm</Button>
          }
          {is_my_team_admin_matchup
            &&
            <Button onClick={removeMatchup}>Xóa kèo</Button>
          }
        </Buttons>

      </Main>

      <Modal open={isOpen} onClose={toggleModal} hiddenOverlay>
        {isOpen && renderTeamList()}
      </Modal>
    </Fragment>

  );
};

export default MatchDetail;
