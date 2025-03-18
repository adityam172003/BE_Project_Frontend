import Navbar from 'daisyui/components/navbar'
import React from 'react'

export default function Login() {
  return (
    <div className='Login'>
      <fieldset className="fieldset w-xs bg-base-500 border border-base-500 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>

        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
}
