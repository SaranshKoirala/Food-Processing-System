import { useEffect, useState } from 'react';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { CiUser } from 'react-icons/ci';
import { GoHash } from 'react-icons/go';
import { LuFileText } from 'react-icons/lu';
import { FaRegCreditCard } from 'react-icons/fa6';
import { LuCreditCard } from 'react-icons/lu';
import { LuWallet } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';
import { GiMoneyStack } from 'react-icons/gi';
import { useCart } from '../../Context/CartContext';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const { cartItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderType, setOrderType] = useState('dine-in');
  const [tableNumber, setTableNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();
  const navigate = useNavigate();

  const subtotal =
    cartItem?.reduce((total, item) => {
      const priceToUse = item.discountedPrice ?? item.price;
      return total + priceToUse * item.quantity;
    }, 0) || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  async function handlePlaceOrder(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:8000/api/orders', {
        table_number: parseInt(tableNumber),
        items: cartItem.map((item) => ({
          product_id: item.id || item.product_id, // Use the correct field
          quantity: item.quantity || 1,
        })),
      });
      // setCurrentOrder(res.data);
      navigate(`/order/${res.data.order_id}`);
      console.log(res.data);
    } catch (err) {
      console.error('Failed to fetch the products!', err);
    } finally {
      setLoading(false);
      // clearCart();
    }
  }

  const recommendedProduct = [
    {
      id: 1,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 2,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 3,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 4,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
  ];
  return (
    <>
      <Navbar backStatus={true} cartStatus={false} />
      <div className='bg-amber-100/10 px-15 min-h-screen'>
        <div className='mx-auto px-4 max-w-5xl container'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='mb-2 font-bold text-foreground text-3xl'>
              Checkout
            </h1>
            <p className='text-muted-foreground text-sm'>
              Complete your order in a few simple steps
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className='mb-8'>
            <div className='gap-8 grid lg:grid-cols-3'>
              {/* Main Form */}
              <div className='space-y-6 lg:col-span-2'>
                {/* Order Details */}
                <div className='bg-card bg-white shadow-sm p-6 border border-black/30 rounded-xl'>
                  <div className='flex items-center gap-2 mb-2'>
                    {/* <UtensilsCrossed className='w-5 h-5 text-primary' /> */}
                    <LuUtensilsCrossed className='w-5 h-5 text-amber-500 text-primary' />
                    <h2 className='font-semibold text-card-foreground text-xl'>
                      Order Details
                    </h2>
                  </div>

                  {/* Order Type */}

                  <div className='mb-4'>
                    <label className='py-4 font-medium text-sm'>
                      Order Type
                    </label>
                    <div className='gap-4 grid md:grid-cols-2'>
                      <label className='flex items-center space-x-3 hover:bg-muted/50 px-4 py-2 border border-black/30 rounded-lg transition-colors cursor-pointer'>
                        <input
                          type='radio'
                          name='orderType'
                          value='dine-in'
                          checked={orderType === 'dine-in'}
                          onChange={(e) => setOrderType(e.target.value)}
                          className='w-4 h-4 text-primary accent-primary'
                        />
                        <span className='flex-1 text-foreground'>Dine In</span>
                      </label>
                      <label className='flex items-center space-x-3 hover:bg-muted/50 px-4 py-2 border border-black/30 rounded-lg transition-colors cursor-pointer'>
                        <input
                          type='radio'
                          name='orderType'
                          value='takeaway'
                          checked={orderType === 'takeaway'}
                          onChange={(e) => setOrderType(e.target.value)}
                          className='w-4 h-4 text-primary accent-primary'
                        />
                        <span className='flex-1 text-foreground'>Takeaway</span>
                      </label>
                    </div>
                  </div>

                  <div className='gap-4 grid md:grid-cols-2'>
                    {orderType === 'dine-in' && (
                      <div className='space-y-2'>
                        <label
                          htmlFor='tableNumber'
                          className='font-medium text-foreground text-sm'>
                          Table Number
                        </label>
                        <div className='relative'>
                          <GoHash className='top-1/2 left-3 absolute w-3 h-3 text-muted-foreground -translate-y-1/2' />

                          <input
                            id='tableNumber'
                            type='text'
                            placeholder='e.g., 12'
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className='bg-background py-2 pr-3 pl-10 border border-black/30 border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                          />
                        </div>
                      </div>
                    )}

                    <div className='space-y-2 md:col-span-2'>
                      <label
                        htmlFor='specialInstructions'
                        className='font-medium text-foreground text-sm'>
                        Special Instructions (Optional)
                      </label>
                      <div className='relative'>
                        <LuFileText className='top-3 left-3 absolute w-4 h-4 text-muted-foreground' />
                        <textarea
                          id='specialInstructions'
                          placeholder='Any dietary preferences, allergies, or special requests...'
                          rows={1}
                          className='bg-background py-2 pr-3 pl-10 border border-black/30 border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all resize-none'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className='bg-card bg-white shadow-sm p-6 border border-black/30 rounded-xl'>
                  <div className='flex items-center gap-2 mb-4'>
                    <FaRegCreditCard className='w-5 h-5 text-amber-500' />
                    <h2 className='font-medium text-card-foreground text-xl'>
                      Payment Method
                    </h2>
                  </div>
                  <div className='space-y-3'>
                    <label className='flex items-center space-x-3 hover:bg-muted/50 p-4 border border-black/30 rounded-lg transition-colors cursor-pointer'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='card'
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className='w-4 h-4 text-primary accent-primary'
                      />

                      <LuCreditCard className='w-5 h-5 text-primary' />

                      <span className='flex-1 text-foreground'>
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className='flex items-center space-x-3 hover:bg-muted/50 p-4 border border-black/30 rounded-lg transition-colors cursor-pointer'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='wallet'
                        checked={paymentMethod === 'wallet'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className='w-4 h-4 text-primary accent-primary'
                      />

                      <LuWallet className='w-5 h-5 text-primary' />
                      <span className='flex-1 text-foreground'>
                        Digital Wallet
                      </span>
                    </label>
                    <label className='flex items-center space-x-3 hover:bg-muted/50 p-4 border border-black/30 rounded-lg transition-colors cursor-pointer'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='cash'
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className='w-4 h-4 text-primary accent-primary'
                      />
                      <GiMoneyStack className='w-5 h-5 text-primary' />
                      <span className='flex-1 text-foreground'>Cash</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className='space-y-4 mt-6 animate-fade-in'>
                      <div className='space-y-2'>
                        <label
                          htmlFor='cardNumber'
                          className='font-medium text-foreground text-sm'>
                          Card Number
                        </label>
                        <input
                          id='cardNumber'
                          type='text'
                          placeholder='1234 5678 9012 3456'
                          className='bg-background px-3 py-2 border border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                        />
                      </div>
                      <div className='gap-4 grid grid-cols-2'>
                        <div className='space-y-2'>
                          <label
                            htmlFor='expiry'
                            className='font-medium text-foreground text-sm'>
                            Expiry Date
                          </label>
                          <input
                            id='expiry'
                            type='text'
                            placeholder='MM/YY'
                            className='bg-background px-3 py-2 border border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                          />
                        </div>
                        <div className='space-y-2'>
                          <label
                            htmlFor='cvv'
                            className='font-medium text-foreground text-sm'>
                            CVV
                          </label>
                          <input
                            id='cvv'
                            type='text'
                            placeholder='123'
                            maxLength={3}
                            className='bg-background px-3 py-2 border border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className='lg:col-span-1'>
                <div className='top-8 sticky bg-card bg-white shadow-sm p-6 border border-black/30 rounded-xl'>
                  <div className='flex items-center gap-2 mb-4'>
                    <LuShoppingBag className='w-5 h-5 text-amber-500' />

                    <h2 className='font-medium text-card-foreground text-xl'>
                      Order Summary
                    </h2>
                  </div>

                  <div className='space-y-4 mb-4 h-32 overflow-y-scroll'>
                    {cartItem.map((item) => (
                      <div key={item.id} className='flex gap-3'>
                        <div className='flex justify-center items-center bg-black/10 rounded-lg w-12 h-12 text-2xl'>
                          {item.image}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-sm truncate'>
                            {item.name}
                          </h3>
                          <p className='text-[13px] text-muted-foreground'>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className='font-medium text-primary text-sm'>
                          Rs{' '}
                          {item.discountedPrice
                            ? item.discountedPrice * item.quantity
                            : (item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className='my-4 border-black/30' />

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between text-black/30 text-sm'>
                      <span>Subtotal</span>
                      <span>Rs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between text-black/30 text-sm'>
                      <span>Tax (10%)</span>
                      <span>Rs {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <hr className='my-4 border-black/30' />

                  <div className='flex justify-between mb-4 font-semibold text-xl'>
                    <span className='text-foreground'>Total</span>
                    <span className='text-primary'>${total.toFixed(2)}</span>
                  </div>

                  <button
                    type='submit'
                    disabled={!tableNumber || !paymentMethod}
                    className={`bg-amber-500 hover:bg-white shadow-sm rounded-lg w-full h-12 font-semibold text-white hover:text-black transition-all cursor-pointer ${
                      loading ? 'animate-ping' : ''
                    }`}>
                    {loading ? 'Submiting Order' : 'Place Order'}
                  </button>

                  <p className='mt-4 text-muted-foreground text-xs text-center'>
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </form>
          <div className='self-start'>
            <p className='mb-4 text-xl'>You may also like </p>
            <ul className='flex justify-start items-center gap-4 list-none'>
              {recommendedProduct.map((product) => (
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
