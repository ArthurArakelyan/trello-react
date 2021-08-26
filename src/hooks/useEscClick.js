import {useEffect} from 'react';

const useEscClick = (escClick = () => {}, ref) => {
  const handleEscClick = (e) => {
    if(e.keyCode === 27 && ref.current) {
      escClick(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClick, true);

    return () => {
      document.removeEventListener('keydown', handleEscClick, true);
    };
  });
}

export default useEscClick;
