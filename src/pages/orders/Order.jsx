import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { IoMdTime } from 'react-icons/io';
import { LuCookingPot } from 'react-icons/lu';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineDone } from 'react-icons/md';
import { useCart } from '../../Context/CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Order() {
  const { cartItem, clearCart, recommendedProducts, setRecommendedProducts } =
    useCart();
  const { id } = useParams();
  const [activeId, setActiveId] = [1];
  const [orderDetails, setOrderDetails] = useState();
  const subtotal =
    cartItem?.reduce((total, item) => {
      const priceToUse = item.discountedPrice ?? item.price;
      return total + priceToUse * item.quantity;
    }, 0) || 0;
  const tax = subtotal.toFixed(2) * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    async function fetchOrders() {
      try {
        // setLoading(true);
        clearCart();
        const res = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`);
        const data = res.data;
        setOrderDetails(data);
        console.log(recommendedProducts);
      } catch (err) {
        console.error('Failed to fetch the products!', err);
      } finally {
        // setLoading(false);
      }
    }

    fetchOrders();
  }, [orderDetails?.status]);

  useEffect(() => {
    async function fetchRecommendedProducts() {
      // Check if orderDetails and order_items exist
      if (!orderDetails?.order_items || orderDetails.order_items.length === 0) {
        return;
      }

      try {
        const promises = orderDetails.order_items.map((item) =>
          axios.get(
            `http://127.0.0.1:8000/api/products/${item.product_id}/recommendations`
          )
        );

        const results = await Promise.all(promises);

        // Log to see the actual structure
        console.log('API Response:', results[0]?.data);

        // Handle different response structures
        const allRecommendations = results
          .map((res) => {
            // If data is already an array
            if (Array.isArray(res.data)) {
              return res.data;
            }
            // If data is wrapped in an object (e.g., { recommendations: [...] })
            else if (res.data.recommendations) {
              return res.data.recommendations;
            }
            // If data is wrapped differently (e.g., { data: [...] })
            else if (res.data.data) {
              return res.data.data;
            }
            // If it's a single object, wrap it in array
            else {
              return [res.data];
            }
          })
          .flat();

        // Remove duplicates based on product id
        const uniqueRecommendations = allRecommendations.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );

        // Limit to 5 products
        const limitedRecommendations = uniqueRecommendations.slice(0, 5);

        console.log(
          'Unique & Limited Recommendations:',
          limitedRecommendations
        );
        setRecommendedProducts(limitedRecommendations);
      } catch (error) {
        console.log('Error while fetching:', error);
      }
    }

    fetchRecommendedProducts();
  }, [orderDetails, setRecommendedProducts]); // Changed dependency

  const orderStatus = [
    {
      id: 1,
      name: 'Order Received',
      logo: <IoMdTime />,
    },
    {
      id: 2,
      name: 'Being Prepared',
      logo: <LuCookingPot />,
    },
    {
      id: 3,
      name: 'Ready for Pickup',
      logo: <FiPackage />,
    },
    {
      id: 4,
      name: 'Completed',
      logo: <MdOutlineDone />,
    },
  ];

  return (
    <div className='bg-amber-500/5'>
      <Navbar backStatus={true} cartStatus={false} />
      <div className='mx-auto rounded-xl w-[1000px]'>
        <div className='bg-white shadow-2xl mb-6 p-7 px-10 h-auto'>
          <div className='mb-5 text-amber-500 text-center'>
            <h1 className='font-semibold text-3xl'>Order #{id}</h1>
            <p className='text-black/50'>Thank you for ordering.</p>
          </div>
          <div className='mb-5 w-full'>
            <p className='pb-2 text-sm'>Order Status</p>
            <div className='bg-amber-600/10 rounded-2xl w-full h-3'>
              <div
                className={`bg-amber-600 rounded-2xl  h-full ${
                  orderDetails?.status === 'queued'
                    ? 'w-[25%]'
                    : orderDetails?.status === 'processing'
                    ? 'w-[50%]'
                    : orderDetails?.status === 'ready'
                    ? 'w-[75%]'
                    : 'w-full'
                }`}></div>
            </div>
          </div>
          <div className='flex justify-between items-center mb-7 pb-6 border-black/20 border-b'>
            {orderStatus.map((status) => (
              <div
                className={`${
                  activeId === status.id
                    ? ' text-amber-500 border-2 border-amber-500 bg-amber-500/10 text-2xl'
                    : 'text-black/50 text-xl'
                } flex flex-col justify-center items-center gap-2 bg-amber-500/5 px-10 py-3 rounded-xl`}>
                <p
                  className={`${
                    activeId === status.id
                      ? 'animate-pulse text-amber-500'
                      : ' '
                  }`}>
                  {status.logo}
                </p>
                <p className='font-medium text-[13px]'>{status.name}</p>
              </div>
            ))}
          </div>

          <div className='border-black/20 border-b'>
            <p className='font-semibold text-xl'>Order Items</p>
            <ul className='py-4'>
              {orderDetails?.order_items.map((item) => (
                <li
                  className='flex justify-between items-center mb-6 pl-6'
                  key={item.order_id}>
                  <div>
                    <p className='font-medium'>{item.product_name}</p>
                    <p className='text-black/30 text-sm'>
                      Qunatity: {item.quantity}
                    </p>
                  </div>
                  <div className='font-semibold'>
                    Rs {item.total_product_price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-between pt-4'>
            <p className='font-semibold text-xl'>Total</p>
            <p className='font-semibold text-amber-500 text-2xl'>
              Rs {orderDetails?.total_amount}
            </p>
          </div>
        </div>

        <div className='w-full h-auto'>
          <p className='mb-4 text-xl'>You may also like </p>

          <ul className='flex justify-start items-center gap-4 list-none'>
            {recommendedProducts.map((product) => (
              <Link to={`/menu/${product.id}`}>
                <li key={product.id} className='shadow-2xl rounded-sm h-53'>
                  <img
                    src='/burger.jpg'
                    alt={product.name}
                    className='rounded-t-md w-50 h-40'
                  />
                  <div className='px-2 py-1'>
                    <p className='font-md text-sm'>{product.name}</p>
                    <p className='font-md text-[13px] text-amber-600'>
                      Rs. {product.price}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
