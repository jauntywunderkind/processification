"use module"

export class ProcessizedPromise extends Promise{
	static [ Symbol.species]= Promise
	constructor( exec, ...args){
		let res, rej
		super( function( _res, _rej){
			res= _res
			rej= _rej
		})
		exec.call( this, res, rej, ...args)
		return this
	}

}
export {
	ProcessizedPromise as default,
	ProcessizedPromise as processizedPromise,
	ProcessizedPromise as Promise,
	ProcessizedPromise as promise,
}
export let EXPORTS= {
	ProcessizedPromise
}
