import ConfirmModal from './ConfirmModal';
import { reportPostApi } from '../../../api/post';

const ReportModal = ({ closeModal, id, setIsModalOpen }) => {
  const reportPost = async () => {
    try {
      const res = await reportPostApi(id)
      const json = await res.json();
      closeModal(false);
      alert('신고가 완료되었습니다.');
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfirmModal
      title='게시글을 신고하시겠습니까?'
      closeModal={(e) => {
        closeModal();
        setIsModalOpen(false);
      }}
      trigger={'신고'}
      triggerFunc={reportPost}
    />
  );
};

export default ReportModal;
