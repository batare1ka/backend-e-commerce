import { getCurrentUser } from "../../services/auth.service.js";

export const meController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.headers.cookie);

    return res.status(200).json({ user });
  } catch (error) {
    res.status(error.code ?? 500).json({
      error: error.message,
      code: error.code,
    });
  }
};
