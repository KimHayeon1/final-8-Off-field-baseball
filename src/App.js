import GlobalStyle from './styles/GlobalStyle';
import Router from './routes/Router';
import StyledContainer from './components/layout/StyledContainer';
import { setAuth } from './modules/authReducer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  dispatch(setAuth());

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <Router />
      </StyledContainer>
    </>
  );
}
export default App;
