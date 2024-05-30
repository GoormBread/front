import React from "react";
import Signin from "../components/loginpage/Signin";
import GroomHeader from "../components/@common/groomheader"

export default function LoginPage(){
    return(
        <>
            <GroomHeader redirection="/login" isActiveCreateLobbyButton={ false } isActiveLogoutButton={false}/>
            <Signin/>
        </>
    )
}