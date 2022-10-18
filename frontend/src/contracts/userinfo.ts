import * as naj from "near-api-js";
import { Gas, NEAR } from "near-units";
import { Buffer } from "buffer";
import { call, view, wallet } from "../utils/near";

/**
 * The contract wrapped by this file.
 * (This is the contract used in https://github.com/near-examples/guest-book)
 *
 * We *could* use `process.env.REACT_APP_CONTRACT_NAME` in this file, since the
 * template started with that environment variable set to `guest-book.testnet`.
 *
 * BUT, the idea of files in `src/contracts` is that they each wrap a specific
 * contract. If the env var `REACT_APP_CONTRACT_NAME` changes, this file is
 * still a wrapper around the guest book contract.
 */
export const CONTRACT_NAME = "dev-1666100011540-95227225137871";

/**
 * This is a Contract object instantiated using near-api-js.
 *
 * But this does not provide any TypeScript types! Using this approach makes it
 * hard for you and your collaborators to tell what arguments you can pass to
 * `getMessages` and `addMessage`.
 *
 * See other exports for a fully-typed approach instead.
 */
const connectedWalletAccount = wallet.account();
export const Untyped = new naj.Contract(connectedWalletAccount, CONTRACT_NAME, {
  viewMethods: ["get_user_info", "test_user_info"],
  changeMethods: ["change_user_info"],
});

/**
 * The data structure returned by `getMessages`
 */
export interface UserInfo {
  name: string;
  phone: string;
  email: string;
}

/**
 * Get most recent 10 messages
 */
export async function getUserInfo(args: {account_id: string}): Promise<UserInfo> {
  return view(CONTRACT_NAME, "get_user_info", args);
}

export async function testUserInfo(args: {userinfo: UserInfo}): Promise<UserInfo> {
  return view(CONTRACT_NAME, "test_user_info", args);
}

/**
 * Add a new message to the guest book.
 *
 * Whoever is signed in (`wallet.account()`) will be set as the `sender`
 *
 * If an `attachedDeposit` of at least 0.01 NEAR is included, the message will
 * be set as `premium`.
 *
 * @param args.text The text of the message
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
