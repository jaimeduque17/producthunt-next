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

    // Function executed when the user write
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // Function that is executed when the user press submit
    const handleSubmit = e => {
        e.preventDefault()
        const validationErrors = validate(values)
        setErrors(validationErrors)
        setSubmitForm(true)
    }

    return {
        values,
        errors,
        submitForm,
        handleSubmit,
        handleChange
    };
}
 
export default useValidation;

// Object.keys(object) allows me check if an object have data