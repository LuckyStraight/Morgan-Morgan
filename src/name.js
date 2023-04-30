import React, { useReducer, useState } from 'react';
import './App.css';
import './style.css';
import './name.css';
const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
  "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
};

export default function Step1({ setValue, nextPage }) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "dob",
      "address1",
      "city",
      "state",
      "zip",
      "reason"
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert(`Please fill in the following required fields: ${emptyFields.join(', ')}`);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      nextPage();
    }, 3000);
  };

  const handlePhoneBlur = (event) => {
    const { name, value } = event.target;
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      event.target.focus();
      return;
    }
    const formattedValue = cleanedValue.replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, "($1)-$2-$3");
    setFormData({ name, value: formattedValue });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      return;
    }
    setFormData({ name, value });
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "dob",
      "address1",
      "city",
      "state",
      "zip",
      "reason"
    ];
    const allRequiredFieldsCompleted = requiredFields.every((field) => formData[field]);
    setEmptyFields(requiredFields.filter((field) => !formData[field]));
    setFormCompleted(allRequiredFieldsCompleted);
  };

  const handleClick = (event) => {
    console.log(event.target.alt);
    setValue(event.target.alt);
    nextPage();
  };

  return (
    <div className="wrapper">
      <h1>Private Information Form</h1>
      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>: {value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>First Name*</p>
            <input name="firstName" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Middle Initial (optional)</p>
            <input name="middleInitial" onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Last Name*</p>
            <input name="lastName" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Email Address*</p>
            <input name="email" type="email" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Phone Number*</p>
            <input name="phoneNumber" type="tel" onBlur={handlePhoneBlur} onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Date of Birth*</p>
            <input name="dob" type="date" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Address 1*</p>
            <input name="address1" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Address 2 (optional)</p>
            <input name="address2" onChange={handleChange} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>City*</p>
            <input name="city" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>State*</p>
            <select name="state" onChange={handleChange} required>
              <option value="">Select a state...</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Zip Code*</p>
            <input name="zip" onChange={handleChange} required />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Reason for Starting a Case with Morgan & Morgan*</p>
            <textarea name="reason" onChange={handleChange} required />
          </label>
        </fieldset>
        <button type="submit" disabled={!formCompleted}>
          Submit
        </button>
        <div style={{ color: "red" }}>
          {emptyFields.length > 0 && `Please fill in the following required fields: ${emptyFields.join(', ')}`}
        </div>
        {/* Disable button until form is completed */}
      </form>
    </div>
  );
  return;
}