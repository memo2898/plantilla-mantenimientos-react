/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import React, { forwardRef } from 'react';



const GKSubmit = forwardRef(({ children, ...props}, ref) => {
  return (
    <>
        <button ref={ref} type='button' data-gatekeeper-element="submit_button" {...props}>{children}</button>
     
    </>
  );
});

export default GKSubmit;