import React, { ChangeEvent, useState } from "react";
import Switch from '@mui/material/Switch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setIsUser } from "../redux/roleSlice";

const Header = () => {
    const role = useSelector((state: RootState) => state.role);
    const dispatch = useDispatch<AppDispatch>();

    const handleUserSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setIsUser(e.target.checked));
    }

    return (
        <header className="header">
            <span>admin</span>
            <Switch
                className="header__role-switch"
                checked={role.isUser}
                onChange={handleUserSwitchChange}
                inputProps={{ 'aria-label': 'controlled' }} />
            <span>user</span>
            <div className="header__separator"></div>
            <LogoutIcon />
        </header>   
    )
}

export default Header;