const fs = require('fs');
const path = require('path');

// Create a test image file
const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

// Create FormData
const FormData = require('form-data');
const form = new FormData();

// Create a blob from the buffer
const blob = new Blob([testImageData], { type: 'image/png' });
form.append('file', testImageData, {
  filename: 'test.png',
  contentType: 'image/png'
});
form.append('category', 'test');
form.append('altText', 'Test image');
form.append('uploadedBy', 'admin');
form.append('isPublic', 'true');

// Upload to server
fetch('http://localhost:3000/api/admin/media/upload', {
  method: 'POST',
  body: form
})
.then(res => res.json())
.then(data => {
  console.log('Upload successful:', data);
})
.catch(err => {
  console.error('Upload failed:', err);
});