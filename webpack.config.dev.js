/*
*Nota: Este paquete tiene devServer, se puede configurar siguiendo la documentacion.
*Para usarlo cambiar el script en el package.json
*/

//plugin utilizado para separar los archivos css de trabajo y unificarlos en uso solo para su uso
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
//Plugin para borrar la carpeta dist y genere archivos desde 0
const CleanWebpackPlugin = require('clean-webpack-plugin')
//Plugin para minificar los archivos CSS
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	//elige el ambiente, puede ser desarrollo o produccion, en produccion 
	//los archivos estarán minificados
	'mode':'development',
	//elige el archivo que se proceosará 
	/*
	* -Nota, si tienes un unico archivo no es necesarioagregarlo dentro del objeto
	* Ya que el la salida será el nombre del archivo puntualmente.
	* Si tenemos muchos archivos Js que queremos procesar ahi si agregamos en objeto
	* dentro de entry. Para tener en cuenta para futuros desarrollos		
	*/
	'entry':{
		'vendor':['react','react-dom'],
		'index':'./src/js/index.js',
		'about': './src/js/about.js'
	},
	//elige la salida del archivo js
	'output':{
		//elige el nombre y ruta del archivo js
		'filename':'js/[name].js',
		'chunkFilename':'js/[id].[chunkhash].js'
	},
	//Los modulos utilizados para trabajar dentro del webpack
	'module':{
		// Los archivos globales se llaman con la espresion regular "/\.extension$/ 
		// <-personalmente no sabia de expresiones regulares PogChamp"
		'rules':[
			//Este loader está enfocado a transpilar con babel todo el codigo js nativo a ES2015
			//Tambien está configurado para transpilar JSX que es lenguaje de react (JSX = js + xml)
			{
				'test':/\.js$/,
				'use':
				{
					'loader':'babel-loader'
				}
			},
			/*URL loader y file-loader son loaders que transpilan los archivos de imagen o fuentes
			*url-loader convierte los archivos menores al limit que se puso en base64 y los inyecta
			*si se pasa del limit(valor en bits) se usa una configuracion del file-loader
			*Que sencillamente transpola el archivo desde el js a una carpeta aparte en el dist
			*que es el resultado de todo el proceso de empaquetado
			*/
			{
				'test': /\.(jpg|png|gif)$/,
				'use':{
					'loader': 'url-loader',
					'options':{
						'limit':100000,
						'outputPath':'images',
						'name':'[name][hash].[ext]'
					}
				}
			},
			{
				// Este loader transpila desde el css importado en el js a otro archivo en  
				//una ruta dentro de dist, para más enfasis en el plugin, arriba más info
				'test':/\.css$/,
				'use':
				[{
					'loader':MiniCssExtractPlugin.loader,
					'options':{
						'minimize':true
					}
				},'css-loader']
			},
			{
				// Transpilador de codigo SASS a css e importado a una carpeta css dentro de dist
				// Al igual que el css nativo, usa el plugin para llevar el codigo a otro archivo y no inyectarlo
				//directamente al codigo html que pasaria si utilizaramos style-loader
				'test':/\.scss$/,
				'use':
				[{
					'loader':MiniCssExtractPlugin.loader,
					'options':{
						'minimize':true
					}
				},'css-loader','sass-loader']
			}
		]
	},
	'plugins':[
		new MiniCssExtractPlugin({
			'filename':'css/[name].css'
		})
	],
	/*
	*Nota: un chunk significa un fragmento de codigo, por ejemlo una linea que haga un impot a una libreria
	* Se entiende como chunk en optimizacion a que tomará todas las lineas comunes entre archivos y las compacta 
	* a un nuevo archivo que puede ser utilizado en diferentes partes dentro del poryecto
	*/
	'optimization':{
		'splitChunks':{
			'cacheGroups':{
				'vendor':{
					'name':'vendor',
					'chunks':'all',
					'test':'vendor',
					'enforce':true
				}
			}
		},
		'minimizer':[
			new OptimizeCSSAssetsPlugin({})
		]
	}
}