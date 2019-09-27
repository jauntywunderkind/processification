"use module"
import ProcessizedPromise, { $swapThis} from "./promise.js"
import promiseLift from "./promise-lift.js"
import { makeGetSuffixedName} from "./suffix.js"

export function liftAsync( execFn, opts= {}){
	// side effect!:
	execFn[ $swapThis]= true

	const
	  name= opts.name|| execFn.name,
	  instantiationClass= promiseLift( execFn),
	  namingWrapper= {[ name]: function( ...args){
		if( lifted.onarguments){
			args= lifted.onarguments( args, this)
		}
		const instance= new (lifted.class)( this, ...args)
		if( lifted.oninstance){
			lifted.oninstance( instance, this)
		}
		return instance
       }},
	  lifted= namingWrapper[ name]
	lifted.class= instantiationClass
	lifted.oninstance= opts.oninstance
	lifted.onarguments= opts.onarguments
	lifted.state= opts.state
	return lifted
}
export {
	liftAsync as default
}
