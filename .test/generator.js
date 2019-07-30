"use module"
import tape from "tape"
import ProcessizeGenerator from "../generator.js"

export async function * exponential( iteratorPromise, n= 1){
	const iterator= await iteratorPromise
	iterator.n= n
	while( iterator.n< 100){
		yield iterator.n
		iterator.n*= 2
	}
}

tape( "iterator is live", async function( t){
	const iter= ProcessizeGenerator( exponential)( 4)

	t.equal( (await iter.next()).value, 4, "next is 4")
	//t.equal( iter.n, 4, "iter is 4")
	t.equal( (await iter.next()).value, 8, "next is 8")
	//t.equal( iter.n, 4, "iter is 4")
	iter.n= 50
	let v= await iter.next()
	t.end()	
})
