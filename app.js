const express = require('express');
var path = require('path');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
var fs = require('fs');
const  firebase = require('firebase/app');
const { type } = require('os');
require('firebase/storage')


const firebaseConfig = {
    apiKey: "AIzaSyD42GPydTFUH7hh9kzmGHBagtU7qy7RJ0E",
    authDomain: "israfi-f805e.firebaseapp.com",
    projectId: "israfi-f805e",
    storageBucket: "israfi-f805e.appspot.com",
    messagingSenderId: "811117162870",
    appId: "1:811117162870:web:e2660bcb70cad59b450a57"
  };
firebase.initializeApp(firebaseConfig)


var app = express();
var publicDir = require('path').join(__dirname,'/public'); 


//file getting functions
const getMostRecentFile = (dir) => {
    const files = orderReccentFiles(dir);
    return files.length ? files[0] : undefined;
};

const orderReccentFiles = (dir) => {
    return fs.readdirSync(dir)
        .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
        .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const getAllFileNames = (dir) => {
    let filenames = [] 
    fs.readdirSync(dir).forEach(file => {
        filenames.push(file)
     })
    return filenames 
}


app.use(cors())
app.use(express.static(publicDir)); 
//Calling upscale python script
app.get('/Upscale', function (req, res) {
    //res.send("Server Connected")
    
   // fs.readFile('/public/' + getMostRecentFile('/public'), 'utf8', function(err, data) {
   //     if (err) throw err;
   //     console.log(data);
  //  });
    let dataToSend;
    let python = spawn('python', ['scripts/final upscale/finalupscale.py', getMostRecentFile('public').file])
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
    })
    //console.log(getMostRecentFile('public').file)
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`)
        res.send(dataToSend + "Hello" )
        console.log(dataToSend)
    })

})



app.get('/', function (req, res){
    res.send("Server Connected")
    //let bucketName = "default"
    //let image = []
    //let file = fs.readFile('public/faces/6464_faces.jpg', 'utf8', function(err, data){
        //if (err) return console.log('error ha jee')
        //console.log(data.toString())
        //image.push(data)
    })
    //console.log(image.pop.name)
    //let storageRef = firebase.storage().ref()
    //let uploadTask = storageRef.put(image.pop)
    //console.log('done')
//})
//Calling Action Recognition Script

app.get('/RecognizeActions', function (req, res){
    res.send(getMostRecentFile('public').file)
})

app.get('/RecognizeActionsCall', function (req, res){
    let dataToSend;
    let format = getMostRecentFile('public').file.substring(getMostRecentFile('public').file.lastIndexOf('.'))
    console.log(format)
    if(format == '.avi' || format == '.mp4'){
        var python = spawn('python', ['scripts/ActionPredictorvideo.py', getMostRecentFile('public').file])
    }
    else{
        
        var python = spawn('python', ['scripts/ActionPredictorimage.py', getMostRecentFile('public').file])
    }
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
    })
    console.log(getMostRecentFile('public').file)
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`)
        res.send(dataToSend)
    })
    //res.send(getMostRecentFile('public').file)
})

//Extract Faces part
app.get('/ExtractFaces', function (req, res){
    res.send(getMostRecentFile('public').file)
})

app.get('/ExtractFacesCall', function (req, res){
    console.log('Extracting faces')
    let dataToSend;
    let python = spawn('python', ['scripts/ExtractFaces.py', getMostRecentFile('public').file])
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
        console.log(dataToSend)
    })
    //console.log(getMostRecentFile('public').file)
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`)
        res.send(dataToSend)
    })
    //res.send(getMostRecentFile('public').file)
})
app.get('/GetImagesCall', function (req, res){
    res.send(getAllFileNames('public/faces'))
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

app.listen('9000', function () {
    console.log('server run')

})
