import {useEffect, useRef} from 'react';

const useOutsideClick = (outsideClick = () => {}) => {
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if(ref.current && !ref.current.contains(e.target)) {
      outsideClick(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return ref;
}

export default useOutsideClick;
