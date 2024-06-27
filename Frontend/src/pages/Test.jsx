import { useEffect, useState } from 'react';

const ModalDiv = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target.className !== 'modal-div' && isOpen) {
      setIsOpen(false);
    //   onClose?.(); // Optional callback for parent component actions
    }
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // onClose?.(); // Optional callback for parent component actions
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return <>
        <button onClick={() => setIsOpen(true)}>Click</button>
        {isOpen && (
        <div className="modal-div fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="modal-content bg-white p-4 rounded shadow-md">
            {/* {children} */}
            <button onClick={() => setIsOpen(false)} className="text-red-500 hover:text-red-700">
                Close
            </button>
            </div>
        </div>
        ) }
    </>
};

export default ModalDiv;
