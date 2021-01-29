const express=require('express'),
      app=express(),
      morgan=require('morgan'),
      dotenv=require('dotenv'),
      mongoose=require('mongoose'),
      bodyParser=require('body-parser'),
      cookieParser=require('cookie-parser'),
      expressValidator=require('express-validator'),
      fs=require('fs'),
      cors=require('cors');


dotenv.config();

//routes
const postRoutes=require('./routes/post');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');

//db
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB connected!');
});


mongoose.connection.on('error',err=>{
    console.log(`error:${err.message}`)
})


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use('/',postRoutes);
app.use('/',authRoutes);
app.use('/',userRoutes);

app.get('/',(req,res)=>{
  fs.readFile('docs/apidocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      })
    }
    const docs=JSON.parse(data);
    res.json(docs);
  })
})


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({error:"Unauthorized!"});
    }
    next();
  });



let port=process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("server is running");
})