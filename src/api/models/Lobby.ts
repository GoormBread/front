export type Lobby = {
    lobbyId: string
    lobbyName: string;
    lobbyDescription: string;
    password: string;
    playerNum: number;
    players: { [key: string]: boolean };
    clients: { [key: string]: string }; // client.id와 playerId 매핑
    lock: boolean;
};