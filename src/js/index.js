import '../css/style.css'
import img from '../images/18.jpg'
import img2 from '../images/test.jpg'
import { mensaje, autor } from './message.js'
import games from './games.json'
import '../scss/style.scss'

const newUl = document.createElement('ul')
for(let data of games.juegos){
	let newLI = document.createElement('li')
	newLI.innerText = (`${data.name} from ${data.age}`)
	newUl.appendChild(newLI)
}
document.body.append(newUl)

document.write('pescado')
const btn = document.getElementById('dynamic-alert')
btn.addEventListener('click',async() => {
	const {default: alerta} = await import('./alerta.js')
	alerta()
})

const image = document.createElement('img')
image.setAttribute('src',img2)
image.setAttribute('heigt',150)
image.setAttribute('width',150)

document.body.append(image)

let llamado = (mensaje, autor) => {
	console.log(`Un anuncio del presidente interino ${autor}: '${mensaje}'`);	
}

llamado(mensaje,autor);