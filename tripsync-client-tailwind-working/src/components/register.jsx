import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert("Registered Successfully!");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto mt-10">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2" required />
      <button className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}
