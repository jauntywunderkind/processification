"use module"

export const
  $deferrable= Symbol.for( "processification:deferrable"),
  $swapThis= Symbol.for( "processification:swapThis")

export class ProcessizedPromise extends Promise{
	static [ Symbol.species]= Promise
	constructor( exec, ...args){
		let res, rej
		super( function( _res, _rej){
			res= _res
			rej= _rej
		})
		if( exec[ $deferrable]){
			this.resolve= res
			this.reject= rej
		}
		let self= this
		if( exec[ $swapThis]){
			self= args[ 0]
			args[ 0]= this;
		}
		if( !exec[ $deferrable]){
			exec.call( self, res, rej, ...args)
		}else{
			exec.call( self, ...args)
		}
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
