const initializeState = {
    token: null,
}

const authentication = (state = initializeState, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TOKEN":
            return { token: action.payload}
        case "REMOVE_TOKEN":
            return { token: null}
        default:
            return state
    }
}

export function getToken(data) {
    console.log(data)
    return {
        type: "ADD_TOKEN",
        payload: data.data.token
    }
}

export default authentication;