import React, { useContext, useEffect, useState } from 'react';
import UserList from '../../components/common/UserList';
import ContentsLayout from '../../components/layout/ContentsLayout';
import styled from 'styled-components';
import TopTitleNav from '../../components/common/TopNavBar/TopTitleNav';
import { useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { followListApi } from '../../api/profile';

const FollowList = () => {
  const { type, accountname } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [showFollowList, setShowFollowList] = useState([]); // 무한 스크롤
  const [cntFollowList, setCntFollowList] = useState(20); // 보여줄 팔로워 수

  /* 무한 스크롤 */
  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      if (scrollHeight - innerHeight - scrollTop < 100) {
        setShowFollowList(followList.slice(0, cntFollowList));
        setCntFollowList(cntFollowList + 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cntFollowList]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${
      type === 'follower' ? '팔로워' : '팔로잉'
    } | 구장 밖 야구`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getFollowList = async () => {
    setIsLoading(true);
    try {
      const res = await followListApi(accountname, type);
      const json = await res.json();
      setFollowList(json);
      setShowFollowList(json.slice(0, cntFollowList));
      setCntFollowList(cntFollowList + 20);
      setIsLoading(false);
    } catch (err) {
      console.error('에러가 발생했습니다.', err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFollowList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopTitleNav loc={type} />
      <ContentsLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <UserListWrap>
              {showFollowList &&
                showFollowList.map((user, index) => {
                  return <UserList key={index} user={user} />;
                })}
            </UserListWrap>
          </>
        )}
      </ContentsLayout>
    </>
  );
};

export default FollowList;

const UserListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
