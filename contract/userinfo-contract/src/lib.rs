use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, env, near_bindgen, AccountId, Balance, Gas, PanicOnDefault};
use near_sdk::serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[near_bindgen]
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct UserInfo {
    name: String,
    phone: String,
    email: String,
}

#[near_bindgen]
pub struct UserInfoContract {
    pub userinfoList: HashMap<AccountId, UserInfo>,
}

#[near_bindgen]
impl UserInfoContract {
    pub fn changeUserInfo(&mut self, account_id: AccountId, userinfo: UserInfo){
        self.userinfoList.insert(account_id, userinfo);

        // 
    }

    pub fn getUserInfo(&mut self, account_id: &AccountId) -> Option<UserInfo> {
        self.userinfoList.get(&account_id)
    }
}

