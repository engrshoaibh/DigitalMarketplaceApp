import React, { useEffect, useState } from 'react';

const Toast = ({ message, onCloseToast, messageType }) => {
  const [progress, setProgress] = useState(100); // Progress starts at 100% (fully visible)
  

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, 2000); // Close toast after 2 seconds

    const interval = setInterval(() => {
      setProgress(prevProgress => Math.max(prevProgress - (100 / 20), 0)); // Reduce progress every 100ms to reach 0 in 2 seconds
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onCloseToast]);


    if (messageType == 'success') {
      return(

        <div className={`flex-col fixed bottom-4 right-4 w-64 bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex justify-between uppercase font-medium`}>
        <span className="flex-1">{message}</span>
        <div className={`h-1 bg-green-300`} style={{ width: `${progress}%` }}></div> {/* Progress bar */}
      </div>
      )
    } else {
      return(
        <div className={`flex-col fixed bottom-4 right-4 w-64 bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex justify-between uppercase font-medium`}>
        <span className="flex-1">{message}</span>
        <div className={`h-1 bg-red-300`} style={{ width: `${progress}%` }}></div> {/* Progress bar */}
      </div>
      )
    }

};

export default Toast;
