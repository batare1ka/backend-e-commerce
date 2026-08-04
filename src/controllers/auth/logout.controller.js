export const logoutController = (req, res) => {
  res.clearCookie("refreshToken");

  return res.status(204).end();
};
