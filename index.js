import express from 'express';
import poke from './public/poke.js';
import path from 'path';
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve(path.dirname(''));
const p = poke.pokedex;


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//rotas
app.get('/', (req,res) => {
	let pokedex = p.sort((a, b) => {
		if (a.type.toLowerCase() > b.type.toLowerCase()) {
			return 1;
		} else if (a.type.toLowerCase() < b.type.toLowerCase()) {
			return -1;
		};
		return 0;
	});
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
	let n = true;
	for(let pk of p){
		if(pk.name === pokemon.name){
			console.log(`${pk.name} is already included`)
			n = false;
		}
	}
	if(n){
		pokemon.id = p.length + 1
		console.log(`${pokemon.name} added successfully`)
		p.push(pokemon);
	}
	res.redirect("/");
});

app.listen(PORT, () => console.log(`Server in http://localhost:${PORT}`));