type User = { token: string; accountname: string; myTeam: string | null };

// 액션 생성함수
export const login = (user: User) => {
  return { type: 'login', payload: user };
};

export const logout = () => {
  return { type: 'logout', payload: null };
};

export const setAuth = () => {
  const token = localStorage.getItem('token') || null;
  const accountname = localStorage.getItem('accountname') || null;

  if (token && accountname) {
    const user = {
      token,
      accountname,
      myTeam: localStorage.getItem('myteam') || null,
    };

    return { type: 'isAuthReady', payload: user };
  }

  return { type: 'isAuthReady', payload: null };
};

export const editProfile = (accountname: string, myTeam: string | null) => {
  const token = localStorage.getItem('token');

  const user = {
    token,
    accountname,
    myTeam,
  };

  return { type: 'editProfile', payload: user };
};

const initialState = {
  user: null,
  isAuthReady: false,
};

type Action =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload: null }
  | { type: 'editProfile'; payload: User }
  | { type: 'isAuthReady'; payload: null | User };

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null };
    case 'isAuthReady':
      return { ...state, user: action.payload, isAuthReady: true };
    case 'editProfile':
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

export default authReducer;
