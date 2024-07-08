"use client"

import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class Item extends Component {
  handleFileUpload = (e) => {
    let formData = new FormData();
    const files = e.target.files;

    if (files.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No file selected',
        text: 'Please select at least one file to upload.',
      });
      return;
    }

    Array.from(files).forEach(file => {
      formData.append('files', file); // Ensure this key matches what the backend expects
    });

    axios.post('https://Api-002.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'Your files have been uploaded successfully.',
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error: ' + response.status,
        });
      }
    })
    .catch(error => {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: `Error: ${error.response.status} - ${error.response.data}`,
        });
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'No response from the server.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error: ${error.message}`,
        });
      }
      console.error('Error details:', error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
        <input type="file" name="fileInput" onChange={this.handleFileUpload} className="input" multiple />
          <div className="mt-3"></div>
        </div>
      </div>
    );
  }
}

export default Item;
