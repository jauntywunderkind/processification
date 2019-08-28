"use module"

export function liftFunction( fn){
	return
}

export class ProcessizedPromise extends Promise{
	static [ Symbol.species]= Promise
	constructor( exec){
		let res, rej
		super( function( _res, _rej){
			res= _res
			rej= _rej
		})
		exec.call( this, res, rej)
		return this
	}

}
export {
	ProcessizedPromise as default,
	ProcessizedPromise as processizedPromise,
	ProcessizedPromise as Promise,
	ProcessizedPromise as promise
}
export let EXPORTS= {
	ProcessizedPromise
}
