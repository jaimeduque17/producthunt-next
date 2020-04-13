export default function createAccount(values) {
    let errors = {};

    // Validate name user
    if (!values.name) {
        errors.name = "The Name is required";
    }

    // Validate email
    if (!values.email) {
        errors.email = "The Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email is wrong";
    }

    // Validate password
    if (!values.password) {
        errors.password = "The password is required";
    } else if (values.password.length < 6) {
        errors.password = "The password must be at least 6 characters";
    }
    return errors;
}
