//로그인을 했을 경우 로비 리스트 페이지를 보여주지만 그렇지 않을 경우 랜딩 페이지를 보여준다.

import React from "react";
import LobbyList from "../components/mainpage/LobbyList";
import GroomHeader from "../components/@common/groomheader"

export default function MainPage(){
    return (
        <>
            <GroomHeader/>
            <LobbyList/>
        </>
    )
}