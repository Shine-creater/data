import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { id } = useParams();

    // Fetch single user data
    const getSingleUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${id}`);
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Failed to fetch user details.");
            } else {
                setName(result.name);
                setEmail(result.email);
                setAge(result.age);
                setError("");
            }
        } catch (err) {
            setError("An error occurred: " + err.message);
        }
    };

    // Handle form submission
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, age }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Failed to update user.");
            } else {
                setSuccess("User updated successfully!");
                setError("");

                // Clear success message after 2 seconds
                setTimeout(() => setSuccess(""), 2000);
            }
        } catch (err) {
            setError("An error occurred: " + err.message);
        }
    };

    useEffect(() => {
        getSingleUser();
    }, []);

    return (
        <div>
            <div className="border">
                <div className="form-container">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <h2>Edit Your Information</h2>

                    <form onSubmit={handleEdit}>
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
        </div>
    );
};

export default Update;
