const express = require('express');
var path = require('path');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
var fs = require('fs');


var app = express();

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


app.use(cors())

//Calling upscale python script
app.get('/Upscale', function (req, res) {
    //res.send("Server Connected")
    
   // fs.readFile('/public/' + getMostRecentFile('/public'), 'utf8', function(err, data) {
   //     if (err) throw err;
   //     console.log(data);
  //  });
    let dataToSend;
    let python = spawn('python', ['scripts/NN.py', 'nigger'])
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
    })
    //console.log(getMostRecentFile('public').file)
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`)
        res.send(dataToSend + "Hello" )
    })

})



app.get('/', function (req, res){
    res.send("Server Connected")
})
//Calling Action Recognition Script

app.get('/RecognizeActions', function (req, res){
    res.send(getMostRecentFile('public').file)
})

app.get('/RecognizeActionsCall', function (req, res){
    let dataToSend;
    let python = spawn('python', ['scripts/ActionPredictorimage.py', getMostRecentFile('public').file])
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
    let dataToSend;
    let python = spawn('python', ['scripts/ExtractFaces.py', getMostRecentFile('public').file])
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
    })
    //console.log(getMostRecentFile('public').file)
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`)
        res.send(dataToSend)
    })
    //res.send(getMostRecentFile('public').file)
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
