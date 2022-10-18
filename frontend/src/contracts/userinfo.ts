import * as naj from "near-api-js";
import { Gas, NEAR } from "near-units";
import { Buffer } from "buffer";
import { call, view, wallet } from "../utils/near";

const CONTRACT_NAME = process.env.REACT_APP_USERINFO_CONTRACT_NAME || "";

const connectedWalletAccount = wallet.account();

export const Untyped = new naj.Contract(connectedWalletAccount, CONTRACT_NAME, {
  viewMethods: ["get_user_info", "test_user_info"],
  changeMethods: ["change_user_info"],
});

/**
 * The data structure returned by `getUserInfo`
 */
export interface UserInfo {
  name: string;
  phone: string;
  email: string;
}

export async function getUserInfo(args: {account_id: string}): Promise<UserInfo> {
  return view(CONTRACT_NAME, "get_user_info", args);
}

export async function testUserInfo(args: {userinfo: UserInfo}): Promise<UserInfo> {
  return view(CONTRACT_NAME, "test_user_info", args);
}

/**
 * Insert or Update a userinfo to the contract.
 *
 * Whoever is signed in (`wallet.account()`) will be set as the `sender`
 *
 * If an `attachedDeposit` of at least 0.01 NEAR is included, the message will
 * be set as `premium`.
 *
 * @param options.attachedDeposit Send at least 0.01 NEAR (`NEAR.parse('0.1')`) for the message to be considered "premium"
 * @param options.gas Max amount of gas that method call can use; default is 30 Tgas (roughly 30ms of processing time), max allowed is 300 Tgas; can include with `Gas.parse('150 Tgas')
 * @param options.walletMeta Metadata to send the NEAR Wallet if using it to sign transactions.
 * @param options.walletCallbackUrl Callback url to send the NEAR Wallet if using it to sign transactions.
 * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io)
 */
export async function updateUserInfo(
  args: {
    account_id: string,
    userinfo: UserInfo,
  },
  options?: {
    attachedDeposit?: NEAR;
    gas?: Gas;
    walletMeta?: string;
    walletCallbackUrl?: string;
    stringify?: (input: any) => Buffer;
  }
): Promise<void> {
  return call(CONTRACT_NAME, "change_user_info", args,  options);
}
