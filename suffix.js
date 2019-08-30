"use module"
export function makeGetSuffixedName( suffix= "Promise"){
	let _suffix= suffix
	function getSuffixedName( name, suffix= _suffix){
		if( !name.endsWith( suffix)){
			return name+ suffix
		}
		return name
	}
	return getSuffixedName
}
export const getSuffixedName= makeGetSuffixedName( "Promise")
export {
	getSuffixedName as default
}
