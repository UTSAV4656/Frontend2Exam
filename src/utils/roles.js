export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.data.UserRole;
  } catch {
    return null;
  }
};

export const hasRole = (allowedRoles) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};
