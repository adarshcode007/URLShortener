export const useAuth = () => {
  const login = (token) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isAuth = () => {
    return !!localStorage.getItem("token");
  };

  return { login, logout, isAuth };
};
