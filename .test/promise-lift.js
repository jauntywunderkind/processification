"use module"
import tape from "tape"
import PromiseLift from "../promise-lift.js"

tape( "test promise-lift", async function( t){
	let liftedClass= PromiseLift( function(res){
		this.name= "roland"
		res( "hello")
	}, "Lifted")
	let p= new liftedClass()
	t.equal( p.name, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")
	t.end()
})
