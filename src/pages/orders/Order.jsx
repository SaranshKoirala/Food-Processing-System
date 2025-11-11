import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { IoMdTime } from 'react-icons/io';
import { LuCookingPot } from 'react-icons/lu';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineDone } from 'react-icons/md';
import { useCart } from '../../Context/CartContext';

export default function Order() {
  const { cartItem } = useCart();
  const { id } = useParams();
  const [activeId, setActiveId] = [1];

  const subtotal =
    cartItem?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
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
      <div className='bg-white shadow-2xl mx-auto mb-6 p-7 px-10 rounded-xl w-[900px] h-auto'>
        <div className='mb-5 text-amber-500 text-center'>
          <h1 className='font-semibold text-3xl'>Order #{id}</h1>
          <p className='text-black/50'>Thank you, {}</p>
        </div>
        <div className='mb-5 w-full'>
          <p className='pb-2 text-sm'>Order Status</p>
          <div className='bg-amber-600/10 rounded-2xl w-full h-3'>
            <div className='bg-amber-600 rounded-2xl w-[25%] h-full'></div>
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
                  activeId === status.id ? 'animate-pulse text-amber-500' : ' '
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
            {cartItem?.map((item) => (
              <li className='flex justify-between items-center mb-6 pl-6'>
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-black/30 text-sm'>
                    Qunatity: {item.quantity}
                  </p>
                </div>
                <div className='font-semibold'>
                  Rs {item.price * item.quantity}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-between pt-4'>
          <p className='font-semibold text-xl'>Total</p>
          <p className='font-semibold text-amber-500 text-2xl'>Rs {total}</p>
        </div>
      </div>
    </div>
  );
}
