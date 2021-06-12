const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const cors=require('cors');
const mongoose=require('mongoose');
const logs=require('./api/logs');

require('dotenv').config();

const middlewares=require('./middleware')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const app=express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json());

app.get('/',(req, res)=>{
    res.json({
        message:'Hello World'
    });
});

app.use('/api/logs', logs);

app.use((req, res, next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});



app.use((error, req, res, next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'PROD' : error.stack
    });
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});