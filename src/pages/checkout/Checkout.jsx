import { useState } from 'react';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { GoHash } from 'react-icons/go';
import { LuUsers } from 'react-icons/lu';
import { LuFileText } from 'react-icons/lu';
import { FaRegCreditCard } from 'react-icons/fa6';
import { LuCreditCard } from 'react-icons/lu';
import { LuWallet } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';
import { useCart } from '../../Context/CartContext';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderType, setOrderType] = useState('dine-in');

  const { cartItem } = useCart();

  const subtotal =
    cartItem?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    e.preventDefault();
    alert('Order placed successfully! 🎉');
  };
  return (
    <div className='bg-amber-100/10 px-15 py-10 min-h-screen'>
      <div className='mx-auto px-4 py-8 max-w-5xl container'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='mb-2 font-bold text-foreground text-3xl'>Checkout</h1>
          <p className='text-muted-foreground text-sm'>
            Complete your order in a few simple steps
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
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
                  <label className='py-4 font-medium text-foreground text-base'>
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
                          className='bg-background py-2 pr-3 pl-10 border border-black/30 border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                        />
                      </div>
                    </div>
                  )}

                  <div className='space-y-2'>
                    <label
                      htmlFor='guests'
                      className='font-medium text-foreground text-sm'>
                      Number of Guests
                    </label>
                    <div className='relative'>
                      <LuUsers className='top-1/2 left-3 absolute w-3 h-3 text-muted-foreground -translate-y-1/2' />
                      <input
                        id='guests'
                        type='number'
                        min='1'
                        placeholder='e.g., 2'
                        className='bg-background py-2 pr-3 pl-10 border border-black/30 border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all'
                      />
                    </div>
                  </div>

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
                        rows={4}
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
                  {/* <ShoppingBag className='w-5 h-5 text-primary' /> */}
                  <LuShoppingBag className='w-5 h-5 text-amber-500' />

                  <h2 className='font-medium text-card-foreground text-xl'>
                    Order Summary
                  </h2>
                </div>

                <div className='space-y-4 mb-4'>
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
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className='my-4 border-black/30' />

                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-black/30 text-sm'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-black/30 text-sm'>
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr className='my-4 border-black/30' />

                <div className='flex justify-between mb-4 font-semibold text-xl'>
                  <span className='text-foreground'>Total</span>
                  <span className='text-primary'>${total.toFixed(2)}</span>
                </div>

                <button
                  type='submit'
                  className='bg-amber-500 hover:bg-white shadow-sm rounded-lg w-full h-12 font-semibold text-white hover:text-black transition-all cursor-pointer'>
                  Place Order
                </button>

                <p className='mt-4 text-muted-foreground text-xs text-center'>
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
