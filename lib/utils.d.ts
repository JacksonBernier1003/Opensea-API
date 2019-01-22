import BigNumber from 'bignumber.js';
import * as Web3 from 'web3';
import * as WyvernSchemas from 'wyvern-schemas';
import { WyvernAtomicizerContract } from 'wyvern-js/lib/abi_gen/wyvern_atomicizer';
import { AnnotatedFunctionABI, HowToCall } from 'wyvern-js/lib/types';
import { ECSignature, Order, Web3Callback, OrderJSON, UnhashedOrder, OpenSeaAsset, OpenSeaAssetBundle, UnsignedOrder, WyvernAsset } from './types';
export declare const NULL_ADDRESS: string;
export declare const NULL_BLOCK_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
export declare const OPENSEA_FEE_RECIPIENT = "0x5b3256965e7c3cf26e11fcaf296dfc8807c01073";
export declare const DEP_INFURA_KEY = "e8695bce67944848aa95459fac052f8e";
export declare const MAINNET_PROVIDER_URL = "https://eth-mainnet.alchemyapi.io/jsonrpc/y5dLONzfAJh-oCY02DCP3UWCT2pSEXMo";
export declare const RINKEBY_PROVIDER_URL = "https://eth-rinkeby.alchemyapi.io/jsonrpc/-yDg7wmgGw5LdsP4p4kyxRYuDzCkXtoI";
export declare const INVERSE_BASIS_POINT = 10000;
export declare const MAX_UINT_256: BigNumber;
export declare const WYVERN_EXCHANGE_ADDRESS_MAINNET = "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b";
export declare const WYVERN_EXCHANGE_ADDRESS_RINKEBY = "0x5206e78b21ce315ce284fb24cf05e0585a93b1d9";
export declare const DEFAULT_BUYER_FEE_BASIS_POINTS = 0;
export declare const DEFAULT_SELLER_FEE_BASIS_POINTS = 250;
export declare const OPENSEA_SELLER_BOUNTY_BASIS_POINTS = 100;
export declare const DEFAULT_MAX_BOUNTY = 250;
export declare const MAX_ERROR_LENGTH = 120;
export declare const MIN_EXPIRATION_SECONDS = 10;
export declare const SELL_ORDER_BATCH_SIZE = 2;
export declare const DEFAULT_GAS_INCREASE_FACTOR = 1.1;
/**
 * Promisify a callback-syntax web3 function
 * @param inner callback function that accepts a Web3 callback function and passes
 * it to the Web3 function
 */
export declare function promisify<T>(inner: (fn: Web3Callback<T>) => void): Promise<T>;
export declare const confirmTransaction: (web3: Web3, txHash: string) => Promise<{}>;
export declare const assetFromJSON: (asset: any) => OpenSeaAsset;
export declare const assetBundleFromJSON: (asset_bundle: any) => OpenSeaAssetBundle;
export declare const tokenFromJSON: (token: any) => WyvernSchemas.FungibleToken;
export declare const orderFromJSON: (order: any) => Order;
/**
 * Convert an order to JSON, hashing it as well if necessary
 * @param order order (hashed or unhashed)
 */
export declare const orderToJSON: (order: Order | UnhashedOrder) => OrderJSON;
export declare const findAsset: (web3: Web3, { account, proxy, wyAsset, schema }: {
    account: string;
    proxy: string;
    wyAsset: any;
    schema: any;
}) => Promise<"unknown" | "proxy" | "account" | "other">;
/**
 * Sign messages using web3 personal signatures
 * @param web3 Web3 instance
 * @param message message to sign
 * @param signerAddress web3 address signing the message
 */
export declare function personalSignAsync(web3: Web3, message: string, signerAddress: string): Promise<ECSignature>;
/**
 * Special fixes for making BigNumbers using web3 results
 * @param arg An arg or the result of a web3 call to turn into a BigNumber
 */
export declare function makeBigNumber(arg: number | string | BigNumber): BigNumber;
/**
 * Send a transaction to the blockchain and optionally confirm it
 * @param web3 Web3 instance
 * @param param0 __namedParameters
 * @param from address sending transaction
 * @param to destination contract address
 * @param data data to send to contract
 * @param gasPrice gas price to use. If unspecified, uses web3 default (mean gas price)
 * @param value value in ETH to send with data. Defaults to 0
 * @param onError callback when user denies transaction
 */
export declare function sendRawTransaction(web3: Web3, { from, to, data, gasPrice, value, gas }: Web3.TxData, onError: (error: Error) => void): Promise<string>;
/**
 * Estimate Gas usage for a transaction
 * @param web3 Web3 instance
 * @param fromAddress address sending transaction
 * @param toAddress destination contract address
 * @param data data to send to contract
 * @param value value in ETH to send with data
 */
export declare function estimateGas(web3: Web3, { from, to, data, value }: Web3.TxData): Promise<number>;
/**
 * Get mean gas price for sending a txn, in wei
 * @param web3 Web3 instance
 */
export declare function getCurrentGasPrice(web3: Web3): Promise<BigNumber>;
/**
 * Estimates the price of an order
 * @param order The order to estimate price on
 * @param secondsToBacktrack The number of seconds to subtract on current time,
 *  to fix race conditions
 * @param shouldRoundUp Whether to round up fractional wei
 */
export declare function estimateCurrentPrice(order: Order, secondsToBacktrack?: number, shouldRoundUp?: boolean): BigNumber;
/**
 * Get the Wyvern representation of an asset
 * @param schema The WyvernSchema needed to access this asset
 * @param tokenId The token's id
 * @param tokenAddress The address of the token's contract
 */
export declare function getWyvernAsset(schema: any, tokenId: string, tokenAddress: string): WyvernAsset;
/**
 * Get the non-prefixed hash for the order
 * (Fixes a Wyvern typescript issue and casing issue)
 * @param order order to hash
 */
export declare function getOrderHash(order: UnhashedOrder): string;
/**
 * Assign an order and a new matching order to their buy/sell sides
 * @param order Original order
 * @param matchingOrder The result of _makeMatchingOrder
 */
export declare function assignOrdersToSides(order: Order, matchingOrder: UnsignedOrder): {
    buy: Order;
    sell: Order;
};
/**
 * Delay using setTimeout
 * @param ms milliseconds to wait
 */
export declare function delay(ms: number): Promise<{}>;
/**
 * Encode the atomicized transfer of many assets
 * @param schema Wyvern Schema for the assets
 * @param assets List of assets to transfer
 * @param from Current address owning the assets
 * @param to Destination address
 * @param atomicizer Wyvern Atomicizer instance
 */
export declare function encodeAtomicizedTransfer(schema: any, assets: WyvernAsset[], from: string, to: string, atomicizer: WyvernAtomicizerContract): {
    calldata: string;
};
/**
 * Encode a transfer call for a Wyvern schema function
 * @param transferAbi Annotated Wyvern ABI
 * @param from From address
 * @param to To address
 */
export declare function encodeTransferCall(transferAbi: AnnotatedFunctionABI, from: string, to: string): any;
/**
 * Encode a call to a user's proxy contract
 * @param address The address for the proxy to call
 * @param howToCall How to call the addres
 * @param calldata The data to use in the call
 * @param shouldAssert Whether to assert success in the proxy call
 */
export declare function encodeProxyCall(address: string, howToCall: HowToCall, calldata: string, shouldAssert?: boolean): any;
/**
 * Validates that an address exists, isn't null, and is properly
 * formatted for Wyvern and Opensea
 * @param address input address
 */
export declare function validateAndFormatWalletAddress(address?: string): string;
