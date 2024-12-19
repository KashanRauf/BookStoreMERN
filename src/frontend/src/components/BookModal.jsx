import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const BookModal = ({ book, onClose }) => {
  return (
    <div onClick={onClose} className="flex justify-center items-center fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 cursor-default">
        <div onClick={(event) => event.stopPropagation()} className="bg-white rounded-xl w-[40%] h-[50%] p-4 flex flex-col relative">
            <AiOutlineClose onClick={onClose} className="text-red-600 text-3xl absolute right-6 top-6 cursor-pointer"/>
            <h4 className="rounded-lg bg-red-300 w-fit px-2 py-1">{book.publishYear}</h4>
            <h2 className="my-2 text-gray-500">{book._id}</h2>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2xl" />
                <h2 className="my-1">{book.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2xl" />
                <h2 className="my-1">{book.author}</h2>
            </div>
            <p className="mt-4">Book Information</p>
            <p className="my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et mollis erat, sed vehicula libero. Aenean sit amet consectetur nisl. Morbi vulputate posuere fringilla. Nulla varius mi in lacus dapibus fermentum. Quisque nec dictum quam. Donec iaculis vehicula aliquet. Etiam ornare erat libero, id tempus enim laoreet sit amet. Aliquam consectetur, justo et accumsan mattis, lorem augue dictum arcu, at pharetra nisl leo ut felis. Maecenas fermentum, eros eget imperdiet faucibus, est erat posuere dui, sagittis tincidunt erat diam id nibh. Morbi non lacus velit. Morbi vitae porta libero, quis viverra purus. Donec semper risus turpis, cursus imperdiet libero blandit at.
            </p>
        </div>
    </div>
  );
};

export default BookModal;