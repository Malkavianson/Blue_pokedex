import express from 'express';
import poke from './public/poke.js';
import path from 'path';
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve(path.dirname(''));
const pokedex = poke.pokedex;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//rotas
app.get('/', (req,res) => {
	res.render ('index', {pokedex});
});
app.get('/register', (req,res) => {
	res.render ('cadastro');
});
app.get('/details', (req,res) => {
	res.render ('detalhes');
});

app.post('/add', (req,res) => {
	const pokemon = req.body;
	pokemon.id = pokedex.length + 1;
	pokedex.push(pokemon);
	res.redirect("/");
});

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));