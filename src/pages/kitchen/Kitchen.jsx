import Navbar from '../../Components/Navbar';
import { FaKitchenSet } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { LuCookingPot } from 'react-icons/lu';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineDone } from 'react-icons/md';
import { useState } from 'react';

export default function Kitchen() {
  const [activeId, setActiveId] = useState(0);

  function handleFoodStatus(id) {
    setActiveId(id);
  }
  const foodStatus = [
    {
      id: 0,
      link: 'All Order',
      logo: '',
    },
    {
      id: 1,
      link: 'New Order',
      logo: <IoMdTime className='font-bold text-lg' />,
    },
    {
      id: 2,
      link: 'Preparing',
      logo: <LuCookingPot className='font-bold text-lg' />,
    },
    {
      id: 3,
      link: 'Ready',
      logo: <FiPackage className='font-bold text-lg' />,
    },
    {
      id: 4,
      link: 'Completed',
      logo: <MdOutlineDone className='font-bold text-lg' />,
    },
  ];
  return (
    <div className='bg-amber-500/5'>
      <Navbar backStatus={true} cartStatus={false} />
      <div className='px-17'>
        <div className='flex justify-start items-center gap-4 mb-10 w-fit text-amber-500'>
          <FaKitchenSet className='text-6xl' />
          <div>
            <h1 className='font-bold text-4xl'>Kitchen Dashboard</h1>
            <p className='text-black/40'>
              Manage and track all orders in real-time
            </p>
          </div>
        </div>

        <ul className='flex justify-start items-center gap-8 mb-10 font-medium text-sm'>
          {foodStatus.map((item) => (
            <li
              key={item.id}
              className={
                activeId === item.id
                  ? `group bg-amber-500 px-3 py-2 border border-amber-500/20 rounded-xl  text-white cursor-pointer flex justify-center items-center gap-2 w-35`
                  : ' group hover:scale-105 transition-all duration-300 px-4 py-2 border border-amber-500 rounded-xl  text-sm cursor-pointer w-35 flex justify-center items-center gap-2 bg-white'
              }
              onClick={() => handleFoodStatus(item.id)}>
              {item.logo}
              <p>{item.link}</p>
            </li>
          ))}
        </ul>
        <div className='flex justify-center items-center bg-white border border-amber-500 border-dashed rounded-2xl w-full h-70'>
          <div className='flex flex-col justify-center items-center gap-3 text-black/50'>
            <FaKitchenSet className='text-6xl' />
            <p>No Orders Yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
