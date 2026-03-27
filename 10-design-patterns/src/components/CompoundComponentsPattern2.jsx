import React, { useEffect, useState } from "react"



function List({ value, onSelect, selectedUser }) {
    return (
        <div>
            <ul className="list-group">
                {value.map((item) => (
                    <li key={item.id}
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => onSelect(item.name)}
                        className={`list-group-item ${selectedUser === item.name ? "active" : ""}`}>{item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Detail({ value }) {
    console.log(value)
    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{value.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{value.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{value.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function CPPattern() {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedUserDetails, setSelectedUserDetails] = useState({})

    const handleUserSelect = (name) => {
        setSelectedUser(name)
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        if (selectedUser) {
            const user = users.find((u) => u.name === selectedUser)
            console.log(user)
            setSelectedUserDetails(user)
        }
    }, [selectedUser])


    return (
        <>
            <h1>CP Pattern</h1>
            <hr />
            <div className="row">
                <div className="col-4">
                    <List
                        value={users}
                        selectedUser={selectedUser}
                        onSelect={handleUserSelect}
                    />
                </div>
                <div className="col-8">
                    {selectedUser ? <Detail value={selectedUserDetails} /> : "Select a user to see details"}
                </div>
            </div>
        </>
    )
}

export default CPPattern