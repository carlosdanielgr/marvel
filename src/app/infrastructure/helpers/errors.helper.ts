import { SweetAlertOptions } from 'sweetalert2';

export const errorFn = (message: string) =>
  ({
    title: 'Error!',
    text: message,
    icon: 'error',
    confirmButtonColor: '#dc3545',
  } as SweetAlertOptions);
