import React, { useEffect } from "react";

const ShowAlert = ({ value, msg, list, showAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      showAlert(false, "", "");
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [list]);

  return (
    <>
      <section className={`alert alert-${value}`}>{msg}</section>
    </>
  );
};

export default ShowAlert;
