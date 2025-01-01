import React, { useContext, useEffect } from 'react'
import OrderCard from '../../Components/OrderCards/OrderCard/OrderCard'
import Carousel from 'framer-motion-carousel';
import { OrderHome } from "../../App"
import OrdersEmpty from '../../Components/OrderCards/ordersEmpty/OrdersEmpty';

function Orders() {
  const [orderHome, setOrderHome] = useContext(OrderHome);
  useEffect(() => {
    var temp = orderHome
    temp = temp.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setOrderHome(temp)
    console.log(orderHome)
  }, [orderHome]);
  return (
    <>
      {
        (orderHome.length>0) ? <Carousel autoPlay={false}>
          {
            orderHome && orderHome.map((order, index) => {
              return <OrderCard key={index} {...order} />
            })
          }
        </Carousel> : <OrdersEmpty />
      }
    </>
  )
}

export default Orders