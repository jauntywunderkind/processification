"use module"
import ProcessizedPromise from "./promise.js"
import promiseLift from "./promise-lift.js"
import { makeGetSuffixedName} from "./suffix.js"

export function promiseInstantiator( execFn, opts= {}){
	const
	  name= opts.name|| execFn.name,
	  instantiationClass= promiseLift( execFn),
	  self= opts.this|| opts.state|| this,
	  namingWrapper= {[ name]: function( ...opts){
		if( instantiator.onarguments){
			opts= instantiator.onarguments( opts, instantiator.this)
		}
		const instance= new (instantiator.class)( instantiator.this, ...opts)
		if( instantiator.oninstance){
			instantiator.oninstance( instance, instantiator.this)
		}
		return instance
       }},
	  instantiator= namingWrapper[ name]
	instantiator.class= instantiationClass
	instantiator.oninstance= opts.oninstance
	instantiator.onarguments= opts.onarguments
	instantiator.this= self
	return instantiator
}
export {
	promiseInstantiator as default
}
