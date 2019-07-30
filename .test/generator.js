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
	return iterator.n
}

tape( "iterator is live", async function( t){
	const iter= ProcessizeGenerator( exponential)( 4)
	// advance iterator, checking both iteration value and iterator's state
	t.equal( (await iter.next()).value, 4, "iteration value of 4")
	t.equal( iter.n, 4, "iterator state of 4")
	t.equal( (await iter.next()).value, 8, "iteration value of 8")
	t.equal( iter.n, 8, "iterator state of 8")

	// manually advance state
	iter.n= 32
	t.equal( (await iter.next()).value, 64, "iteration value of 64")
	t.equal( iter.n, 64, "iterator state of 64")

	// terminate
	const last= await iter.next()
	t.equal( last.value, 128, "iteration value of 128")
	t.equal( iter.n, 128, "iterator state of 128")
	t.equal( last.done, true, "iteration done")
	t.end()	
})
