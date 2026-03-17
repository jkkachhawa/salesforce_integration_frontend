const API_BASE_URL='http://localhost:3000';
import { useState } from "react"
import axios from "axios"

function App() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Company: "",
    Email: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  
  const submitLead = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await axios.post(API_BASE_URL+
        "/api/create-lead",
        form,
        {
          timeout: 10000, // avoid hanging request
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("response: ",response);
      if (response?.data?.success !== false) {
        setSuccess(true);
        // reset form
        setForm({
          FirstName: "",
          LastName: "",
          Company: "",
          Email: ""
        });
      }

    } catch (error) {

      // Server responded with error
      if (error.response) {
        setError(
          error.response.data?.message ||
          "Server error while creating lead."
        );
      }

      // Request made but no response
      else if (error.request) {
        setError("Network error. Please check your connection.");
      }

      // Something else
      else {
        setError("Unexpected error occurred.");
      }

      console.error("Lead creation failed:", error);

    } finally {
      setLoading(false);
    }
  };

  return (

    <div>

      <h2>Create Salesforce Lead</h2>

      <form onSubmit={submitLead}>

        <input name="FirstName" placeholder="First Name" onChange={handleChange} />
        <br />

        <input name="LastName" placeholder="Last Name" onChange={handleChange} />
        <br />

        <input name="Company" placeholder="Company" onChange={handleChange} />
        <br />

        <input name="Email" placeholder="Email" onChange={handleChange} />
        <br />

        <button type="submit">Create Lead</button>

      </form>

    </div>

  )

}

export default App