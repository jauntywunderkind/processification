"use module"
import tape from "tape"
import Promise from "../promise.js"

tape( "test extending promise", async function( t){
	const P2= class extends Promise{
		constructor(){
			super( function(res){
				this.name= "roland"
				res( "hello")
			})
		}
	}
	let p= new P2()
	t.equal( p.name, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")
	t.end()
})
