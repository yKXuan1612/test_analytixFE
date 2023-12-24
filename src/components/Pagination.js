import {MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import {useEffect, useState} from "react";
import classnames from "classnames";

function Pagination({ totalPage, currentPage, onPageChange }) {
    const pagesToShow = 5; // Số trang tối đa để hiển thị trong một nhóm
    const totalPages = Math.ceil(totalPage / pagesToShow);
    const [currentGroup, setCurrentGroup] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);



    useEffect(() => {
        const startPage = (currentGroup - 1) * pagesToShow + 1;
        const endPage = Math.min(currentGroup * pagesToShow, totalPage);
        const pageNumbersState = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
        setPageNumbers(pageNumbersState);
    },[currentGroup, totalPage, pagesToShow]);

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const handleGroupChange = (newGroup) => {
        setCurrentGroup(newGroup);
    };


    return (
      <nav aria-label="navigation">
          <ul className="inline-flex space-x-2 text-sm">
              {currentGroup > 1 && (
                  <li className='cursor-pointer' onClick={() => handleGroupChange(currentGroup - 1)} >
                      <div href="#"
                         className="flex items-center bg-primary justify-center rounded-full px-3 h-8 leading-tight text-white hover:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                          <MdOutlineKeyboardDoubleArrowLeft size={25} />
                      </div>
                  </li>
              )}

              {pageNumbers.map((pageNumber) => (
                  <li className='cursor-pointer' onClick={() => handlePageChange(pageNumber)} key={pageNumber}>
                      <div className={ classnames({'bg-gradient-to-r from-pink-500 via-[#F74986] to-white rounded-full p-[1px]' : pageNumber === currentPage}) }>
                          <div
                             className="flex items-center bg-primary justify-center rounded-full px-3 h-8 leading-tight text-white hover:text-gray-300">
                                {pageNumber}
                          </div>
                      </div>
                  </li>
                  )
              )}

              {currentGroup < totalPages && (
                  <li className='cursor-pointer' onClick={() => handleGroupChange(currentGroup + 1)}>
                      <div
                         className="flex items-center bg-primary justify-center rounded-full px-3 h-8 leading-tight text-white hover:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                          <MdOutlineKeyboardDoubleArrowRight size={25} />
                      </div>
                  </li>
              )}
          </ul>
      </nav>
  );
}

export default Pagination;