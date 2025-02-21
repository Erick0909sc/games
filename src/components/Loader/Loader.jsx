import React from "react";
import styles from "./loader.module.css";
import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <>
      {/* <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <span className={styles.loader}></span>
      </div> */}
      <div>
         <Skeleton height={300} />
         <Skeleton height={30} width={200} style={{ marginTop: '1rem' }} />
       </div>
    </>
  );
};

export default Loader;
