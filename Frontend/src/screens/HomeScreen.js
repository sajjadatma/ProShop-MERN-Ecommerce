import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../Actions/productsAction'
import ProductCarousel from '../components/ProductCarousel'
import { useSelector, useDispatch } from 'react-redux'
const HomeScreen = () => {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products,pages,page} = productList

  return (
    <>
    {!keyword ? <ProductCarousel /> : <Link to="/"className="btn btn-dark">Go Back</Link>  }
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
          <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} kyeword={keyword && keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen
