import { TrackAction, TrackActionTypes, TrackState } from "../../types/track"

const initState: TrackState = {
    error: '',
    tracks: []
}

export const trackReducer = (state = initState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, tracks: action.payload, error: ''}

        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
            
        default:
            return state;
    }
}