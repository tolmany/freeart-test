use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, env, near_bindgen, AccountId, Balance, Gas, PanicOnDefault};
use near_sdk::serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct UserInfo {
    name: String,
    phone: String,
    email: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct UserInfoContract {
    user_info_list: HashMap<String, UserInfo>,
}

impl Default for UserInfoContract {
    fn default() -> Self {
        Self {
            user_info_list: HashMap::new()
        }
    }
}

#[near_bindgen]
impl UserInfoContract {
    pub fn change_user_info(&mut self, account_id: String, userinfo: UserInfo) -> Option<&UserInfo>{
        let _tmp_account_id = account_id.clone();
        if self.user_info_list.contains_key(&account_id) {
            *self.user_info_list.get_mut(&account_id).unwrap() = userinfo;
        } else {
            self.user_info_list.insert(account_id, userinfo);
        }

        // 
        return self.user_info_list.get(&_tmp_account_id);
    }

    pub fn get_user_info(&self, account_id: String) -> Option<&UserInfo> {
        return self.user_info_list.get(&account_id);
    }

    pub fn test_user_info(&self, userinfo: UserInfo) -> UserInfo {
        let new_userinfo: UserInfo = UserInfo {
            name: format!("{}{}", "contract-".to_string(), userinfo.name),
            phone: format!("{}{}", "contract-".to_string(), userinfo.phone),
            email: format!("{}{}", "contract-".to_string(), userinfo.email),
        };

        return new_userinfo;
    }
}

#[cfg(test)]
mod tests {
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;
    use std::collections::HashMap;

    use super::*;

    const MINT_STORAGE_COST: u128 = 5870000000000000000000;

    fn get_context(predecessor_account_id: String) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn test_change_user_info() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = UserInfoContract::default();

        let userinfo: UserInfo = UserInfo {
            name: String::from("testing freeart"),
            phone: String::from("102030102031"),
            email: String::from("testing@freeart.com"),
        };
        let inserted_userinfo = contract.change_user_info(accounts(0), userinfo).unwrap();
        assert_eq!(inserted_userinfo.name.to_string(), "testing freeart".to_string());
        assert_eq!(inserted_userinfo.phone.to_string(), "102030102031".to_string());
        assert_eq!(inserted_userinfo.email.to_string(), "testing@freeart.com".to_string());

        let userinfo1: UserInfo = UserInfo {
            name: String::from("testing freeart"),
            phone: String::from("555555555555"),
            email: String::from("testing@freeart.com"),
        };
        let updated_userinfo = contract.change_user_info(accounts(0), userinfo1).unwrap();
        assert_eq!(updated_userinfo.name.to_string(), "testing freeart".to_string());
        assert_eq!(updated_userinfo.phone.to_string(), "555555555555".to_string());
        assert_eq!(updated_userinfo.email.to_string(), "testing@freeart.com".to_string());
    }
}

