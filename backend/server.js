require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const mailRoutes = require('./routes/mailRoutes')


app.use(
    cors({
        origin: 'https://stock-fetch.vercel.app',
        credentials: true
    })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/mail', mailRoutes)

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(process.env.PORT || 8080, () => console.log('Server is running on port 8080'))).catch((error) => console.log(error.message))


