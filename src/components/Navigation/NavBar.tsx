import React, { useRef } from 'react'
import './NavBar.css'
import { navItems } from '../../constants/Navbar/navbar'
import logo from '../../assets/icons/itradeprofitIcon1.ico'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext' // Importing Auth context

interface NavBarProps {
  onUpload: (file: File | null) => void
}

const NavBar: React.FC<NavBarProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { logout } = useAuth() // Accessing the logout function

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null
    await onUpload(file)

    // Reset the input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Clear the input value
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="sidebar">
      <div className="logo-title">
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <h4>iTradeProfit</h4>
      </div>
      <div className="uploadBtn">
        <label className="upload-button">
          + Import Trade
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </label>
      </div>
      <div className="nav-items">
        <ul className="listMenu">
          {navItems.map((item, index) => (
            <li key={index} className="eachList">
              {item.icon}
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default NavBar
