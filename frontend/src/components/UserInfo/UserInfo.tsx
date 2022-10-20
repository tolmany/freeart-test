import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {UserInfo} from "../../contracts/userinfo";
import * as UserInfoContract from "../../contracts/userinfo";
import { wallet } from "../../utils/near";

export const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  const { name, phone, email } = userInfo;
  
  const currentUser = wallet.getAccountId();
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const updateUserInfo = (name: string, phone: string, email: string) => {
    const new_userinfo: UserInfo = {name, phone, email};
    UserInfoContract.updateUserInfo({account_id: currentUser, userinfo: new_userinfo});
    UserInfoContract.getUserInfo({account_id: currentUser}).then(userinfo => {
      if(userinfo != undefined && userinfo.name != "")
        setUserInfo({name: userinfo?.name, phone: userinfo?.phone, email: userinfo?.email});
    })
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUserInfo(name, phone, email);
    setEditing(false);
  };

  useEffect(() => {
    UserInfoContract.getUserInfo({account_id: currentUser}).then(userinfo => {
      if(userinfo != undefined && userinfo.name != "")
        setUserInfo({name: userinfo?.name, phone: userinfo?.phone, email: userinfo?.email});
    })
  }, [])

  return (
    <section className="container">
      <div className="flex">
        <h1 className="large text-primary">Account Information</h1>
        <button className="button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </div>
      <div className="account-info">
        <label>Full Name</label>
        <label>{name ?? ''}</label>
        <label>Phone Number</label>
        <label>{phone ?? ''}</label>
        <label>Email Address</label>
        <label>{email ?? ''}</label>
      </div>
      {editing && (
        <div className="modal" onClick={() => setEditing(false)}>
          <div
            className="form modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <button type="submit" onClick={onSubmit} className="button submit">
              Save
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
