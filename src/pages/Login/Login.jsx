import { Link } from 'react-router-dom';
import Form from '../../components/common/Form';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import ShowPasswordBtn from '../../components/common/ShowPasswordBtn';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, getProfileApi } from '../../api/user';
import { useDispatch } from 'react-redux';

const Login = ({ team }) => {
  const navigate = useNavigate();

  const [isValid, setIsVaild] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const dispatch = useDispatch();

  // 이메일, 비밀번호 모두 입력되면 버튼 활성화
  useEffect(() => {
    if (email && password) {
      setIsVaild(true);
    } else {
      setIsVaild(false);
    }
  }, [email, password]);

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
      const myTeam = await getTeam(json.user['token'], json.user.accountname);

      localStorage.setItem('token', token);
      localStorage.setItem('accountname', accountname);
      localStorage.setItem('myteam', team);

      dispatch(login({ token, accountname, myTeam }));
      goHome();
    } else {
      setWarningMessage(json.message);
    }
  };
  const getTeam = async (token, accountname) => {
    // 마이팀 불러오기
    const res = await getProfileApi(accountname);

    const teamList = [
      'samsung',
      'hanwha',
      'kiwoom',
      'lotte',
      'lg',
      'kia',
      'ssg',
      'doosan',
      'nc',
      'kt',
    ];
    const json = await res.json();
    const team = json.profile.intro.split('$')[1];
    if (teamList.includes(team)) {
      return json.profile.intro.split('$')[1];
    } else {
      return '';
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    login();
  };

  const goHome = () => {
    navigate('/home');
  };

  return (
    <>
      <h1 className='a11y-hidden'>구장 밖 야구</h1>
      <StyledLogin>
        <h2>로그인</h2>
        <Form team={team} handleForm={handleForm}>
          <label htmlFor='email-inp'>이메일</label>
          <input
            id='email-inp'
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            maxLength='98'
          />
          <label htmlFor='password-inp'>비밀번호</label>
          <input
            autoComplete='off'
            id='password-inp'
            type={showPassword ? 'text' : 'password'}
            maxLength='20' // 임시
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <ShowPasswordBtn
            aria-label='비밀번호 표시 토글'
            className='show-btn'
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          ></ShowPasswordBtn>
          {warningMessage && <strong>{warningMessage}</strong>}
          <StyledButton
            type='submit'
            bgColor={
              isValid
                ? 'var(--primary-color-default)'
                : 'var(--secondary-color-default)'
            }
            lBtn
            disabled={isValid ? '' : 'disabled'}
          >
            로그인
          </StyledButton>
          <Link to='/join'>이메일로 회원가입</Link>
        </Form>
      </StyledLogin>
    </>
  );
};

export default Login;

const StyledButton = styled(Button)`
  margin: 30px 0 20px;
`;

const StyledLogin = styled.section`
  padding: 30px 34px;
  h2 {
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 3rem;
    text-align: center;
  }
  a {
    display: block;
    text-align: center;
    font-size: 1.2rem;
    color: var(--gray-400);
  }
  .show-btn {
    position: absolute;
    top: 86px;
    right: -6px;
  }
`;
