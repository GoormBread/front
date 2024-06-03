import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
import PlayerState from "./PlayerState";
import KeySetting from "./KeySetting";

export default function PlayerFeature() {
    const navigate = useNavigate();
    const [showKeySetting, setShowKeySetting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [player1_name, setPlayer1_name] = useState('Player1');
    const [player2_name, setPlayer2_name] = useState('Player2');
    const lobby_id = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/all-lobby/id=${lobby_id}`); // API 요청
                if (response.ok) {
                    const data = await response.json();
                    const response_user_name_1p = await fetch(`/all-user/${data.user_id_1p}/name`); // API 요청
                    if (response_user_name_1p.ok) {
                        const name_1p = await response_user_name_1p.json();
                        setPlayer1_name(name_1p);
                    } else {
                        console.error('1p이름 데이터 가져오기 실패');
                    }
                    const response_user_name_2p = await fetch(`/all-user/${data.user_id_2p}/name`); // API 요청
                    if (response_user_name_2p.ok) {
                        const name_2p = await response_user_name_2p.json();
                        setPlayer2_name(name_2p);
                    } else {
                        console.error('2p이름 데이터 가져오기 실패');
                    }
                } else {
                    console.error('데이터 가져오기 실패');
                }
            } catch (error) {
                console.error('네트워크 에러:', error);
            }
        };

        fetchData(); // 컴포넌트가 마운트될 때 fetchData 호출
      }, []);

    const ShowKeySettingBtn = () => {
        setShowKeySetting(true);
    };
    const handleReadyBtn = () => {
        setIsReady(!isReady);
    };
    const handleExitBtn = () => {
        navigate('/');
    }
    return (
        <>
        <div className="mb-[20px] w-[1440px] h-[362px] flex flex-row justify-center items-start gap-[150px]">
            <div id="player_state_container" className="relative flex flex-row items-center p-[15px_15px] gap-[100px] rounded-xl">
                <PlayerState name={player1_name} ready={isReady} />
                <PlayerState name={player2_name} ready={isReady}/>
            </div>
            <div id="btn_contanier" className="w-[230px] h-[348px] flex flex-col items-end p-[29px_10px] gap-10">
                <button id="ready_btn" onClick={handleReadyBtn} className="w-[200px] h-[70px] bg-[#B9DDC3] rounded-[12px] flex justify-center items-center px-4">
                    <div className="font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-[#1A1A1A]">
                        Ready
                    </div>
                </button>
                <button id="key_setting_btn" onClick={ShowKeySettingBtn} className="w-[200px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center text-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-white">
                        Key Setting
                    </div>
                </button>
                <button id="exit_btn" onClick={handleExitBtn} className="w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        EXIT
                    </div>
                </button>
            </div>
        </div>
        <KeySetting showKeySetting={showKeySetting} setShowKeySetting={setShowKeySetting} onClick={(e) => e.stopPropagation()} onClose={() => setShowKeySetting(false)}  />
        </>
    );
}