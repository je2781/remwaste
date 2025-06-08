"use client";

import React from "react";
import Card from "./ui/Card";

export default function HomeComponent() {
  const [skipData, setSkipData] = React.useState<any[]>([]);
  const [selectedSkip, setSelectedSkip] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);

  const chooseSelected = (e: React.MouseEvent, id: string) => {
    const modal = document.getElementById("progress-modal");

    if (modal) {
      modal.classList.remove("translate-y-[100%]");
      modal.classList.add("translate-y-0");
    }

    const updatedSkipData = skipData.map((skip: any) => {
      if (skip.id === id) {
        return { ...skip, selected: true }; // Add or update `selected` key
      }
      return { ...skip, selected: false };
    });
    setSkipData(updatedSkipData);
    setSelectedSkip(updatedSkipData.find((skip) => skip.id === id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    async function getSkipData() {
      const res = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );

      const data = await res.json();
      setSkipData(data);
      setIsLoading(false);
    }

    getSkipData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-y-2 bg-white h-screen w-full md:px-16 px-8 md:pt-12 pt-5 ">
          <h1 className="font-sans text-orange-600">getting data...</h1>
          <span className="border-4 border-transparent rounded-full border-t-orange-600 border-r-orange-600 w-[36px] h-[36px] spin"></span>
        </div>
      ) : (
        <main
          role="main"
          className="min-h-screen font-impact w-full mx-auto container space-y-12 flex flex-col items-center pb-7 md:pt-14 pt-3 px-4 lg:px-3"
        >
          <header className="space-y-3 flex w-full flex-col items-center">
            <h1 className="md:text-3xl text-2xl text-orange-600">
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
                  <h1 className="md:text-xl text-lg text-orange-600">
                    {skip.size} Yard Skip
                  </h1>
                  <h3 className="md:text-[16px] text-sm text-gray-400">
                    {skip.hire_period_days} day hire period
                  </h3>
                </div>
                <h1 className="text-xl text-orange-600">
                  &#163;
                  {Number(skip.price_before_vat + skip.vat).toLocaleString(
                    "en-GB"
                  )}
                </h1>
                {skip.selected ? (
                  <button
                    type="button"
                    className="cursor-pointer group hover:ring-1 ring-orange-600 transition-all duration-300 ease-in-out bg-orange-600 w-full py-4 text-white rounded-lg"
                  >
                    Selected
                  </button>
                ) : (
                  <button
                    type="button"
                    className="cursor-pointer group bg-[#10131c] w-full hover:ring-1 ring-[#10131c] transition-all ease-in-out duration-300 py-4 text-white rounded-lg flex gap-2 items-center justify-center"
                  >
                    <span>Select This Skip</span>
                    <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out relative group-hover:translate-x-1"></i>
                  </button>
                )}
              </Card>
            ))}
          </section>
        </main>
      )}
      <div
        id="progress-modal"
        className="py-6 md:px-10 px-8 transform transition-transform ease-in-out duration-400 text-center space-y-8 bg-[#10131c] text-white translate-y-[100%] z-50 h-auto fixed bottom-0 left-0 w-full"
      >
        <p className="text-sm ">
          Imagery and information shown throughout this website may not reflect
          the exact shape or size specification, colours may vary, options
          and/or accessories may be featured at additional cost.
        </p>
        <div className="flex font-impact md:flex-row flex-col items-center md:justify-between justify-center w-full gap-4">
          {selectedSkip && (
            <div className="bg-white px-3 py-2 rounded-lg text-black font-light">
              {selectedSkip.size}&nbsp;Yard Skip&nbsp;
              <span className="text-orange-600">
                <span className="font-sans font-semibold">(</span>
                <span>
                  &#163;
                  {Number(
                    selectedSkip.price_before_vat + selectedSkip.vat
                  ).toLocaleString("en-GB")}
                </span>
                <span className="font-sans font-semibold">)</span>
              </span>
            </div>
          )}
          <div className="inline-flex text-white gap-4 md:w-fit w-full">
            <button
              type="button"
              className="md:w-fit w-[50%] rounded-lg cursor-pointer bg-white hover:ring-1 ring-white transition-all duration-300 ease-in-out px-4 py-2 text-black"
            >
              Back
            </button>
            <button
              type="button"
              className="bg-orange-600 md:w-fit w-[50%] hover:ring-1 transtion-all duration-300 ease-in-out ring-orange-600 px-5 py-2 rounded-lg cursor-pointer group flex gap-2 items-center justify-center"
            >
              <span>Continue</span>
              <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out relative group-hover:translate-x-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
