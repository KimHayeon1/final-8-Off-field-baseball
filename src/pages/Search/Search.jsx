import React, { useState, useEffect, useContext, useRef } from 'react';
import TopSearchNav from '../../components/common/TopNavBar/TopSearchNav';
import UserList from '../../components/common/UserList';
import TabNav from '../../components/common/TabNav';
import styled from 'styled-components';
import { UserContext } from '../../context/UserContext';
import { get } from '../../api/instanse';

const Search = () => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [cntUserList, setCntUserList] = useState(20);
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState(''); // 검색 키워드

  const { accountname } = useContext(UserContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = '계정 검색 | 구장 밖 야구';
  }, []);

  const fetchData = async () => {
    try {
      const reqPath = `/user/searchuser/?keyword=${keyword}`;
      const response = await get(reqPath);
      return response.json();
    } catch {}
  };
  const onTyping = () => {
    async function handleFetchData() {
      const users = await fetchData();
      // 현재 inp 값으로 바뀌기 이전의 함수라면 얼리리턴
      if (keyword !== searchInp.current.value) {
        return;
      }
      if (cntUserList === 20) {
        setSearchUsers(users.slice(0, cntUserList));
        setCntUserList(cntUserList + 20);
      } else {
        setSearchUsers(users.slice(0, cntUserList - 20));
      }
      setUserList(users);
    }
    handleFetchData();
  };

  // 무한 스크롤
  useEffect(() => {
    const addUser = () => {
      // 더 렌더링할 리스트가 없으면 얼리리턴
      if (userList.length + 20 < cntUserList) {
        return;
      }
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // pc는 스크롤을 끝까지 내려도 정확히 clientHeight와 같아지지 않아 20 더함
      if (scrollHeight - scrollTop <= clientHeight + 20) {
        setSearchUsers(userList.slice(0, cntUserList));
        setCntUserList(cntUserList + 20);
      }
    };

    window.addEventListener('scroll', addUser);

    return () => window.removeEventListener('scroll', addUser);
  }, [cntUserList, userList]);

  useEffect(() => {
    let timeout;
    if (keyword.length > 0) {
      timeout = setTimeout(() => {
        onTyping();
      }, 200);
    } else {
      setUserList([]);
      setSearchUsers([]);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  const searchInp = useRef(null);
  return (
    <>
      <TopSearchNav
        keyword={keyword}
        onChange={setKeyword}
        searchInp={searchInp}
      />
      <SearchList>
        {searchUsers.map((user) => {
          return (
            accountname !== user.accountname && (
              <UserList key={user._id} user={user} keyword={keyword} />
            )
          );
        })}
      </SearchList>
      <TabNav />
    </>
  );
};

export default Search;

const SearchList = styled.section`
  display: block;
  padding: 68px 1.6rem 0;
  li:not(:last-child) {
    margin-bottom: 20px;
  }
`;
