export default function createAccount(values) {
    let errors = {};

    // Validate name user
    if (!values.name) {
        errors.name = "The Name is required";
    }

    // Validate company
    if (!values.company) {
        errors.company = "The company is required";
    }

    // Validate url
    if (!values.url) {
        errors.url = "The url is required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "URL is wrong";
    }

    // Validate description
    if (!values.description) {
        errors.description = "Add a description";
    }

    return errors;
}
