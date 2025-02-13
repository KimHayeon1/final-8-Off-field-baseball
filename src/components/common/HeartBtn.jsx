import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { heartApi } from '../../api/heart';
import { useSelector } from 'react-redux';

const HeartBtn = ({ data }) => {
  const [hearted, setHearted] = useState('');
  const [heartCount, setHeartCount] = useState('');
  const myTeam = useSelector((state) => state.authReducer.user.myTeam);

  useEffect(() => {
    setHearted(data.hearted);
    setHeartCount(data.heartCount);
  }, [data]);

  const handleHeart = async () => {
    const res = await heartApi(data.id, hearted);
    const json = await res.json();
    setHearted(!hearted);
    setHeartCount(json.post.heartCount);
  };

  return (
    <PostBtn onClick={handleHeart}>
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.9202 3.01322C15.5204 2.60554 15.0456 2.28215 14.5231 2.0615C14.0006 1.84086 13.4406 1.72729 12.875 1.72729C12.3094 1.72729 11.7494 1.84086 11.2268 2.0615C10.7043 2.28215 10.2296 2.60554 9.82977 3.01322L8.99997 3.85889L8.17017 3.01322C7.36252 2.19013 6.26713 1.72772 5.12495 1.72772C3.98277 1.72772 2.88737 2.19013 2.07973 3.01322C1.27209 3.83631 0.818359 4.95266 0.818359 6.11668C0.818359 7.28071 1.27209 8.39706 2.07973 9.22015L2.90953 10.0658L8.99997 16.2728L15.0904 10.0658L15.9202 9.22015C16.3202 8.81266 16.6376 8.32885 16.8541 7.79635C17.0706 7.26384 17.182 6.69309 17.182 6.11668C17.182 5.54028 17.0706 4.96952 16.8541 4.43702C16.6376 3.90452 16.3202 3.4207 15.9202 3.01322Z'
          fill={
            hearted
              ? myTeam === 'kt'
                ? 'var(--tertiary-color-kt)'
                : 'var(--primary-color-' + (myTeam || 'default') + ')'
              : ''
          }
          stroke={
            hearted
              ? myTeam === 'kt'
                ? 'var(--tertiary-color-kt)'
                : 'var(--primary-color-' + (myTeam || 'default') + ')'
              : 'var(--gray-400)'
          }
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span className='a11y-hidden'>
        {hearted ? '좋아요 취소 버튼' : '좋아요 누르기 버튼'}
      </span>
      <span>{heartCount}</span>
    </PostBtn>
  );
};

export default HeartBtn;

const PostBtn = styled.button`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 1.2rem;
  img {
    width: 20px;
  }
`;
