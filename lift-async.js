"use module"
import ProcessizedPromise, { $swapThis} from "./promise.js"
import promiseLift from "./promise-lift.js"
import { makeGetSuffixedName} from "./suffix.js"

export function promiseInstantiator( execFn, opts= {}){
	// side effect!:
	execFn[ $swapThis]= true

	const
	  name= opts.name|| execFn.name,
	  instantiationClass= promiseLift( execFn),
	  namingWrapper= {[ name]: function( ...opts){
		if( instantiator.onarguments){
			opts= instantiator.onarguments( opts, this)
		}
		const instance= new (instantiator.class)( this, ...opts)
		if( instantiator.oninstance){
			instantiator.oninstance( instance, this)
		}
		return instance
       }},
	  instantiator= namingWrapper[ name]
	instantiator.class= instantiationClass
	instantiator.oninstance= opts.oninstance
	instantiator.onarguments= opts.onarguments
	instantiator.state= opts.state
	return instantiator
}
export {
	promiseInstantiator as default
}
