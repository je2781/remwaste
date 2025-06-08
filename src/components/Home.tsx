"use client";

import React from "react";
import Card from "./ui/Card";

export default function HomeComponent() {
  const [skipData, setSkipData] = React.useState<any[]>([]);

  const chooseSelected = (e: React.MouseEvent, id: string) => {
    const modal = document.getElementById('progress-modal');

    if(modal){
      modal.classList.remove('translate-y-[100%]');
      modal.classList.add('translate-y-0'); 
    }

    const updatedSkipData = skipData.map((skip: any) => {
      if (skip.id === id) {
        return { ...skip, selected: true }; // Add or update `selected` key
      }
      return { ...skip, selected: false };
    });
    setSkipData(updatedSkipData);
  };

  React.useEffect(() => {
    async function getSkipData() {
      const res = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );

      const data = await res.json();
      setSkipData(data);
    }

    getSkipData();
  }, []);

  return (
    <>
      <main
        role="main"
        className="min-h-screen font-impact w-full mx-auto container space-y-12 flex flex-col pb-7 md:pt-14 pt-3 px-4 lg:pl-0 lg:pr-6"
      >
        <header className="space-y-3 flex w-full flex-col items-center">
          <h1 className="md:text-3xl text-xl text-red-800">
            Choose Your Skip Size
          </h1>
          <h3 className="text-[16px] text-gray-400">
            Select the skip size that best suits your needs
          </h3>
        </header>
        <section className="flex flex-wrap md:gap-10 gap-6">
          {skipData.map((skip: any, i: number) => (
            <Card key={i} skip={skip} handleSelect={chooseSelected}>
              <div>
                <h1 className="text-xl text-red-800">{skip.size} Yard Skip</h1>
                <h3 className="text-[16px] text-gray-400">
                  {skip.hire_period_days} day hire period
                </h3>
              </div>
              <h1 className="text-xl text-red-800">
                &#163;
                {Number(skip.price_before_vat + skip.vat).toLocaleString(
                  "en-GB"
                )}
              </h1>
              {skip.selected ? (
                <button
                  type="button"
                  className="cursor-pointer group hover:ring-1 ring-red-800 transition-all duration-300 ease-in-out bg-red-800 w-full py-4 text-white rounded-lg"
                >
                  Selected
                </button>
              ) : (
                <button
                  type="button"
                  className="cursor-pointer group bg-gray-400 w-full hover:ring-1 ring-gray-400 transition-all ease-in-out duration-300 py-4 text-white rounded-lg flex gap-2 items-center justify-center"
                >
                  <span>Select This Skip</span>
                  <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out relative group-hover:translate-x-1"></i>
                </button>
              )}
            </Card>
          ))}
        </section>
      </main>
      <div id='progress-modal' className="py-6 md:px-10 px-8 transform transition-transform ease-in-out duration-400 text-center space-y-8 bg-gray-400 text-white translate-y-[100%] z-50 h-auto fixed bottom-0 left-0 w-full">
        <p className="text-sm">
          Imagery and information shown throughout this website may not reflect
          the exact shape or size specification, colours may vary, options
          and/or accessories may be featured at additional cost.
        </p>
        <div className="flex flex-row items-center md:justify-between justify-center w-full">
          <div className="inline-flex"></div>
          <div className="inline-flex text-white gap-4">
            <button type="button" className="rounded-lg cursor-pointer bg-white hover:ring-1 ring-white transition-all duration-300 ease-in-out px-4 py-2 text-black">Back</button>
            <button type="button" className="bg-red-800 hover:ring-1 transtion-all duration-300 ease-in-out ring-red-800 px-5 py-2 rounded-lg cursor-pointer group flex gap-2 items-center justify-center">
              <span>Continue</span>
              <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out relative group-hover:translate-x-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
