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

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FatchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[];
}

interface FatchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction = FatchTracksAction | FatchTracksErrorAction;