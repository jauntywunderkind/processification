"use module"
import tape from "tape"
import promiseInstantiator from "../promise-instantiator.js"
import delay from "delay"

tape( "test promise-instantiator", async function( t){
	async function Rolander( res, rej, greeting){
		this.ourName= "roland"
		res( "hello")
		await delay( 8)
		this.greeting= "hello"
	}

	const
	  instantiator= promiseInstantiator( Rolander),
	  p= instantiator( "hello")

	// check base promise behavior
	t.equal( p.ourName, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")

	// exec is still running
	t.notOk( p.greeting, "but hast not finished running yet")
	await delay( 10)
	t.equal( p.greeting, "hello", "and now has ran")

	// test some props of the instantiator
	t.equal( p.constructor.name, "RolanderPromise", "instantiated has right class")
	t.equal( instantiator.class.name, "RolanderPromise", "instantiator knows class")
	t.end()
})
