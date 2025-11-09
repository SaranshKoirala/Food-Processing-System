export default function Navbar({ children }) {
  return (
    <div class="col-span-10 bg-black border border-gray-100 flex items-center text-xl text-blue-50  ">
      <div class="flex justify-between w-full px-5">
        <div>
          <h1>Online Food Processing System</h1>
        </div>
        <div>
          <ul className="flex gap-4">
            <li>
              <a href="categories">Categories</a>
            </li>
            <li>
              <a href="products">Products</a>
            </li>
            <li>
              <a href="orders">Orders</a>
            </li>
            <li>
              <a href="offer">Offers</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
