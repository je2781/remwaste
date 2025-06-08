"use client";

import Image from "next/image";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  skip: any;
  handleSelect: (e: React.MouseEvent, id: string) => void;
};

export default function Card({ children, skip, handleSelect}: CardProps) {


  return (
    <div onClick={(e) => handleSelect(e, skip.id)} className={`rounded-lg shadow-md space-y-4 border ${skip.selected ? 'border-red-800' : 'border-gray-200'} hover:border-red-800 p-6 cursor-pointer relative`}>
      <span className="absolute px-3 py-1 rounded-3xl z-10 right-10 top-10 bg-red-800 text-white text-sm hover:scale-105 transition-all ease-linear duration-300">
        {skip.size}&nbsp;&nbsp;Yards
      </span>
      {!skip.allowed_on_road && <span className="font-sans text-xs absolute px-3 py-1 rounded-md z-10 left-8 bottom-[47%] bg-black text-yellow-500 hover:scale-105 transition-all ease-linear duration-300 flex gap-2 items-center">
        <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i><span>Not allowed on the road</span>
      </span>}
      <div className="group relative overflow-hidden rounded-lg shadow-xl">
        <Image
          src="/5-yarder-skip.jpg"
          width={340}
          height={45}
          alt="skip"
          className="object-cover transform transition-transform duration-500 group-hover:scale-125"
        />
      </div>
      {children}
    </div>
  );
}
