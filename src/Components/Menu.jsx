import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import FoodCard from './FoodCard';
import axios from 'axios';
import Navbar from './Navbar';

export default function Menu() {
  const [activeId, setActiveId] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleMenuCategory(id) {
    setActiveId(id);
  }

  function handleCartItem(item) {
    setCartItem((cartItem) => {
      const existingItemIndex = cartItem.findIndex(
        (prevProduct) => prevProduct.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Product exists - increase quantity
        const updatedCart = [...cartItem];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // New product - add with quantity 1
        return [...cartItem, { ...item, quantity: 1 }];
      }
    });
  }

  const menuCategory = [
    {
      id: 0,
      link: 'All',
    },
    {
      id: 1,
      link: 'Appetizers',
    },
    {
      id: 2,
      link: 'Mains',
    },
    {
      id: 3,
      link: 'Desserts',
    },
    {
      id: 4,
      link: 'Drinks',
    },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        const data = res.data;
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch the products!', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar cartItem={cartItem} setCartItem={setCartItem} />

      <div className='relative flex flex-col justify-center items-center gap-18'>
        <IoIosSearch className='top-4 left-95 absolute text-2xl' />
        <input
          type='search'
          className='px-13 py-2 border border-amber-500/40 rounded-xl focus:outline-amber-500 w-[700px] h-14 text-sm'
          placeholder='Search for dishes...'
        />
        <ul className='flex justify-center items-center gap-6'>
          {menuCategory.map((item) => (
            <li
              key={item.id}
              className={
                activeId === item.id
                  ? `group bg-amber-500 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold text-white text-sm cursor-pointer`
                  : ' group hover:scale-105 transition-all duration-300 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold  text-sm cursor-pointer'
              }
              onClick={() => handleMenuCategory(item.id)}>
              {item.link}
            </li>
          ))}
        </ul>
        {loading ? (
          <div className='flex justify-center items-center h-full'>
            Loading...
          </div>
        ) : (
          <div className='gap-6 grid grid-cols-3 grid-flow-row'>
            {products?.map((item) => (
              <FoodCard
                details={item}
                key={item.id}
                handleCartItem={handleCartItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
