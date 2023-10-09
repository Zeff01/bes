import { useState, useEffect } from "react";

const nowDate = () => {
  const d = new Date();
  return {
    second: d.getSeconds(),
    minute: d.getMinutes(),
    hour: d.getHours(),
  };
};

const useTimer = () => {
  const [state, setState] = useState(nowDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(nowDate); // Use updater function
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
};

export default useTimer;
