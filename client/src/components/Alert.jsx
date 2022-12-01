import React from "react";

const Alert = ({ alert }) => {
  return (
    <div
      className={`${alert.error ? 'from-red-500 to-red-600' : 'from-sky-400  to-sky-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
