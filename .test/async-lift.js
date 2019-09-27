"use module"
import tape from "tape"
import AsyncLift from "../async-lift.js"
import delay from "delay"

tape( "test lifted async", async function( t){
	async function Rolander( res, rej, self, greeting){
		self.ourName= "roland"
		res( "hello")
		await delay( 8)
		self.greeting= greeting
	}

	const
	  lifted= AsyncLift( Rolander),
	  p= lifted( "heyya")

	// check base promise behavior
	t.equal( p.ourName, "roland", "constructor had a this context")
	const pv= await p
	t.equal( pv, "hello", "resolves as usual")

	// exec is still running
	t.notOk( p.greeting, "but hast not finished running yet")
	await delay( 10)
	t.equal( p.greeting, "heyya", "and now has ran")

	// test some props of the lifted
	t.equal( p.constructor.name, "RolanderPromise", "instantiated has right class")
	t.equal( lifted.class.name, "RolanderPromise", "lifted knows class")
	t.end()
})

tape( "test lifted async class-field", async function( t){
	class Foo{
		color= "red"
		constructor(){
			this.bar= AsyncLift( this.bar)
		}
		// here is the magic: additional parameters passed in to bar in the lifted form
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

tape( "test statically lifted async class-field", async function( t){
	class Foo{
		color= "red"
		// showing off
		async bar( res, rej, self, greeting= "sup?"){
			this.color= "green" // this is still this
			self.ourName= "roland" // self is our promise instance
			res( "hello")
		}
	}
	// lift can be done statically! otherwise same test as previous
	Foo.prototype.bar= AsyncLift( Foo.prototype.bar)

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
