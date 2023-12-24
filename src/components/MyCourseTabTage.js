import {Link, useLocation} from "react-router-dom";
import classnames from "classnames";
import {PATH} from '../constants/paths'

function MyCourseTabTage() {
    const location = useLocation()

    return (
      <div className="container m-auto text-white pt-5 h-fit">
          <div className='h-fit'>
              <p className='w-full font-semibold text-3xl py-8'>Quá trình học tập của tôi</p>
              <div className='flex gap-5 font-semibold text-gray-600'>
                  <Link to={PATH.MY_COURSE_LEARNING} className={classnames("py-2 hover:text-white cursor-pointer",
                      {"border-b-4 text-white":location.pathname.split('/')[2] === "learning"})}>
                      Tất cả khóa học
                  </Link>
                  <Link to='/' className="py-2 hover:text-white cursor-pointer">Khóa học đã lưu</Link>
                  <Link to='/' className="py-2 hover:text-white cursor-pointer">Tài liệu</Link>
              </div>
          </div>
      </div>
  );
}

export default MyCourseTabTage;