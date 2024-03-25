import React from "react";
import "./contactUs.css"

export function ConctactUsPage() {
  return (
    <div className="contact-us">
      <TestForm />
    </div>
  )
}

export function TestForm() {
  const [formData, update] = useContactFormData();
  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form
      className="contact-form"
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="name">{"Name"}</label>
        <input id="name" name="name" type="text" value={formData.name || ""} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="email">{"Email"}</label>
        <input id="email" name="email" type="text" value={formData.email || ""} onChange={(e) => update("email", e.target.value)} />
      </div>
      <div className="field textarea">
        <label htmlFor="message">{"Message"}</label>
        <textarea id="message" name="message" value={formData.message || ""} onChange={(e) => update("message", e.target.value)} />
      </div>
      <button className="submit-button" type="submit">{"Send"}</button>
    </form>
  );
}

interface ContactFormData {
  name?: string;
  email?: string;
  message?: string;
}

function useContactFormData(): [ContactFormData, (key: keyof ContactFormData, value: string) => void] {
  const [data, setData] = React.useState<ContactFormData>({});

  // TODO: enforce types based on key (to support more than string);
  const updateField = (key: keyof ContactFormData, value: string) => {
    setData(prev => {
      return {
        ...prev,
        [key]: value
      }
    })
  }

  return [data, updateField];
}