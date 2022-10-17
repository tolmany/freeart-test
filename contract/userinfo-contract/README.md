# UserInfo Smart Contract

>**Note**: This is the smart contract which can store the user information for the inidividual wallet address.

Prerequisites
======
  * Make sure Rust is installed per the prerequisites in [`near-sdk-rs`](https://github.com/near/near-sdk-rs).
  * Make sure [near-cli](https://github.com/near/near-cli) is installed.

Explore this contract
======

The source for this contract is in `nft/src/lib.rs`. It provides methods to manage access to user information, change user information, check the user information.

Building this contract
======
Run the following, and we'll build our rust project up via cargo. This will generate our WASM binaries into our `res/` directory. This is the smart contract we'll be deploying onto the NEAR blockchain later.
```bash
./scripts/build.sh
```

Tesitng this contract
======
We have some tests that you can run. For example, the following will run our simple tests to verify that our contract code is working.

```bash
cargo test -- --nocapture
```

Using this contract
======

### Quikest deploy

You can build and deploy this smart contract to a development account. [Dev Accounts](https://docs.near.org/concepts/basics/account#dev-accounts) are auto-generated accounts to assist in developing and testing smart contracts. Please see the [Standard deploy](#standard-deploy) section for creating a more personalized account to deploy to.

```bash
near dev-deploy --wasmFile res/userinfo.wasm
```

Behind the scenes, this is creating an account and deploying a contract to it. On the console, notice a message like:

>Done deploying to dev-1234567890123-12345676

In this instance, the account is `dev-1234567890123-12345676`. A file has been created containing a key pair to
the account, located at `neardev/dev-account`. To make the next few steps easier, we're going to set an
environment variable containing this development account id and use that when copy/pasting cmmands.
Run this command to set the environment variable:

```bash
source neardev/dev-account.env
```

You can tell if the environment variable is set correctly if your command line prints the account name after this command:
```bash
echo $CONTRACT_NAME
```
Now you can test each function of this contract. For example:

```bash
near call $CONTRACT_NAME new_default_meta '{"owner_id": "'$CONTRACT_NAME'"}' --accountId $CONTRACT_NAME
near view $CONTRACT_NAME nft_metadata
```