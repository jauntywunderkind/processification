"use module"
import ProcessizedPromise from "./promise.js"
import promiseLift from "./promise-lift.js"
import { makeGetSuffixedName} from "./suffix.js"

export function promiseInstantiator( execFn, opts= {}){
	const
	  name= opts.name|| execFn.name,
	  instantiationClass= promiseLift( execFn),
	  namingWrapper= {[ name]: function( ...opts){
		let instance;
		if( instantiator.state){
			// execFn's this will be the promise instance, but also give it access to instantiator.this
			instance= new (instantiator.class)( instantiator.state, ...opts)
		}else{
			instance= new (instantiator.class)( ...opts)
		}
		if( instantiator.oninstance){
			instantiator.oninstance( instance)
		}
		return instance
       }},
	  instantiator= namingWrapper[ name]
	instantiator.class= instantiationClass
	instantiator.oninstance= opts.oninstance
	instantiator.state= opts.state
	return instantiator
}
export {
	promiseInstantiator as default
}
