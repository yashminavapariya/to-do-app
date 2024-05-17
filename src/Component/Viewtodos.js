import React, { useState, useEffect } from "react";
import axios from "axios";

function Viewtodos() {

    const [data1, setData1] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [checkedItems, setCheckedItems] = useState({});
    const [categoryColors, setCategoryColors] = useState({
        Office: "red",
        Personal: "yellow",
        Family: "green",
        Friends: "cyan",
        Other: "gray"
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tasks");
                setData1(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            setData1(data1.filter((task) => task.id !== id));
            console.log("Task deleted successfully!");
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSort = (field) => {
        setSortBy(field);
    };


    const toggleChecked = (id) => {
        setCheckedItems({
            ...checkedItems,
            [id]: !checkedItems[id]
        });
    };


    const handleColorChange = (category, color) => {
        setCategoryColors({
            ...categoryColors,
            [category]: color
        });
    };


    let filteredData = data1.filter((task) =>
        task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (sortBy) {
        filteredData.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
    }


    return (
        <div className="container">
            <h1 className="mt-4 mb-4">View Todo List</h1>
            <div className="mb-4">

                <input
                    type="text"
                    placeholder="Search by category..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <button className="btn btn-secondary ml-2" onClick={() => handleSort("date")}>
                    Sort by Date
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => handleSort("category")}>
                    Sort by Category
                </button>
            </div>

            {filteredData.map((task) => (
                <div
                    className={"card mb-3" + (checkedItems[task.id] ? " checked" : "")}
                    key={task.id}
                    style={{ maxWidth: "500px", backgroundColor: categoryColors[task.category] }}
                >
                    <div className="card-body">

                        <h4 className="card-title">Date: {task.date}</h4>
                        <button className="btn btn-danger" onClick={() => deleteData(task.id)}>
                            ❌
                        </button>
                        <h5 className="card-title">{task.category} Task:</h5>
                        <p className="card-text">{task.task}</p>

                        <input
                            type="checkbox"
                            checked={checkedItems[task.id] || false}
                            onChange={() => toggleChecked(task.id)}
                        />

                        <select
                            value={categoryColors[task.category]}
                            onChange={(e) => handleColorChange(task.category, e.target.value)}
                        >
                            <option value="red">Office</option>
                            <option value="yellow">Personal</option>
                            <option value="green">Family</option>
                            <option value="cyan">Friends</option>
                            <option value="gray">Other</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Viewtodos;
