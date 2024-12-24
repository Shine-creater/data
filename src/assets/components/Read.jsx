import React, { useEffect, useState } from 'react';

export const Read = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    // Fetch data from the backend
    async function getData() {
        try {
            const response = await fetch("http://localhost:5000");
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Failed to fetch data.");
            } else {
                setData(result);
                setError("");
            }
        } catch (err) {
            setError("Failed to fetch data: " + err.message);
        }
    }

    // Use effect to fetch data on component mount
    useEffect(() => {
        getData();
    }, []);

    // Handle delete request
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setError("Deleted Successfully");
                setTimeout(() => {
                    setError("");
                    getData(); // Refresh data after deletion
                    {error && <div style={{ color: 'red' }}>{error}</div>} 
                }, 2000);
            } else {
                const result = await response.json();
                setError(result.error || "Failed to delete the record.");
            }
        } catch (err) {
            setError("Failed to delete record: " + err.message);
        }
    };

    return (
        <>
            <h2>Enter Your Information</h2>
            {/* Display error if any */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Display data */}
            {data && data.map((ele) => (
                <form key={ele._id}>
                    <div>
                        <label className='name'>Name: {ele.name}</label>
                    </div>
                    <div>
                        <label className='email'>Email: {ele.email}</label>
                    </div>
                    <div>
                        <label className='age'>Age: {ele.age}</label>
                    </div>
                    <u>
                        <h4 className='cur' onClick={() => handleDelete(ele._id)}>Delete</h4>
                        <h4 className='cur' to={`/ ${ele._id }`}>Edit</h4>
                    </u>
                </form>
            ))}
        </>
    );
};

export default Read;
