"use module"
import ProcessizedPromise from "./promise.js"
import getSuffixedName from "./suffix.js"

/**
* Lift a function into a promise implementation
*/
export function promiseLift( execFn, name= getSuffixedName( execFn.name)){
	const wrapper= {
		[name]: class extends ProcessizedPromise{
			constructor( ...args){
				super( execFn, ...args)
			}
		}
	}
	return wrapper[ name]
}
export {
	promiseLift as default
}
