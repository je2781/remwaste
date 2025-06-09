import ReactDOM from "react-dom";
import Image from "next/image";

const BackDrop = (props: any) => {
  return <div className='fixed z-40 bg-black/60 top-0 h-screen w-full left-0' onClick={props.onClick}></div>;
};


const MobileModalOverlay = (props: any) => {
  return (
    <main id='mobile-nav' aria-orientation="vertical" className={`px-6 pt-24 bg-white z-[45] w-3/5 flex-col pb-12 gap-y-6 h-full flex fixed top-0 left-0`}>
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
      <Image src='/REMWaste.png' width={48} height={48} alt='logo' className="cursor-pointer rounded-md inline-block absolute left-5 top-5"/>
    </main>
  );
};


export const MobileModal = (props: any) => {
    return (
      <>
        {ReactDOM.createPortal(
          <BackDrop onClick={props.onClose}/>,
          document.getElementById("backdrop-root")!
        )}
        {ReactDOM.createPortal(
          <MobileModalOverlay onClick={props.onClose} classes={props.classes}>{props.children}</MobileModalOverlay>,
          document.getElementById("mobile-modal")!
        )}
      </>
    );
  };


