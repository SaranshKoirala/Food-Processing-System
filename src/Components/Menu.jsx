import { useCallback, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import FoodCard from './FoodCard';
import axios from 'axios';
import Navbar from './Navbar';

export default function Menu() {
  const [courseId, setCourseId] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [input, setInput] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const menuCourses = [
    { id: 0, link: 'all' },
    { id: 1, link: 'appetizer' },
    { id: 2, link: 'main' },
    { id: 3, link: 'dessert' },
  ];

  const menuCategory = [
    { id: 0, link: 'veg' },
    { id: 1, link: 'non-veg' },
    { id: 2, link: 'drinks' },
  ];

  function handleMenuCourses(id, course) {
    setCourseId(id);
    setSelectedCourse(course);
    setSelectedCategory(null);
    setCategoryId(null);
    setInput(''); // Clear search if filtering
  }

  function handleMenuCategory(id, category) {
    setCategoryId(id);
    setSelectedCategory(category);
    setSelectedCourse(null);
    setCourseId(0);
    setInput('');
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delay);
  }, [input, selectedCourse, selectedCategory]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let res;
      let data = [];

      if (input.trim()) {
        // 🔍 Search API
        res = await axios.get(
          `http://127.0.0.1:8000/api/products/search?q=${input}`
        );
        data = res.data.results || [];
      } else if (selectedCategory) {
        // 🍃 Filter by category
        res = await axios.get(
          `http://127.0.0.1:8000/api/e/foodtype/products/${selectedCategory}`
        );
        data = Array.isArray(res.data) ? res.data : res.data.products || [];
      } else if (selectedCourse && selectedCourse !== 'all') {
        // 🍽 Filter by course
        res = await axios.get(
          `http://127.0.0.1:8000/api/f/coursetype/products/${selectedCourse}`
        );
        data = Array.isArray(res.data) ? res.data : res.data.products || [];
      } else {
        // 🟢 Load all products
        res = await axios.get('http://127.0.0.1:8000/api/products');
        data = Array.isArray(res.data) ? res.data : res.data.products || [];
      }

      setProducts(data);
    } catch (err) {
      console.error('Fetch failed:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [input, selectedCourse, selectedCategory]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delay);
  }, [fetchProducts]);

  return (
    <div>
      <Navbar backStatus={false} cartStatus={true} />

      <div className='relative flex flex-col justify-center items-center gap-15 py-4'>
        <IoIosSearch className='top-8 left-95 absolute text-2xl' />

        <input
          type='search'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='px-13 py-2 border border-amber-500/40 rounded-xl focus:outline-amber-500 w-[700px] h-14 text-sm'
          placeholder='Search for dishes...'
        />

        <ul className='relative flex justify-center items-center gap-6'>
          {menuCourses.map((item) => (
            <li
              key={item.id}
              className={
                courseId === item.id
                  ? 'bg-amber-500 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold text-white text-sm cursor-pointer'
                  : 'hover:scale-105 transition-all duration-300 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold text-sm cursor-pointer'
              }
              onClick={() => handleMenuCourses(item.id, item.link)}>
              {item.link.charAt(0).toUpperCase() + item.link.slice(1)}
            </li>
          ))}

          <div
            className={`top-10 -right-90 absolute flex justify-center items-center gap-2 px-3 py-1 w-28 text-sm cursor-pointer ${
              isOpen ? 'border-none' : 'border border-black/50'
            }`}
            onClick={() => setIsOpen((open) => !open)}>
            {selectedCategory
              ? selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              : 'Category'}{' '}
            {!isOpen ? <FaAngleDown /> : <FaAngleUp />}
            {isOpen && (
              <div
                className='top-7 z-100 absolute flex flex-col gap-2 bg-white p-2 border border-black/50 w-full'
                onClick={(e) => e.stopPropagation()}>
                {menuCategory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleMenuCategory(item.id, item.link);
                      setIsOpen(false);
                    }}>
                    {item.link.charAt(0).toUpperCase() + item.link.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ul>

        {loading ? (
          <div className='flex justify-center items-center h-full'>
            Loading...
          </div>
        ) : (
          <div className='gap-6 grid grid-cols-3'>
            {products?.map((item) => (
              <FoodCard details={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
