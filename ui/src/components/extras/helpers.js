// This is a recycle component that maybe used in many components
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

// this action is for load the page always at the top of each page
const  LoadToTop = (props) => {

  const location = useLocation();

  useEffect(() => {
    // setting where load the page
    window.scrollTo(0, 0);
  }, [location]);


  return <> {props.children} </>
};

export default LoadToTop;


