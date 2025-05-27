import Swal from "sweetalert2";

export const confirmThemeSwal = Swal.mixin({
  customClass: {
    confirmButton: "btn bg-primary",
    cancelButton: "btn bg-secondary",
  },
  buttonsStyling: false,
});
