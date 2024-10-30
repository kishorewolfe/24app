'use client';
import { useState } from 'react';

export default function SendEmailForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage('Sending...');

    try {
      const res = await fetch('http://localhost:1337/api/mailchimp/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwMjIwNTkzLCJleHAiOjE3MzI4MTI1OTN9.BJiav3dXVXiH9bYjHUXI9GQ_L2FRNDm51iab3pkiJ_4'

        },
        body: JSON.stringify({
          toEmail: email,
          subject: 'Welcome to Our Service',
          templateID: 123456, // Replace with your template ID
          mergeFields: {
            FNAME: 'John',
            LNAME: 'Doe',
          },
        }),
      });

      if (res.ok) {
        setMessage('Email sent successfully!');
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Failed to send email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-[200px]">
      <input
        type="email"
        placeholder="Enter recipient's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded-md w-80"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Send Email
      </button>
      <p className="mt-2 text-center text-gray-700">{message}</p>
    </form>
  );
}
