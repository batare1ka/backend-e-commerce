import { register } from '../../services/register.service.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    
    res.status(201).json(user);
  } catch (error) {
    res.status(error.code ?? 500).json({
      error: error.message,
      code: error.code,
    })
  }
}
