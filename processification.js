"use module"
import {
	DEFAULT as PROMISE_DEFAULT,
	EXPORTS as PROMISE_EXPORTS,
	ProcessizedPromiseSuperConstructor,
	ProcessizedPromise
} from "./promise.js"
import {
	DEFAULT as GENERATOR_DEFAULT,
	EXPORTS as GENERATOR_EXPORTS,
	ProcessizedGeneratorSuperConstructor,
	ProcessizedGenerator
} from "./generator.js"

export {
	promise: {
		SuperConstructor: ProcessizedPromsieSuperConstructor,
		superConstructor: ProcessizedPromsieSuperConstructor,
		processized: ProcessizedPromise
	},
	ProcessizedPromise,
	ProcessizedPromise as processizedPromise,
	ProcessizedPromsieSuperConstructor,
	ProcessizedPromsieSuperConstructor as processizedPromsieSuperConstructor,
	
	generator: {
		SuperConstructor: ProcessizedGeneratorSuperConstructor,
		superConstructor: ProcessizedGeneratorSuperConstructor,
	}
	ProcessizedGenerator,
	ProcessizedGenerator as processizedGenerator,
	ProcessizedGeneratorSuperConstructor,
	ProcessizedGeneratorSuperConstructor as processizedGeneratorSuperConstructor 
}

