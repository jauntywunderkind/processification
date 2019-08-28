//function makePromise(){
//	return new Promise( async function( res){
//		console.log( "A", this)
//		await (new Promise(res => setImmediate(()=> res())))
//		console.log( "B", this)
//	})
//}
//
//var p= makePromise()

function makeGen(){
	function * iter(){
		iter.n= 2
		while( iter.n< 100){
			console.log("a", iter.n)
			yield iter.n
			console.log("b", iter.n)
			iter.n*= 2
		}
	}
	return iter()
}

let iter= makeGen()
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
