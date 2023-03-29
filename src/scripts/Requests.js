import { deleteRequest, getPlumbers, getRequests, sendCompletionRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
    }
})



// This is empty for now until it's used later. It converts the description to a list element
const convertRequestToListElement = (requestObject) => {
    const plumbers = getPlumbers()
    return `<li>${requestObject.description} 
    <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
    </select>
    <button class="request__delete" id="request--${requestObject.id}">Delete
</button>
</li>`
}



//This function completes the one above. You can use other data in the same way
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul> 
            ${
                //going through each request object, finding the description, and then joining them together
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
          
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */

            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()}

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletionRequest(completion)

        }
    }
)