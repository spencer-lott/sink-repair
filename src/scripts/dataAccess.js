const applicationState = {
    requests:[],
    plumbers:[],
    completions:[]
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
    }
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests`, fetchOptions)   //location of said heist
    // this changes the string into json, and json turns it into an object
        .then(response => response.json())          // dirty money => clean money (.json())
        .then(() => {                               //take clean money => do stuff with it
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const sendCompletionRequest = (userServiceCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceCompletion)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`, fetchOptions)   //location of said heist
    // this changes the string into json, and json turns it into an object
        .then(response => response.json())          // dirty money => clean money (.json())
        .then(() => {                               //take clean money => do stuff with it
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


