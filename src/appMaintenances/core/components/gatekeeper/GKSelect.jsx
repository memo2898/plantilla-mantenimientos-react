/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { forwardRef } from 'react';

const GKSelect = forwardRef(({ children, name, selectedValue, options,validations }, ref) => {
    return (
        <select ref={ref} name={name} data-gatekeeper-element="select" defaultValue={selectedValue} data-gatekeeper-validations={validations}>
            {options ? 
                options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))
                : 
                children
            }
        </select>
    );
});

GKSelect.displayName = 'GKSelect';

export default GKSelect;
