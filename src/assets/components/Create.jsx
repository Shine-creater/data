import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Create() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");  

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const addUser = { name, email, age: Number(age) };

        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                body: JSON.stringify(addUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                // Set error if response is not ok
                setError(result.error || "An error occurred while adding the user.");
            } else {
                console.log(result);
                setError(""); // Clear error if successful
                setName("");
                setEmail("");
                setAge(0);
                navigate("/ALL")
                console.log("User added successfully:", result);
            }
        } catch (error) {
            // Handle network error
            setError("Network error: " + error.message);
            console.error("Network error:", error.message);
        }
    };

    return (
        <>
           <div className="border">
           <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}
                <h2>Submit your information</h2>
                
                <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>} 
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
           </div>
        </>
    );
}

export default Create;
