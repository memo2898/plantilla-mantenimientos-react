/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// GKInput.js
// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from 'react';

const GKFormResult = forwardRef(({ validation_true, validation_false }, ref) => {
  return (
    <div className='cont_gkform_result'>
      <span
        ref={ref}
        data-gatekeeper-element="form_result"
        data-validation-true={validation_true}
        data-validation-false={validation_false}
      ></span>
    </div>
  );
});

export default GKFormResult;
