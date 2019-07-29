"use module"
import Immediate from "p-immediate"

export let DEFAULT= {
	
}

export let EXPORTS= {
	DEFAULT,
}

export function ProcessizedPromiseSuperConstructor( exec){
	return async function( res, rej){	
		// magic sauce
		await Immediate()
		// ok hello now do the thing
		console.log(JSON.stringify({ me: this}))
		return exec.call( this, res, rej)
	}
}

class ProcessizedPromise extends Promise{
	constructor( exec, wtf= 2+2){
		super( ProcessizedPromiseSuperConstructor( exec, wtf))
		return this
	}

}

export {
	ProcessizedPromise as default,
	ProcessizedPromise as processizedPromise,
	ProcessizedPromise as Promise,
	ProcessizedPromise as promise,
	ProcessizedPromiseSuperConstructor as processizedPromiseSuperConstructor,
	ProcessizedPromiseSuperConstructor as SuperConstructor,
	ProcessizedPromiseSuperConstructor as superConstructor
}
