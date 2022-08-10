export interface IComment {
    id: number;
    username: string;
    text: string;
}

export interface ITrack {
    id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[];
}