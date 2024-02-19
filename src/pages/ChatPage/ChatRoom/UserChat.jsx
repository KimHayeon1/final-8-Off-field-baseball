import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UserChat = (props) => {
  const myTeam = useSelector((state) => state.authReducer.user.myTeam);

  return (
    <Wrapper>
      <img
        className='profile-img'
        src={props.profile}
        alt='대화 상대의 프로필 사진입니다.'
      />
      <MessageContent>
        {!props.isImg ? (
          <MessageText>{props.children}</MessageText>
        ) : (
          <MessageImg src={props.img} myTeam={myTeam} />
        )}
        <MessageTime>{props.time}</MessageTime>
      </MessageContent>
    </Wrapper>
  );
};

export default UserChat;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  .profile-img {
    width: 42px;
    height: 42px;
  }
`;

const MessageContent = styled.div`
  display: inline-block;
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

const MessageText = styled.p`
  max-width: 240px;
  background-color: white;
  border: 1px solid var(--gray-300);
  color: #000;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 18px;
  padding: 12px;
  border-radius: 0 10px 10px 10px;
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
