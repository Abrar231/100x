import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const Modal = ({text, onClick, showModal, setShowModal, type='regular'}) => {
  const typeObj ={
    avatar : 'w-full -top-20',
    regular : 'bottom-0 right-0'
  }
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick, false);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, false);
    };
  }, [showModal]);

  return (
    <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-0 z-10" onClick={() => setShowModal(false)} ></div>
        <div ref={ref} className={`z-10 absolute min-h-16 text-white bg-black border border-black rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2),0_0_3px_2px_rgba(255,255,255,0.15)] min-w-[200px] py-4 ${typeObj[type]}`}>
          <button className='w-full py-2 bg-black hover:bg-neutral-900' onClick={onClick}>
            {text}
          </button>
        </div>
    </>
  )
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default Modal