import { BASIC_PROFILE_LG, UPLOAD_FILE } from '../../styles/CommonIcons';
import TeamSelect from '../../components/common/Select/TeamSelect';
import Form from '../../components/common/Form';
import Button from '../../components/common/Button';
import UploadModal from '../../components/common/Modal/UploadModal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinApi, loginApi, accountnameApi } from '../../api/user';
import { oneImageApi } from '../../api/image';
import { useDispatch } from 'react-redux';

const JoinProfile = ({ email, password }) => {
  const navigate = useNavigate();
  const [isValid, setIsVaild] = useState(false);
  const [username, setUsername] = useState('');
  const [accountname, setAccountnameValue] = useState('');
  const [intro, setIntro] = useState('');
  const [image, setImage] = useState('');
  const [src, setSrc] = useState(BASIC_PROFILE_LG);
  const [messageIntro, setMessageIntro] = useState('');
  const [messageAccountname, setMessageAccountname] = useState('');
  const [messageUsername, setMessageUsername] = useState('');
  const [selectedOpt, setSelectedOpt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textCnt, setTextCnt] = useState(0);

  const dispatch = useDispatch();

  // 소개는 필수값이 아니어서, 입력값이 없는 처음엔 true
  const [isVaildIntro, setIsVaildIntro] = useState(true);
  const [isVaildUsername, setIsVaildUsername] = useState(false);
  const [isVaildAccountname, setIsVaildAccountname] = useState(false);

  const teamData = {
    '삼성 라이온즈': { team: 'samsung', filename: '1687344208464.png' },
    '한화 이글스': { team: 'hanwha', filename: '1687344233670.png' },
    '키움 히어로즈': { team: 'kiwoom', filename: '1687344397365.png' },
    '롯데 자이언츠': { team: 'lotte', filename: '1687344422408.png' },
    'LG 트윈스': { team: 'lg', filename: '1687344477843.png' },
    'KIA 타이거즈': { team: 'kia', filename: '1687344489698.png' },
    'SSG 랜더스': { team: 'ssg', filename: '1687344502165.png' },
    '두산 베어스': { team: 'doosan', filename: '1687344513474.png' },
    'NC 다이노스': { team: 'nc', filename: '1687344523820.png' },
    'KT 위즈': { team: 'kt', filename: '1687344531846.png' },
  };

  // 사용자 이름, 계정 ID 모두 유효하고, 소개에 $가 입력되지 않았을 때
  useEffect(() => {
    if (
      isVaildIntro &&
      isVaildUsername &&
      isVaildAccountname &&
      textCnt <= 150
    ) {
      setIsVaild(true);
    } else {
      setIsVaild(false);
    }
  }, [isVaildIntro, isVaildUsername, isVaildAccountname, textCnt]);

  const join = async () => {
    const userData = {
      user: {
        username: username,
        email: email,
        password: password,
        accountname: accountname,
      },
    };
    userData.user.intro = intro || '';
    if (selectedOpt && selectedOpt !== '없음') {
      userData.user.intro += `$${teamData[selectedOpt].team}`;
    }
    if (src !== BASIC_PROFILE_LG) {
      const formData = new FormData();
      formData.append('image', image);

      const res = await oneImageApi(formData);
      const json = await res.json();

      userData.user.image = 'https://api.mandarin.weniv.co.kr/' + json.filename;
    } else {
      // 서버에 저장된 기본 팀 컬러 프로필 저장
      const filename = teamData[selectedOpt]?.filename || '1687309142552.png';
      userData.user.image = 'https://api.mandarin.weniv.co.kr/' + filename;
    }

    const res = await joinApi(userData);
    const json = await res.json();

    if (json.user) {
      login(); // 회원가입에 성공하면 자동로그인
    } else {
      alert(json.message);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    join();
  };
  // 자동로그인
  const login = async () => {
    const loginData = {
      user: {
        email: email,
        password: password,
      },
    };
    const res = await loginApi(loginData);
    const json = await res.json();

    if (json.user) {
      const token = json.user['token'];
      const accountname = json.user['accountname'];
      let myTeam = null;

      if (!selectedOpt || selectedOpt === '없음') {
        localStorage.setItem('myteam', '');
      } else {
        myTeam = teamData[selectedOpt].team;
        localStorage.setItem('myteam', teamData[selectedOpt].team);
      }
      localStorage.setItem('token', token);
      localStorage.setItem('accountname', accountname);

      dispatch(login({ token, accountname, myTeam }));
      navigate('/'); // 자동로그인에 성공하면 홈화면으로
    } else {
      navigate('/user/login'); // 자동로그인에 실패하면 로그인화면으로
    }
  };

  // 사용자 이름 유효성 검사
  const handleUsernameInp = (e) => {
    if (e.target.validity.valueMissing) {
      setMessageUsername('값을 입력해주세요');
      setIsVaildUsername(false);
    } else if (e.target.validity.tooShort) {
      setMessageUsername('2자 이상 입력해주세요');
      setIsVaildUsername(false);
    } else {
      setMessageUsername('');
      setIsVaildUsername(true);
    }
  };

  //계정 검증
  const verifyAccount = async () => {
    const accountData = {
      user: {
        accountname: accountname,
      },
    };

    const res = await accountnameApi(accountData);
    const json = await res.json();

    return json.message;
  };
  // 계정 id 값이 변하면, 유효성 검사
  const handleAccountnameInp = async (e) => {
    if (e.target.validity.valueMissing) {
      setMessageAccountname('값을 입력해주세요');
      setIsVaildAccountname(false);
    } else if (e.target.validity.patternMismatch) {
      setMessageAccountname('영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.');
      setIsVaildAccountname(false);
    } else {
      setMessageAccountname('');
      setIsVaildAccountname(true);
    }
  };
  // 계정 id 에서 포커스가 떠났을 때, 유효성 검사
  const handleAccountnameInpBlur = async (e) => {
    if (!e.target.validity.valid) {
      return;
    }

    const message = await verifyAccount();
    if (message !== '사용 가능한 계정ID 입니다.') {
      setMessageAccountname(message);
      setIsVaildAccountname(false);
    } else {
      setMessageAccountname('');
      setIsVaildAccountname(true);
    }
  };

  // 소개 유효성 검사
  const handleIntroInp = (e) => {
    if (e.target.value.includes('$')) {
      setMessageIntro('달러($)를 제외한 문자를 입력해주세요');
      setIsVaildIntro(false);
    } else {
      setMessageIntro('');
      setIsVaildIntro(true);
    }
  };

  // 이미지 삭제
  const handleImgDelete = (e) => {
    e.preventDefault();
    setImage('');
    setSrc(BASIC_PROFILE_LG);
    setIsModalOpen(false);
  };

  // 텍스트 길이에 맞춰 textarea height 변경
  const resizeHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleTextCnt = (e) => {
    setTextCnt(e.target.value.length);
  };

  const resizeImg = (e) => {
    const $canvas = document.createElement(`canvas`);
    const ctx = $canvas.getContext(`2d`);

    let [width, height] = [220, 220];

    if (e.target.width < e.target.height) {
      const resizeRatio = e.target.width / 220;
      height = e.target.height / resizeRatio;
    } else if (e.target.width > e.target.height) {
      const resizeRatio = e.target.height / 220;
      width = e.target.width / resizeRatio;
    }

    $canvas.width = width;
    $canvas.height = height;
    ctx.drawImage(e.target, 0, 0, width, height);

    const i = e.target.src.indexOf(';');
    const type = e.target.src.slice(5, i);

    // 용량이 줄어든 이미지
    return $canvas.toDataURL(type, 1);
  };

  const setImg = (e) => {
    const file = e.target.files[0];
    if (!/^image\/(jpg|gif|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
      alert(
        '이미지 파일 확장자는 jpg, gif, png, jpeg, bmp, tif, heic만 가능합니다.'
      );
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    setImage(file);

    reader.addEventListener('load', ({ target }) => {
      const image = new Image();
      image.src = target.result;
      image.addEventListener('load', (e) => {
        if (e.target.width <= 330) {
          setSrc(target.result);
        } else {
          const resizeSrc = resizeImg(e);
          setSrc(resizeSrc);
        }
      });
    });
  };

  return (
    <>
      <h1 className='a11y-hidden'>구장 밖 야구</h1>
      <StyledJoinProfile>
        <h2>프로필 설정</h2>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <Form handleForm={handleForm}>
          <button
            aria-label='프로필 사진 업로드 메뉴'
            type='button'
            className='img-btn'
            onClick={() => setIsModalOpen(true)}
          >
            <img src={src} alt='' />
            <img className='uplode-img' src={UPLOAD_FILE} alt='' />
          </button>
          {isModalOpen && (
            <UploadModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            >
              <li>
                <button
                  type='button'
                  onKeyDown={(e) => {
                    // input에 focus 가지 않게
                    if (!e.shiftKey && e.key === 'Tab') {
                      e.preventDefault();
                      e.target.parentNode.nextElementSibling.firstElementChild.focus();
                    }
                  }}
                  // 클릭 시, file input click 이벤트 실행(이미지 업로드 창 열림)
                  onClick={(e) => {
                    e.target.nextElementSibling.click();
                  }}
                >
                  이미지 업로드
                </button>
                <input
                  aria-hidden='true'
                  type='file'
                  accept='.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic'
                  id='profile-img'
                  onChange={(e) => {
                    setImg(e);
                    setIsModalOpen(false); // 모달창 닫기
                  }}
                />
              </li>
              <li>
                <button type='button' onClick={handleImgDelete}>
                  이미지 제거
                </button>
              </li>
              <li>
                <button type='button' onClick={() => setIsModalOpen(false)}>
                  취소
                </button>
              </li>
            </UploadModal>
          )}
          <label htmlFor='username'>사용자 이름</label>
          <input
            id='username'
            type='text'
            placeholder='2~10자 이내여야 합니다.'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleUsernameInp(e);
            }}
            minLength={2}
            maxLength={10}
            className={messageUsername && 'invalid'}
            required
          />
          {messageUsername && <strong>{messageUsername}</strong>}
          <label htmlFor='accountname'>계정 ID</label>
          <input
            id='accountname'
            type='text'
            placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
            pattern='[A-Za-z0-9\._]+'
            maxLength={16}
            value={accountname}
            onBlur={handleAccountnameInpBlur}
            onChange={(e) => {
              handleAccountnameInp(e);
              setAccountnameValue(e.target.value);
            }}
            className={messageAccountname && 'invalid'}
            required
          />
          {messageAccountname && <strong>{messageAccountname}</strong>}
          <label htmlFor='intro'>소개</label>
          <textarea
            id='intro'
            type='text'
            placeholder='자신에 대해 소개해 주세요!'
            value={intro}
            onChange={(e) => {
              handleIntroInp(e);
              setIntro(e.target.value);
              resizeHeight(e);
              handleTextCnt(e);
            }}
            className={messageIntro && 'invalid'}
            maxLength={150}
          />
          <div className={textCnt > 150 ? 'invalid' : ''}>
            <span>{textCnt} / </span>150
          </div>
          {messageIntro && <strong>{messageIntro}</strong>}
          <TeamSelect
            selectedOpt={selectedOpt}
            setSelectedOpt={setSelectedOpt}
          ></TeamSelect>
          <Button
            id='start-btn'
            type='submit'
            bgColor={
              isValid
                ? 'var(--primary-color-default)'
                : 'var(--secondary-color-default)'
            }
            lBtn
            disabled={isValid ? '' : 'disabled'}
          >
            구장 밖 야구 시작하기
          </Button>
        </Form>
      </StyledJoinProfile>
    </>
  );
};

export default JoinProfile;

const StyledJoinProfile = styled.section`
  padding: 30px 34px;

  h2,
  p {
    text-align: center;
  }
  h2 {
    margin-bottom: 12px;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3rem;
  }
  p {
    margin-bottom: 30px;
    font-size: 1.4rem;
    color: var(--gray-400);
  }
  #profile-img {
    border: none;
  }
  .img-btn {
    position: relative;
    display: flex;
    width: 110px;
    aspect-ratio: 1/1;
    margin: 0 auto 30px;
  }
  .img-btn img {
    border-radius: 55px;
    object-fit: cover;
  }
  .img-btn .uplode-img {
    position: absolute;
    width: 36px;
    height: 36px;
    bottom: 0;
    right: 0;
  }
  #my-team {
    margin-top: 9px;
  }
  #start-btn {
    margin-top: 30px;
  }
  #profile-img {
    display: none;
  }
`;
