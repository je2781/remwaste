import ReactDOM from "react-dom";

const BackDrop = (props: any) => {
  return <div className='backdrop' onClick={props.onClick}></div>;
};


const MobileModalOverlay = (props: any) => {
  return (
    <main id='progress' aria-orientation="vertical" className={`${props.classes ? props.classes : 'bg-white px-4 pt-[70px]'} z-[45] w-4/5 flex-col pb-12 gap-y-6 h-full flex fixed top-0 left-0`}>
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
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


