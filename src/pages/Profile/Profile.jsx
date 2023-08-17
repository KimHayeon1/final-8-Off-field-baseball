import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ContentsLayout from '../../components/layout/ContentsLayout';
import UserProduct from './UserProduct/UserProduct';
import UserPost from './UserPost/UserPost';
import TopBasicNav from '../../components/common/TopNavBar/TopBasicNav';
import TabNav from '../../components/common/TabNav';
import Loading from '../../components/common/Loading';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { profileApi } from '../../api/profile';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [team, setTeam] = useState('');
  const [intro, setIntro] = useState('');

  const { accountname } = useContext(UserContext);

  // title 변경
  const setTitle = (username, accountname) => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${username}(@${accountname}) | 구장 밖 야구`;
  };

  const getProfileInfo = async () => {
    setIsLoading(true);
    try {
      const res = await profileApi(username || accountname);
      const data = await res.json();

      const profile = data.profile;
      setTitle(data.profile.username, data.profile.accountname);
      setUserProfile(profile);
      setIntro(profile.intro.split('$')[0]);
      setTeam(profile.intro.split('$')[1]);
      setIsLoading(false);
    } catch (err) {
      console.error('에러가 발생했습니다.', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === `/profile/${accountname}`) {
      navigate('/profile');
    }
    getProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <>
      <TopBasicNav />
      <ContentsLayout>
        {isLoading ? (
          <Loading />
        ) : (
          userProfile && (
            <>
              <h1 className='a11y-hidden'>{username || accountname} 프로필</h1>
              <ProfileHeader
                profileData={userProfile}
                team={team}
                intro={intro}
                targetuser={username}
              />
              <UserProduct accountname={username ? username : accountname} />
              <UserPost key={location.key} />
            </>
          )
        )}
      </ContentsLayout>
      <TabNav currentId={3} />
    </>
  );
};

export default Profile;
