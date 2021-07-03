import React from 'react'
import { Nav } from '../Components/Nav/Nav'
import './assets/css/profile.css'
import { useUser, useAuth } from '../Contexts'
import { AiOutlineLogout } from 'react-icons/ai'

export function Profile() {

    const { userState: { userData } } = useUser();
    const { logout } = useAuth();

    return (
        <>
            <Nav />
            <div className="profile-page">
                <div className="profile-box">
                    <div className="profile-content">
                        <div className="profile-card">
                            <p className="profie-heading">Name</p>
                            <p className="profie-data">{userData.name}</p>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-card">
                            <p className="profie-heading">Email</p>
                            <p className="profie-data">{userData.email}</p>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-card">
                            <p className="profie-heading">Username</p>
                            <p className="profie-data">{userData.username}</p>
                        </div>
                    </div>
                    <div className="logout">
                        <button onClick={() => { logout() }} ><AiOutlineLogout className="logout" />LOGOUT</button>
                    </div>
                </div>
            </div>
        </>
    )
}