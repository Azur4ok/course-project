import {Routes, Route} from 'react-router-dom'
import {App} from '../App'
import React from 'react'
import { AuthorizationPage } from './auth-page/AuthorizationPage';
import { RegistrationPage } from './registration-page/registration-page.jsx';
import { Header } from '../components/header/Header';
import { ProfilePage } from './Profile-page/profile-page';

export const PageRoutes = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}
