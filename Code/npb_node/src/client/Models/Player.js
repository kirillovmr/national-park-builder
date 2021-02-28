
export function getPlayer(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/getPlayer?token=${idToken}`)
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve(null))
    })
}

export function getGuestingPlayer(uid) {
    return new Promise((resolve, reject) => {
        fetch(`/api/getGuestingPlayer?uid=${uid}`)
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve(null))
    })
}

export function getPlayerProfile(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/getPlayerProfile?token=${idToken}`)
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve(null))
    })
}

export function getLeaderboardPlayers() {
    return new Promise((resolve, reject) => {
        fetch(`/api/getLeaderboardPlayers`)
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve([]))
    })
}

export function getTasks(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/getTasks?token=${idToken}`)
            .then(response => response.json())
            .then(res => resolve(res))
            .catch(e => resolve([]))
    })
}

export function build(idToken, buildingData) {
    return new Promise((resolve, reject) => {
        fetch(`/api/build`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, buildingData })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}


export function addRevenue(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/addRevenue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}

export function addVisitRevenue(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/addVisitRevenue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}

export function changeTicketPrice(idToken, price) {
    return new Promise((resolve, reject) => {
        fetch(`/api/changeTicketPrice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, price })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}

export function setCameraSpawn(idToken, pos) {
    return new Promise((resolve, reject) => {
        fetch(`/api/setCameraSpawn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, pos })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}

export function resetIsland(idToken) {
    return new Promise((resolve, reject) => {
        fetch(`/api/resetIsland`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken })
        })
        .then(response => response.json())
        .then(res => resolve(res))
        .catch(e => resolve({ success: false }))
    })
}