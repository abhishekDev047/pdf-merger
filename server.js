//Abishek's Code 
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
app.use(('/static'), express.static('public'))
const {mergepdfs} = require('./testpdfs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
});
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
   let d = await  mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    // res.send({data: req.files})
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
});

app.listen(port, () => {
  console.log(`PDF Manager listening on port http://localhost:${port}`)
});