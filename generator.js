"use module"
import Defer from "p-defer"

export function ProcessizeGenerator( generator){
	return function( ...args){
		const
		  defer= Defer(),
		  iterator= generator( defer.promise, ...args)
		defer.resolve( iterator)
		return iterator
	}
}
export {
	ProcessizeGenerator as default
}
