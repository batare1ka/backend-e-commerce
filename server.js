import app from './app.js'

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('PostgreSQL connection details from env:')
  console.log('Host     :', process.env.POSTGRES_HOST)
  console.log('Database :', process.env.POSTGRES_DB)
  console.log('User     :', process.env.POSTGRES_USER)
  console.log('Password :', process.env.POSTGRES_PASSWORD)
})
