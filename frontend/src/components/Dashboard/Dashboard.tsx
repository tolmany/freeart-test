import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {UserInfo} from "../../contracts/userinfo";
import * as UserInfoContract from "../../contracts/userinfo";
import { wallet } from "../../utils/near";

export const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
  });

  const [asset, setAsset] = useState(0);

  const { name, phone, email } = userInfo;
  
  const currentUser = wallet.getAccountId();
  
  useEffect(() => {
    UserInfoContract.getUserInfo({account_id: currentUser}).then(userinfo => {
      if(userinfo != undefined && userinfo.name != "")
        setUserInfo({name: userinfo?.name, phone: userinfo?.phone, email: userinfo?.email});
    })
  }, [])

  return (
    <section className="container">
      <div className="flex">
        <h1 className="large text-primary">Amount of Holding LP-Tokens</h1>
      </div>
      <div className="account-info">
        <label>Assets</label>
        <label>{asset ?? ''}</label>
      </div>
    </section>
  );
};
