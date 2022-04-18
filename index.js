import express from 'express';
import poke from './poke.js';
import path from 'path';
const app = express();
const __dirname = path.resolve();
const pokedex = poke.pokedex;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//rotas
app.get('/', (req,res) => {
	res.render ('index', {pokedex});
});

// app.get('/index', (req,res) => {
	// res.send(pokedex[1].name);
// });

app.post('/add', (req,res) => {
	const pokemon = req.body;
	pokemon.id = pokedex.length + 1;
	pokedex.push(pokemon);
	res.redirect("/");
});

app.listen(3000, () => console.log("Server in http://localhost:3000"));