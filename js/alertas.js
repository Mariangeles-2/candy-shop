//Configuracin de SweetAlert
function configurarSweetAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-warning me-2",
            denyButton: "btn btn-danger",
        },
        buttonsStyling: false
    });
    return swalWithBootstrapButtons;
}