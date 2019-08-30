"use module"
import ProcessizedPromise from "./promise.js"
import promiseLift from "./promise-lift.js"
import { makeGetSuffixedName} from "./suffix.js"

export function promiseInstantiator( execFn, opts= {}){
	const
	  name= opts.name|| execFn.name,
	  instantiationClass= promiseLift( execFn)
	function instantiator( ...opts){
	}
		const instance= new (instantiator.class)( ...opts)
		if( instantiator.oninstance){
			instantiator.oninstance( instance)
		}
		return instance
	}
	instantiator.name= opts.name|| execFn.name
	instantiator.class= instantiationClass
	instantiator.oninstance= opts.oninstance
	return instantiator
}
