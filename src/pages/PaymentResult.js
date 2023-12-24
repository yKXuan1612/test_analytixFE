import {Link} from "react-router-dom";
import {PATH} from "../constants/paths";
import { CiCircleCheck } from "react-icons/ci";

function PaymentResult() {
  return (
      <div className="container m-auto h-auto text-white py-10">
        <div className="min-h-[500px] flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md">
                <div className="flex justify-center items-center">
                    <CiCircleCheck className="text-[#5E54F3]" size={50} />
                </div>
                <p className="text-center text-2xl font-semibold py-5 text-secondary ">Thanh toán thành công</p>
                <div className="flex justify-center items-center">
                    <Link to={PATH.HOME} className="bg-[#5E54F3] text-white font-semibold py-2 hover:opacity-80 cursor-pointer mt-5 w-full text-center"> Về trang chủ </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PaymentResult;