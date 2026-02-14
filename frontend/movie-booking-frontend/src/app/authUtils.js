export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserRole = () => {
  console.log("Role from authUtils:", localStorage.getItem("role"));
  return localStorage.getItem("role");
};
