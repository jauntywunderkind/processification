"use module"
import tape from "tape"
import { Promise} from "../promise.js"

tape( "test promise", async function( t){
	let p= new Promise( function( res){
		res( 44)
	})
	const pv= await p
	console.log({pv})
	t.end()
})
