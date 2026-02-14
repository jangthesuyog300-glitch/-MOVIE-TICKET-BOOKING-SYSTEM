export const redirectToError = (status, message) => {
  window.location.href = `/error?status=${status}&message=${encodeURIComponent(
    message
  )}`;
};
