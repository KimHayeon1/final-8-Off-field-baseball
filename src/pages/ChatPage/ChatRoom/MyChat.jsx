import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MyChat = (props) => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = '채팅룸 | 구장 밖 야구';
  }, []);
  const myTeam = useSelector((state) => state.authReducer.user.myTeam);

  return (
    <Wrapper>
      <MessageTime>{props.time}</MessageTime>
      <MessageContent>
        {!props.isImg ? (
          <MessageText myTeam={myTeam}>{props.children}</MessageText>
        ) : (
          <MessageImg src={props.img} myTeam={myTeam} />
        )}
      </MessageContent>
    </Wrapper>
  );
};

export default MyChat;

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

const MessageContent = styled.div`
  display: inline-block;
  max-width: 240px;
`;

const MessageText = styled.p`
  background-color: ${(props) =>
    'var(--primary-color-' + (props.myTeam || 'default') + ')'};
  color: white;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 18px;
  padding: 12px;
  border-radius: 10px 0 10px 10px;
`;

const MessageImg = styled.img`
  width: 240px;
  aspect-ratio: 1 / 1.5;
  object-fit: cover;
  background-size: cover;
  background-color: ${(props) =>
    'var(--secondary-color-' + (props.myTeam || 'default') + ')'};
  border-radius: 1rem;
  border: none;
  padding: 0;
`;

const MessageTime = styled.p`
  color: var(--gray-400);
  margin-bottom: 2px;
`;
