import { login } from '../../services/login.service.js';

export const loginController = async (req, res, next) => {

  try {

    const result =
      await login(req.body);

      res.cookie(
        "refreshToken",
        result.refreshToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000
        }
      ).cookie(
        'accessToken', 
        result.accessToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 900000,
        }
      );

    return res.status(200).json({ user: result.user });


  } catch(error) {
    res.status(error.code ?? 500).json({
      error: error.message,
      code: error.code,
    });

  }
}