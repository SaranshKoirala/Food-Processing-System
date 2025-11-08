import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import FoodCard from './FoodCard';

export default function Menu() {
  const [activeId, setActiveId] = useState(0);

  function handleMenuCategory(id) {
    setActiveId(id);
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

  const foodDetails = [
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 111,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
  ];
  return (
    <div>
      <nav className='flex justify-between items-center bg-card/80 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.25)] mb-15 px-7 py-5'>
        <h1 className='font-semibold text-amber-600 text-3xl'>
          Delicious Menu
        </h1>
        <p>Logo</p>
      </nav>
      <div className='relative flex flex-col justify-center items-center gap-18'>
        <IoIosSearch className='top-4 left-110 absolute text-2xl' />
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
        <div className='gap-6 grid grid-cols-3 grid-flow-row'>
          {foodDetails.map((item) => (
            <FoodCard details={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
