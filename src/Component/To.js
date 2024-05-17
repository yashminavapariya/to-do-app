import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function To() {
    const [data1, setData1] = useState([]);
    const [to, setTo] = useState({});
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState('0'); 

    const deleteData = (id) => {
        const newData = data1.filter((item) => item.id !== id);
        setData1(newData);
    };

    const getValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTo({ ...to, [name]: value });
    };

    const Tododata = (e) => {
        e.preventDefault();
        const obj = {
            task: e.target.task.value,
            date: e.target.date.value,
            category: e.target.category.value,
            status: status, 
            id: Math.round(Math.random() * 1000)
        };
        const newRecord = [...data1, obj];
        setData1(newRecord);

        axios.post("http://localhost:3000/tasks/", to)
            .then((res) => {
                console.log("Data posted successfully:", res.data);
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });

        e.target.task.value = "";
        e.target.date.value = "";
    };

    return (
        <div>
            
            <div>
                <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
                <form method="post" onSubmit={(e) => Tododata(e)}>
                    <table border={1} cellPadding="25px" style={{ backgroundColor: '#f7f1df', margin: '0 auto' }}>
                        <tr>
                            <td>Enter Your Task :</td>
                            <td><textarea type="text" name="task" style={{ height: '50px' }} onChange={(e) => getValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Enter Task category :</td>
                            <td>
                                <select name="category" style={{ height: '30px' }} onChange={(e) => getValue(e)}>
                                    <option value="Personal">Personal Task</option>
                                    <option value="Office">Office Task</option>
                                    <option value="Family">Family Task</option>
                                    <option value="Other">Other Task</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter Task Date :</td>
                            <td><input type="date" name="date" onChange={(e) => getValue(e)} /></td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        id="pending"
                                        className="form-check-input"
                                        name="status"
                                        value="0"
                                        checked={status === '0'}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <label className="form-check-label">Pending</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        id="completed"
                                        className="form-check-input"
                                        name="status"
                                        value="1"
                                        checked={status === '1'}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <label className="form-check-label">Completed</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><input style={{ padding: '10px 20px', borderRadius: '5px', fontSize: '18px', fontWeight: '600' }} type="submit" /> ||  <button><Link to='viewtodo' style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>View Todo List</Link></button>
                            </td>
                        </tr>
                    </table>
                </form>
                <br /><br /><br />
            </div>

            {data1.map((v, i) => {
                let color = '';
                if (v.category === 'Personal') color = 'green';
                else if (v.category === 'Office') color = 'gray';
                else if (v.category === 'Family') color = 'red';
                else if (v.category === 'Other') color = 'orange';
                else color = '';


            })}
        </div>
    );
}

export default To;
