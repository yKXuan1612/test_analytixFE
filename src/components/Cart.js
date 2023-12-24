import { IoCartOutline } from "react-icons/io5";

function Cart({numItemsInCart = 0}) {
  return (
      <div className="h-fit w-fit flex justify-end">
          <div className="relative py-2">
              {
                    numItemsInCart > 0 && (
                      <div className="t-0 absolute left-3 text-white">
                          <p className="flex h-1 w-1 items-center justify-center rounded-full p-2 bg-secondary text-[11px] ">{numItemsInCart}</p>
                      </div>
                    )
              }
              <IoCartOutline size={29} className='text-white' />
          </div>
      </div>
  );
}

export default Cart;