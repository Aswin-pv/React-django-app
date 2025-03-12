import {useState,useEffect} from 'react';

const useDebounce = (val, delay) => {

    const [debounceValue, setDebounceValue] = useState(val);

    useEffect(() => {
      const handler = setTimeout(() => {
            setDebounceValue(val);
      }, delay);
    
      return () => {
        clearTimeout(handler);
      };
    }, [val])
    
  return debounceValue;
}

export default useDebounce;
