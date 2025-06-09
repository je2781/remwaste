"use client";

import Image from "next/image";
import React from "react";
import useWindowWidth from "../utils/getWindowWidth";

type CardProps = {
  children: React.ReactNode;
  skip: any;
  handleSelect: (e: React.MouseEvent, id: string) => void;
};

export default function Card({ children, skip, handleSelect}: CardProps) {
  const width = useWindowWidth();

  return (
    <div onClick={(e) => handleSelect(e, skip.id)} className={`rounded-lg shadow-md space-y-4 border ${skip.selected ? 'border-orange-600' : 'border-gray-200'} hover:border-orange-600 p-6 cursor-pointer `}>
      <div className="group relative overflow-hidden rounded-lg shadow-xl">
        <span className="absolute px-3 py-1 rounded-3xl z-10 right-3 top-4 bg-orange-600 text-white text-sm">
          {skip.size}&nbsp;&nbsp;Yards
        </span>
        {!skip.allowed_on_road && <span className="font-sans text-xs absolute px-3 py-1 rounded-md z-10 left-2 bottom-2 bg-black text-yellow-500 flex gap-2 items-center">
          <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i><span>Not allowed on the road</span>
        </span>}
        <Image
          src="/5-yarder-skip.jpg"
          width={width >= 768 ? 340 : 400}
          height={45}
          alt="skip"
          className="object-cover transform transition-transform duration-500 group-hover:scale-125"
        />
      </div>
      {children}
    </div>
  );
}
