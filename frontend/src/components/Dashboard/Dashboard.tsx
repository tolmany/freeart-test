import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
}
const testData = {
  cName: "testing freeart",
  cPhone: "102030102031",
  cEmail: "testing@freeart.com",
};
export const Dashboard = (contractId: any, walletToUse: any) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  const { name, phone, email } = formData;
  const { cName, cPhone, cEmail } = testData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = (name: string, phone: string, email: string) => {
    console.log("name: ", name);
    console.log("phone: ", phone);
    console.log("email: ", email);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(name, phone, email);
    setEditing(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
  };

  useEffect(() => {
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
        <label>{cName}</label>
        <label>Phone Number</label>
        <label>{cPhone}</label>
        <label>Email Address</label>
        <label>{cEmail}</label>
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
