import { DiContainer } from '../container.js'

export const userController = async (req, res, next) => {
  try {
    const pool = DiContainer.get('pool')
    const result = await pool.query(`SELECT * FROM users`)
    res.json(result.rows) // better to send .rows
  } catch (error) {
    res.status(500).json({
      error: error.message,
      code: error.code,
    })
  }
}
