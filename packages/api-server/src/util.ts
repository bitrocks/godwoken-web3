import { BlockParameter } from "./methods/types";

const { platform } = require('os');
const { version: packageVersion } = require('../../../package.json');

export function getClientVersion() {
    //todo: change to rust process version
    const { version } = process
    return `Godwoken/v${packageVersion}/${platform()}/node${version.substring(1)}`;
}

export function handleBlockParameter (block_parameter: BlockParameter): BigInt {
    if(!block_parameter)
        throw new Error("block_parameter is undefind!");

    switch (block_parameter) {
        case 'latest':
            return BigInt('1'+'0'.repeat(10)); // a very large number
        
        case 'earliest':
            return BigInt(0);

        case 'pending':
            // throw new Error("pending transaction unsupported.");
            return BigInt('1'+'0'.repeat(10)); // treat it as 'latest'

        default:
            return BigInt(block_parameter);
    }
}

export function toCamel (s: string) {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
};

export function toSnake (s: string) {
    return s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export function snakeToCamel (t: object) {
    // db schema: snake_name => json rpc: camelName
    var camel: any = {};
    Object.keys(t).map(key => {
       //@ts-ignore
       camel[toCamel(key)] = t[key];
    });
    return camel;
}

export function camelToSnake (t: object) {
    // json rpc: camelName => db schema: snake_name
    var snake: any = {};
    Object.keys(t).map(key => {
       //@ts-ignore
       snake[toSnake(key)] = t[key];
    });
    return snake;
} 

export function toHex (i: number) {
    if (typeof i !== 'number')
       return i;
    
    return '0x' + BigInt(i).toString(16);
}

export function validateHexString(hex: string): boolean {
    return /^0x([0-9a-fA-F][0-9a-fA-F])*$/.test(hex)
}

export function validateHexNumber(hex: string): boolean {
    return /^0x(0|[0-9a-fA-F]+)$/.test(hex)
}
