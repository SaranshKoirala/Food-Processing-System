import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='relative w-screen h-screen overflow-hidden text-white'>
      <img
        src='/hero-dish.jpg'
        className='brightness-50 w-full h-full object-center object-cover'
        alt='background'
      />
      <Link to={'/admin/dashboard'}>
        <div className='top-4 right-10 absolute font-semibold cursor-pointer'>
          Admin
        </div>
      </Link>
      <div className='top-70 left-40 absolute flex flex-col items-start -gap-2 text-2xl'>
        <h2 className='font-extrabold text-8xl'>Delicious Moments</h2>
        <p className='mb-5 w-[650px] font-extralight'>
          Experience culinary excellence with our carefully crafted dishes
        </p>
        <Link to={'/menu'}>
          <button className='bg-amber-600 px-4 py-2 rounded-2xl text-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
            Explore Menu{' '}
          </button>
        </Link>
      </div>
    </div>
  );
}
