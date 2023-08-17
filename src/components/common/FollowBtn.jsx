import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import { UserContext } from '../../context/UserContext';
import { followApi } from '../../api/user';

const FollowBtn = ({ profileData, targetuser, ...props }) => {
  const { myTeam } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(props.isfollow);
  const accountname = localStorage.getItem('accountname');

  useEffect(() => {
    if (props.isfollow) {
      return setIsFollowing(props.isfollow);
    }
  }, [props.isfollow]);

  const handleFollow = async () => {
    try {
      const res = await followApi(targetuser,isFollowing);
      const profile = await res.json();
      console.log(profile);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      {accountname === targetuser ? null : (
        <>
          <Button
            mBtn={props.mBtn ? 'mBtn' : null}
            xsBtn={props.xsBtn ? 'xsBtn' : null}
            whiteBtn={isFollowing ? 'whiteBtn' : null}
            bgColor={'var(--primary-color-' + (myTeam || 'default') + ')'}
            onClick={handleFollow}
            padding='0'
          >
            {isFollowing ? (props.xsBtn ? '취소' : '언팔로우') : '팔로우'}
          </Button>
        </>
      )}
    </>
  );
};

export default FollowBtn;
