import React from 'react';
import Swal from 'sweetalert2';

const SweetAlert = () => {
    const successAlert = (message = "Your action was successful!") => {
        Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const errorAlert = (message = "Something went wrong!") => {
        Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            confirmButtonText: "Retry",
        });
    };
    return (
        { successAlert, errorAlert }
    );
};

export default SweetAlert;