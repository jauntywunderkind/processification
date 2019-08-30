"use module"
import tape from "tape"
import promiseInstantiator from "../promise-instantiator.js"
import delay from "delay"

tape( "test promise-instantiator", async function( t){
	async function Rolander( res, rej, self, greeting){
		self.ourName= "roland"
		res( "hello")
		await delay( 8)
		self.greeting= greeting
	}

	const
	  instantiator= promiseInstantiator( Rolander),
	  p= instantiator( "heyya")

	// check base promise behavior
	t.equal( p.ourName, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")

	// exec is still running
	t.notOk( p.greeting, "but hast not finished running yet")
	await delay( 10)
	t.equal( p.greeting, "heyya", "and now has ran")

	// test some props of the instantiator
	t.equal( p.constructor.name, "RolanderPromise", "instantiated has right class")
	t.equal( instantiator.class.name, "RolanderPromise", "instantiator knows class")
	t.end()
})

tape( "test promise-instantiator-ed field", async function( t){
	class Foo{
		color= "red"
		constructor(){
			this.bar= promiseInstantiator( this.bar)
		}
		async bar( res, rej, self, greeting= "sup?"){
			this.color= "green" // this is still this
			self.ourName= "roland" // self is our promise instance
			res( "hello")
		}
	}

	const foo= new Foo()
	t.equal( foo.color, "red", "foo's color starts red")

	// run
	const b= foo.bar()
	t.equal( foo.color, "green", "foo's color goes green")
	t.equal( b.ourName, "roland", "promise has ourName")

	// post run
	const bv= await b
	t.equal( bv, "hello", "resolves as usual")
	t.end()
})
