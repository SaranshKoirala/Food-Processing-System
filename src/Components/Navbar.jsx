// Navbar.js
import { useEffect, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../Context/CartContext.jsx';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ backStatus, cartStatus }) {
  const {
    cartItem,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    orderId,
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  function toggleCart() {
    setIsCartOpen((open) => !open);
  }

  const subtotal =
    cartItem?.reduce((total, item) => {
      const priceToUse = item.discountedPrice ?? item.price;
      // Only charge for the quantity purchased, not the free items
      return total + priceToUse * item.quantity;
    }, 0) || 0;

  const tax = subtotal * 0.1; // Fixed: was multiplying string with toFixed(2)
  const total = subtotal + tax;

  useEffect(() => {
    if (isCartOpen) {
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartOpen]);

  return (
    <>
      <nav className='flex justify-between items-center bg-card/80 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.25)] mb-5 px-4 py-3'>
        {backStatus ? (
          <Link to={'/menu'}>
            <div className='flex justify-center items-center gap-2 hover:bg-amber-500/50 px-3 py-2 hover:rounded-xl text-black'>
              <FaLongArrowAltLeft />{' '}
              <p className='font-medium text-sm'>Back to Menu</p>
            </div>
          </Link>
        ) : (
          <Link to={'/'}>
            <h1 className='font-semibold text-amber-600 text-2xl'>
              Delicious Menu
            </h1>
          </Link>
        )}

        {/* Cart */}
        {cartStatus && (
          <div className='flex justify-center items-center gap-4'>
            {orderId && (
              <Link to={`/order/${orderId}`}>
                <div className='p-2 border border-amber-500/30 rounded-xl text- text-sm cursor-pointer'>
                  Track order
                </div>
              </Link>
            )}
            <div
              className='group relative flex justify-center items-center hover:bg-amber-600 border-2 border-amber-600 rounded-full w-10 h-10 cursor-pointer'
              onClick={toggleCart}>
              <CiShoppingCart className='font-semibold group-hover:text-white text-2xl' />
              {(cartItem?.length || 0) > 0 && (
                <p className='-top-3 -right-1 absolute flex justify-center items-center bg-amber-500 rounded-full w-5 h-5 text-white text-sm'>
                  {cartItem.length}
                </p>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-xl transition-transform duration-300 z-50 flex flex-col 
              ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='relative p-4'>
          <h2 className='font-semibold text-xl'>Your Order</h2>
          <button
            onClick={toggleCart}
            className='-top-1 right-4 absolute p-1 text-2xl cursor-pointer'>
            ×
          </button>
        </div>

        {/* Cart Items Here */}
        {(cartItem?.length || 0) < 1 ? (
          <div className='flex flex-col justify-center items-center p-3 h-[80%] text-gray-400'>
            <CiShoppingCart className='font-extrabold text-6xl' />
            <p className='text-sm'>Your cart is empty</p>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 p-4 h-[900px] overflow-y-scroll'>
            {cartItem?.map((item) => (
              <div
                className='relative flex justify-start items-center gap-5 p-3 border-black/20 last:border-0 border-b w-full'
                key={item.id}>
                <img
                  src='/burger.jpg'
                  alt={item.name}
                  className='rounded-xl w-20 h-17'
                />
                <div className='flex flex-col gap-1.5'>
                  <p className='font-semibold text-[13px]'>{item.name}</p>
                  <p className='font-semibold text-[13px] text-amber-500'>
                    Rs{' '}
                    {item.discountedPrice ? item.discountedPrice : item.price}
                  </p>

                  <div className='flex justify-start items-center gap-2 rounded-xl'>
                    <button
                      className='hover:bg-amber-500 px-0.5 py-0.5 border border-black/30 hover:border-amber-500/50 rounded-md hover:text-white cursor-pointer'
                      onClick={() => decreaseQuantity(item.id)}>
                      <FiMinus className='text-[13px]' />
                    </button>
                    <p className='text-[13px]'>
                      {item.freeQuantity > 0
                        ? `${item.quantity} (+${item.freeQuantity})`
                        : item.quantity}
                    </p>
                    <button
                      className='hover:bg-amber-500 px-0.5 py-0.5 border border-black/30 hover:border-amber-500/50 rounded-md hover:text-white cursor-pointer'
                      onClick={() => increaseQuantity(item.id)}>
                      <FiPlus className='text-[13px]' />
                    </button>
                  </div>
                </div>
                <button
                  className='top-16 right-8 absolute cursor-pointer'
                  onClick={() => removeItemFromCart(item.id)}>
                  <MdOutlineDelete className='font-light text-amber-500' />
                </button>
              </div>
            ))}
          </div>
        )}

        {(cartItem?.length || 0) > 0 && (
          <div className='px-6 pb-6'>
            <div className='flex justify-between items-center pt-2 border-black/20 border-t text-black/40 text-sm'>
              <p>Subtotal</p>
              <p>Rs {subtotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-2 font-semibold'>
              <p>Total</p>
              <p>Rs {total.toFixed(2)}</p>
            </div>
            <Link to={'/checkout'}>
              <button className='bg-amber-500 p-2 rounded-xl w-full font-semibold text-white cursor-pointer'>
                Place Order
              </button>
            </Link>
          </div>
        )}
      </div>

      {isCartOpen && (
        <div
          onClick={toggleCart}
          className='z-40 fixed inset-0 backdrop-blur-sm brightness-50 overflow-hidden'></div>
      )}
    </>
  );
}
