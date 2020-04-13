import React, {useState, useEffect} from 'react';

const useValidation = (stateInitial, validate, fn) => {

    const[values, setValues] = useState(stateInitial)
    const[errors, setErrors] = useState({})
    const[submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0

            if(noErrors) {
                fn() // fn = function that is executed in the component
            }
            setSubmitForm(false)
        }
    }, [])

    return (  );
}
 
export default useValidation;

// Object.keys(object) allows me check if an object have data