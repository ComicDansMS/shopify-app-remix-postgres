import { Page } from "@shopify/polaris";
import { useState } from "react";

export default function Index() {
  const [createTableMessage, setCreateTableMessage] = useState("");
  const [insertPersonMessage, setInsertPersonMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateTable = async () => {
    try {
      const response = await fetch("/create-table");
      
      if (response.status === 200) {
        setCreateTableMessage("Table created successfully");
      } else {
        setCreateTableMessage("Error creating table");
      }
    } catch (error) {
      setCreateTableMessage("Error creating table");
    }
  };

  const handleInsertPerson = async () => {
    const formData = new URLSearchParams();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
  
    try {
      const response = await fetch("/insert-person", {
        method: 'POST',
        body: formData
      });
      
      const responseData = await response.json();
  
      if (response.status === 200) {
        setInsertPersonMessage(`Person inserted successfully with ID: ${responseData.id}`);
        
        setFirstName("");
        setLastName("");
        setEmail("");
        
      } else {
        setInsertPersonMessage("Error inserting person");
      }
    } catch (error) {
      setInsertPersonMessage("Error inserting person");
    }
  }

  return (
    <Page>
      <button onClick={handleCreateTable}>Create table</button>
      {createTableMessage && <div>{createTableMessage}</div>}
      
      <div>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <button onClick={handleInsertPerson}>Insert Person</button>
        {insertPersonMessage && <div>{insertPersonMessage}</div>}
      </div>
    </Page>
  );
}
