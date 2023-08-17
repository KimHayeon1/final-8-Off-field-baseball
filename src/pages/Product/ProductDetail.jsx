import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import TopBasicNav from '../../components/common/TopNavBar/TopBasicNav';
import Loading from '../../components/common/Loading';
import ContentsLayout from '../../components/layout/ContentsLayout';
import Post from '../../components/common/Post';
import { productDetailApi } from '../../api/product';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // title 변경
  const setTitle = (product) => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${product} - 상품 | 구장 밖 야구`;
  };
  const getProductDetail = async () => {
    try {
      const res = await productDetailApi(id);
      const json = await res.json();
      setTitle(json.product.itemName);
      setProduct(json.product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* h~ 태그 고려 중 */}
      <h1 className='a11y-hidden'>상품 상세 페이지</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TopBasicNav />
          <PostWrapper>
            {product && <Post post={product} loc='product' />}
          </PostWrapper>
        </>
      )}
    </>
  );
};

export default ProductDetail;

const PostWrapper = styled(ContentsLayout)`
  min-height: 0;
`;
