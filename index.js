import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

import Apresentacao from './models/Apresentacao.js'
import Curta from './models/Curta.js'
import Entrada from './models/Entrada.js';

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

//CURTA

app.get('/curta', async (req, res) => {
    const curtas = await Curta.find()
    res.render("curta/lst", {curtas});
})

app.get('/curta/add', (req, res) => {
    res.render("curta/add");
})

app.post('/curta/add', upload.single('poster'), async (req, res) => {
    const {equipe, titulo, genero, sinopse, duracao, link} = req.body
    let poster = null
    if(req.file) poster = req.file.buffer
    await Curta.create({equipe, titulo, genero, sinopse, duracao, poster, link})
    res.render("curta/add");
})

app.get('/curta/del/:id',  async (req, res) => {
 await Curta.findByIdAndDelete(req.params.id)
 const curtas = await Curta.find()
 res.render("curta/lst", {curtas});
})

app.get('/curta/upd/:id', async  (req, res) => {
    const curtas = await Curta.findById(req.params.id)
  res.render("curta/upd", {curtas});
})

app.post('/curta/upd/:id',  async (req, res) => {
  const {id, equipe, titulo, genero, sinopse, duracao, poster, link} = req.body
  await Curta.findByIdAndUpdate(id, {equipe, titulo, genero, sinopse, duracao, poster, link})
  const curtas = await Curta.find()
 res.render("curta/lst", {curtas});
})

//APRESENTAÇÃO
app.get('/apresentacao', async (req, res) => {
    const apresentacoes = await Apresentacao.find()
    res.render("apresentacao/lst", {apresentacoes});
})

app.get('/apresentacao/add', (req, res) => {
    res.render("apresentacao/add");
})

app.post('/apresentacao/add', async (req, res) => {
    const {equipe, modalidade, duracao, resumo, participantes} = req.body
    console.log(equipe, modalidade, duracao, resumo, participantes)
    await Apresentacao.create({equipe, modalidade, duracao, resumo, participantes})
    res.render("apresentacao/add");
})

app.get('/apresentacao/del/:id',  async (req, res) => {
 await Apresentacao.findByIdAndDelete(req.params.id)
 const apresentacoes = await Apresentacao.find()
 res.render("apresentacao/lst", {apresentacoes});
})

app.get('/apresentacao/upd/:id', async  (req, res) => {
    const apresentacoes = await Apresentacao.findById(req.params.id)
  res.render("apresentacao/upd", {apresentacoes});
})

app.post('/apresentacao/upd/:id',  async (req, res) => {
  const {id, equipe, modalidade, duracao, resumo, participantes} = req.body
  await Apresentacao.findByIdAndUpdate(id, {equipe, modalidade, duracao, resumo, participantes})
  const apresentacoes = await Apresentacao.find()
 res.render("apresentacao/lst", {apresentacoes});
})




//Entrada
app.get('/entrada', async (req, res) => {
    const entradas = await Entrada.find()
    res.render("entrada/lst", {entradas});
})

app.get('/entrada/add', (req, res) => {
    res.render("entrada/add");
})

app.post('/entrada/add', async (req, res) => {
    const {equipe, mascote, duracao, tema, musicaParodia} = req.body
    console.log(equipe, mascote, duracao, tema, musicaParodia)
    await Entrada.create({equipe, mascote, duracao, tema, musicaParodia})
    res.render("entrada/add");
})

app.get('/entrada/del/:id',  async (req, res) => {
 await Entrada.findByIdAndDelete(req.params.id)
 const entradas = await Entrada.find()
 res.render("entrada/lst", {entradas});
})

app.get('/entrada/upd/:id', async  (req, res) => {
    const entradas = await Entrada.findById(req.params.id)
  res.render("entrada/upd", {entradas});
})

app.post('/entrada/upd/:id',  async (req, res) => {
  const {id, equipe, mascote, duracao, tema, musicaParodia} = req.body
  await Entrada.findByIdAndUpdate(id, {equipe, mascote, duracao, tema, musicaParodia})
  const entradas = await Entrada.find()
 res.render("entrada/lst", {entradas});
})



//rota para pesquisar instrumento por nome
//curta
app.post('/curta/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const curtas = await Curta.find({
    titulo: new RegExp(pesquisar, 'i')
  });
  res.render("curta/lst", { curtas });
})

//apresentacao
app.post('/apresentacao/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const apresentacoes = await Apresentacao.find({
    equipe: new RegExp(pesquisar, 'i')
  });
  res.render("apresentacao/lst", { apresentacoes });
})

//entrada
app.post('/entrada/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const entradas = await Entrada.find({
    equipe: new RegExp(pesquisar, 'i')
  });
  res.render("entrada/lst", { entradas });
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});