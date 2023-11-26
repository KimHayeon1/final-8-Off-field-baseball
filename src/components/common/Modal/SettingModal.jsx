import MoreModal from './MoreModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { useDispatch } from 'react-redux';
import { logout } from '../../../modules/authReducer';

const SettingModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutbtn = () => {
    navigate('/');
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <>
      <MoreModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <li>
          <button
            type='button'
            onClick={(e) => {
              setIsModalOpen(false);
              navigate('/profile');
            }}
          >
            설정 및 개인정보
          </button>
        </li>
        <li>
          <button type='button' onClick={(e) => setIsLogoutModalOpen(true)}>
            로그아웃
          </button>
        </li>
      </MoreModal>
      {isLogoutModalOpen && (
        <ConfirmModal
          title='로그아웃 하시겠습니까?'
          trigger='로그아웃'
          triggerFunc={handleLogoutbtn}
          closeModal={() => {
            setIsLogoutModalOpen(false);
            setIsModalOpen(false);
          }}
        ></ConfirmModal>
      )}
    </>
  );
};
export default SettingModal;
