"use module"
import ProcessizedPromise,{ $swapThis} from "./promise.js"

const
  $state= Symbol.for( "processification:state"),
  $result= Symbol.for( "processification:state"),
  $resolve= Symbol.for( "processification:resolve"),
  $reject= Symbol.for( "processification:reject"),
  $fulfillReactions= Symbol.for( "processification:fulfillReactions"),
  $rejectReactions= Symbol.for( "processification:rejectReactions")

function ResolvePromise( value){
	const reactions= this[ $fulfillReactions]
	this[ $result]= value
	this[ $fulfilledReactions]= null
	this[ $rejectedReactions]= null
	this[ $state]= "fulfilled"
	for( let i= 0; i< reactions.length; ++i){
		reactions[ i]( value)
	}
}
function RejectPromise( reason){
	const reactions= this[ $rejectReactions]
	this[ $result]= reason
	this[ $fulfilledReactions]= null
	this[ $rejectedReactions]= null
	this[ $state]= "rejected"
	for( let i= 0; i< reactions.length; ++i){
		reactions[ i]( reason)
	}
}

export class ReflectiveProcessizedPromise extends ProcessizedPromise{
	static [ Symbol.species]= Promise
	constructor( exec, ...args){
		let res, rej
		super( function( _res, _rej){
			res= _res
			rej= _rej
		})
		this[ $fulfillReactions]= []
		this[ $rejectReactions]= []

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
	[ $state]= "pending"
	[ $resolve]= ResolvePromise
	[ $reject]= RejectPromise
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
