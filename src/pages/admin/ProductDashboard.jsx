import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductSummaryCard from "../../Components/ProductSummaryCard";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import ProductSalesBarChart from "../../charts/ProductSalesBarChart";
import OutOfStockProducts from "../../Components/OutOfStockProducts";

export default function ProductDashboard() {
  const today = new Date();
  const [dateRange, setDateRange] = useState([today, today]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="max-h-[90vh] bg-gray-100 py-10 px-10 overflow-y-auto font-sans">
      {/* Header with Title + DatePicker flex */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Product Dashboard
          </h1>
          <p className="text-gray-500 text-base">
            View product analytics and summary
          </p>
        </div>

        {/* DatePicker aligned to right, small input */}
        <div className="">
          <CalendarIcon className="text-gray-400 text-base pointer-events-none z-10 " />
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select range"
            className="w-full  py-2 text-sm border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 hover:border-gray-300 transition-all"
            dateFormat="MMM dd, yyyy"
          />
        </div>
      </div>

      {/* Product Summary Card */}
      {startDate && endDate && (
        <div className="mt-10">
          <ProductSummaryCard dateFrom={startDate} dateTo={endDate} />
          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 place-items-center">
            <OutOfStockProducts />
            <ProductSalesBarChart dateFrom={startDate} dateTo={endDate} />
          </div>
        </div>
      )}

      {/* Custom React DatePicker Styles */}
      <style>{`
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e0e0e0;
          border-radius: 0.75rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        .react-datepicker__header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-bottom: none;
          border-radius: 0.75rem 0.75rem 0 0;
          padding: 1rem 0;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white;
          font-weight: 600;
        }
        .react-datepicker__day {
          color: #424242;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }
        .react-datepicker__day:hover {
          background-color: #667eea15;
          color: #667eea;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-range,
        .react-datepicker__day--range-start,
        .react-datepicker__day--range-end {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #667eea20;
          color: #667eea;
        }
        .react-datepicker__navigation-icon::before {
          border-color: white;
        }
        .react-datepicker__navigation:hover *::before {
          border-color: white;
        }
        .react-datepicker__close-icon::after {
          background-color: #667eea;
          font-size: 18px;
          padding: 2px;
        }
        .react-datepicker__close-icon:hover::after {
          background-color: #5568d3;
        }
        .react-datepicker__day--today {
          font-weight: 600;
          border: 2px solid #667eea;
        }
      `}</style>
    </div>
  );
}
