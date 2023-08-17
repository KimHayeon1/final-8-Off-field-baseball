import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router';
import { deletePostApi } from '../../../api/post';
import { deleteProductApi } from '../../../api/product';

const DeleteModal = ({ closeModal, id, updatePost, setIsModalOpen, loc }) => {
  const url = 'https://api.mandarin.weniv.co.kr';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const deletePost = async () => {
    try {
      const res = (loc === 'product') ? await deleteProductApi(id) : await deletePostApi(id)
      const json = await res.json();
      closeModal(false);
      alert('게시글이 삭제되었습니다.');
      updatePost && updatePost(json);
      setIsModalOpen(false);
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfirmModal
      title='게시글을 삭제하시겠습니까?'
      closeModal={(e) => {
        closeModal();
        setIsModalOpen(false);
      }}
      trigger={'삭제'}
      triggerFunc={deletePost}
    />
  );
};

export default DeleteModal;
