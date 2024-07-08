import { getData } from './data';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Pixcels from './Pixcels'
function FormAdd() {
  const [urls, setUrls] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      urls: urls,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://Api-001.com/add-url", requestOptions);
      if (response.ok) {
        setStatus('เพิ่มข้อมูล เรียบร้อย');
        Swal.fire({
          title: "Good job!",
          text: "URL added successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Reload the page
          }
        });
      } else {
        setStatus('เกิดข้อผิดพลาด');
        Swal.fire({
          title: "Error!",
          text: "There was an error adding the URL.",
          icon: "error",
        });
      }
    } catch (error) {
      setStatus('เกิดข้อผิดพลาด');
      console.error('Error:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error connecting to the server.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://Api-001.com/delete-myurl/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // Reload data after successful deletion
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        Swal.fire({
          title: "Deleted!",
          text: "URL deleted successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete URL.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error connecting to the server.",
        icon: "error",
      });
    }
  };

  return (
    <>
    <Pixcels/>
      <main className="mybox"></main>

      <div className="fromurl">
        Input URL
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Enter URL"
            className='inputs'
            value={urls}
          />
          <button type='submit' className='btn btn-info'>ตกลง</button>
        </form>
      </div>

      <div  className="boxss" >
        {data.length > 0 ? (
          
          data.map((item) => (
            <div key={item.id}>
              <p>{item.urls}</p>
              <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>ลบ</button>
            </div>
          ))
        ) : (
          <p>ใส่ URL ???</p>
        )}
      </div>
    </>
  );
}

export default FormAdd;
