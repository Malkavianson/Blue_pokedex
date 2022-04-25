import express from 'express';
import poke from './public/js/poke.js';
import path from 'path';
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve(path.dirname(''));
const pokedex = poke.pokedex;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//Functions
function pkl(p){
	let arr = p.sort((a, b) => {
		if (a.type.toLowerCase() > b.type.toLowerCase()) {
			return 1;
		} else if (a.type.toLowerCase() < b.type.toLowerCase()) {
			return -1;
		};
		return 0;
	});
	return arr;
}

function Pokemon(n, t, d, h, w, c, a, wk, p, pk) {
	Object.defineProperties(this, {
		name: {
			enumerable: true,
			value: n.charAt(0).toUpperCase() + n.substring(1).toLowerCase(),
			writable: true,
			configurable: true,
		},
		type: {
			enumerable: true,
			value: t.charAt(0).toUpperCase() + t.substring(1).toLowerCase(),
			writable: true,
			configurable: true,
		},
		description: {
			enumerable: true,
			value: d,
			writable: true,
			configurable: true,
		},
		height: {
			enumerable: true,
			value: num(h),
			writable: true,
			configurable: true,
		},
		weight: {
			enumerable: true,
			value: num(w),
			writable: true,
			configurable: true,
		},
		category: {
			enumerable: true,
			value: c.charAt(0).toUpperCase() + c.substring(1).toLowerCase(),
			writable: true,
			configurable: true,
		},
		abilities: {
			enumerable: true,
			value: a,
			writable: true,
			configurable: true,
		},
		weaknesses: {
			enumerable: true,
			value: wk,
			writable: true,
			configurable: true,
		},
		picture: {
			enumerable: true,
			value: p,
			writable: true,
			configurable: true,
		},
		id: {
			enumerable: true,
			value: pk.length + 1,
			writable: true,
			configurable: true,
		},
	});
	function num(n){ let num = parseFloat(n).toFixed(1); return num;}
}

//rotas
app.get('/', (req,res) => {
	let p = pkl(pokedex);
	res.render ('index', {p});
});
app.get('/register', (req,res) => {
	res.render ('cadastro', {pokedex});
});
app.get('/details/:id', (req,res) => {
	let p = pkl(pokedex);
	let id = +req.params.id;
	const pokemon = pokedex.find(pokedex => pokedex.id === id)
	res.render ('detalhes', {p, pokemon});
});
app.get('/changing/:id', (req,res) => {
	let p = pkl(pokedex);
	let id = +req.params.id;
	const pokemon = pokedex.find(pokedex => pokedex.id === id)
	res.render ('changing', {p, pokemon});
});

// app.get('/deleting/:id', (req,res) => {
	// const id = +req.params.id;
	// const pokemon = pokedex.find(pokedex => pokedex.id === id);
	// const i = pokedex.indexOf(pokemon);
	// pokedex.splice(i, 1);
	// console.log(`${pokemon.name} was deleted`);

	// res.redirect(`/`);
// });

app.post('/changed', (req,res) =>{
	const pokemon = req.body;
	for(let pkm of pokedex){
		if(pkm.id == pokemon.id){
			let i = pokedex.indexOf(pkm);
			for(let [k, v] of Object.entries(pokemon)){
				if(v === ""){
					pokemon[k] = pkm[k].toString();
				};
			};
			const newPoke = new Pokemon(pokemon.name, pokemon.type, pokemon.description, pokemon.height, pokemon.weight, pokemon.category, pokemon.abilities.split(','), pokemon.weaknesses.split(','), pokemon.picture, pokedex);
			newPoke.id = pkm.id;
			pokedex[i] = newPoke;
			console.log(`${newPoke.name} was changed`);

		};
	};
	setTimeout(() => { res.redirect(`/details/${pokemon.id}`); }, 5000);
});
app.post('/include', (req,res) => {
	const { name, type, description, height, weight, category, abilities, weaknesses, picture	} = req.body;
	const pokemon = new Pokemon(name, type, description, height, weight, category, abilities.split(','), weaknesses.split(','), picture, pokedex);
	let n = true;
	for(let pk of pokedex){
		if(pk.name === pokemon.name){
			console.log(`${pk.name} is already included`);
			n = false;
			break;
		}
	}
	if(n){
		console.log(`${pokemon.name} added successfully`);
		pokedex.push(pokemon);
	}

	setTimeout(() => { res.redirect("/"); }, 5000);
});

app.listen(PORT, () => {console.clear(); console.log(`Server in http://localhost:${PORT}`)});