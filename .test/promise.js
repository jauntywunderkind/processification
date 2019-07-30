"use module"
import tape from "tape"
import Promise from "../promise.js"

tape( "test promise", async function( t){
	let p= new Promise( function( res){
		this.name= "roland"
		res( "hello")
	})
	t.equal( p.name, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")
	t.end()
})
