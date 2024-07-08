import { getData } from './datasweet';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Sweets() {
  const [sweet, setSweet] = useState(false); // Use boolean state for checkbox
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
      sweet: sweet ? "100" : "100", // Send "100" if sweet is checked, otherwise empty string
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://Api-001.com/add-sweet", requestOptions);
      if (response.ok) {
        setStatus('เพิ่มข้อมูล เรียบร้อย');
        Swal.fire({
          title: "Good job!",
          text: "Sweet added successfully",
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
          text: "There was an error adding the Sweet.",
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
      const response = await fetch(`https://Api-001.com/delete-sweets/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // Reload data after successful deletion
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        Swal.fire({
          title: "Deleted!",
          text: "Sweet deleted successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete Sweet.",
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
      <div className="mybox"></div>

      <div className="fromurl">
       
         
 









      <div className="text-center mt-5">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
             <div>  หน้า เทา เปิดอยู่</div> <br />
              <button className="btn btn-secondary" onClick={() => handleDelete(item.id)}> คลิกเพื่อเปลี่ยน</button>
            </div>
          ))
        ) : (
          <p>
            
            <form onSubmit={handleSubmit}>
        
          <div>  หน้าขาว เปิดอยู่</div> <br />
          <button type="submit" className="btn btn-info">
          คลิกเพื่อเปลี่ยน
          </button>
        </form>


          </p>
        )}
             </div>
      </div>
    </>
  );
}

export default Sweets;
