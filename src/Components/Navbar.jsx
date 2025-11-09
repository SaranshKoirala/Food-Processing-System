import { useEffect, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';

export default function Navbar({ cartItem, setCartItem }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleCart() {
    setIsCartOpen((open) => !open);
  }

  function decreaseQuantity(productId) {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function increaseQuantity(productId) {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function removeItemFromCart(productId) {
    setCartItem((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  const totalPrice =
    cartItem?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

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
      <nav className='flex justify-between items-center bg-card/80 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.25)] mb-15 px-7 py-5'>
        <h1 className='font-semibold text-amber-600 text-3xl'>
          Delicious Menu
        </h1>

        {/* Cart */}
        <div
          className='group relative flex justify-center items-center hover:bg-amber-600 border-2 border-amber-600 rounded-full w-10 h-10 cursor-pointer'
          onClick={toggleCart}>
          <CiShoppingCart className='font-semibold group-hover:text-white text-2xl' />
          {(cartItem?.length || 0) > 0 ? (
            <p className='-top-3 -right-1 absolute flex justify-center items-center bg-amber-500 rounded-full w-5 h-5 text-white text-sm'>
              {cartItem.length}
            </p>
          ) : (
            <></>
          )}
        </div>
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
                    Rs {item.price}
                  </p>

                  <div className='flex justify-center items-center gap-2 rounded-xl'>
                    <button
                      className='hover:bg-amber-500 px-0.5 py-0.5 border border-black/30 hover:border-amber-500/50 rounded-md hover:text-white cursor-pointer'
                      onClick={() => {
                        decreaseQuantity(item.id);
                      }}>
                      <FiMinus className='text-[13px]' />
                    </button>
                    <p className='text-[13px]'>{item.quantity}</p>
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
              <p>{totalPrice.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-2 font-semibold'>
              <p>Total</p>
              <p>{totalPrice.toFixed(2)}</p>
            </div>
            <button className='bg-amber-500 p-2 rounded-xl w-full font-semibold text-white'>
              Place Order
            </button>
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
