import React, { useState } from 'react';
import styled from 'styled-components';
import TopBasicNav from '../../components/common/TopNavBar/TopBasicNav';
import Comment from '../../components/common/Comment';
import { useParams } from 'react-router-dom';
import Post from '../../components/common/Post';
import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ContentsLayout from '../../components/layout/ContentsLayout';
import CommentList from './CommentList';
import { getCommentListApi } from '../../api/comment';
import { getPostApi } from '../../api/post';
import { getUserInfoApi } from '../../api/user';

const Detail = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  // 댓글 달면 바로 업데이트 되도록 하는 state (더 좋은 방법이 있을지 고민 중)
  const [updateComment, setUpdateComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userImg, setUserImg] = useState('');
  let { id } = useParams();
  const [showCommentList, setShowCommentList] = useState('');
  const [cntCommentList, setCntCommentList] = useState(10); // 보여줄 댓글 수

  const [deletedComment, setDeletedComment] = useState(false); //댓글 삭제 시 id 값

  /* 무한 스크롤 */
  useEffect(() => {
    const addUser = () => {
      // 더 렌더링할 리스트가 없으면 얼리리턴
      if (commentList.length + 10 < cntCommentList) {
        return;
      }
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // pc는 스크롤을 끝까지 내려도 정확히 clientHeight와 같아지지 않아 20 더함
      if (scrollHeight - scrollTop <= clientHeight + 20) {
        setShowCommentList(commentList.slice(0, cntCommentList));
        setCntCommentList(cntCommentList + 10);
      }
    };

    window.addEventListener('scroll', addUser);

    return () => window.removeEventListener('scroll', addUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cntCommentList]);
  /* * * * * * * * * */

  const getUserProfile = async () => {
    try {
      const res = await getUserInfoApi();
      const json = await res.json();
      setUserImg(json.user.image);
    } catch (err) {
      console.log(err);
    }
  };

  // title 변경
  const setTitle = (username) => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${username} 님의 게시물 | 구장 밖 야구`;
  };

  const getPostDetail = async () => {
    setIsLoading(true);
    try {
      const res = await getPostApi(id);
      const json = await res.json();

      // title 변경
      setTitle(json.post.author.username);

      setPost(json.post);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      comment: {
        content: comment,
      },
    };
    try {
      const reqPath = `/post/${id}/comments`;
      const res = await post(reqPath, data);
      const json = await res.json();
      setUpdateComment(json);
      setCommentList([json.comment, ...commentList]);
      setShowCommentList(
        [json.comment, ...commentList].slice(0, cntCommentList)
      );
      setIsLoading(false);
      setComment('');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getCommentList = async () => {
    try {
      const res = await getCommentListApi(id);
      const json = await res.json();

      setCommentList(json.comments);
      setShowCommentList(json.comments.slice(0, cntCommentList));
      setCntCommentList(cntCommentList + 10);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    getUserProfile();
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, updateComment]);

  useEffect(() => {
    const newCommentList = [...commentList];
    for (const i in newCommentList) {
      if (newCommentList[i].id === deletedComment) {
        newCommentList.splice(i, 1);
      }
    }
    setCommentList(newCommentList);
    setShowCommentList(newCommentList.slice(0, cntCommentList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedComment]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TopBasicNav />
          <PostWrapper>
            <h1 className='a11y-hidden'>포스트 | 구장 밖 야구</h1>
            {post && <Post post={post} />}
            <CommentListSection>
              <h2 className='a11y-hidden'>댓글 목록</h2>
              {showCommentList.length > 0 && (
                <>
                  {showCommentList.map((comment, index) => {
                    return (
                      <CommentList
                        key={index}
                        comment={comment}
                        setDeletedComment={setDeletedComment}
                      />
                    );
                  })}
                </>
              )}
            </CommentListSection>
          </PostWrapper>
          <Comment
            txt='게시'
            placeholder='댓글 입력하기'
            value={comment}
            setValue={setComment}
            event={handleCommentSubmit}
          >
            <img src={userImg} alt='내 프로필 사진' />
          </Comment>
        </>
      )}
    </>
  );
};

export default Detail;

const CommentListSection = styled.ul`
  border-top: 1px solid var(--gray-200);
  padding: 20px 16px; //bottom : form 높이 + 20px
  margin: 20px -16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PostWrapper = styled(ContentsLayout)`
  min-height: 0;
`;
