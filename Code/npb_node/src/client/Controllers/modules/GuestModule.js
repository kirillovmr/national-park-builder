import { Player } from '../../Models';
import Global from '../../Global';
import Swal from 'sweetalert2'
import Loader from '../../Views/Loader';
import Webgl from '../../WebGL'

const GuestModule = (function() {

var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    showCloseButton: true,
    customClass: {
        'container': 'guestInfo'
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});



let max_capacity = 15;
let guests = 0;

function onGuest() {
    Player.addRevenue(Global.homeSceneState.state.user.idToken).then(res => {
        // if successfull, 
        console.log("Guest Came!");
        // , `${guests}/${max_capacity}`
        Global.gameSceneState.setState({
            ...Global.gameSceneState.state,
            money: res.newMoney
        })
    });

    Webgl.guestsManager.addGuest();
    Webgl.guestsManager.addGuest();
    Webgl.guestsManager.addGuest();
    Webgl.guestsManager.addGuest();

    setTimeout(() => {
        guestsLeft();
    }, getRandomInt(1, 5) * 1000 + 7500)

    // console.log("is opened: ", Global.isPopupOpened);
    // console.log("isVisiting: ", Global.isVisiting);
    // console.log("Loader.isShown: ", Loader.isShown());
    // console.log("Codition value: ", !Global.isPopupOpened && !Global.isVisiting && !Loader.isShown())

    if(!Global.isPopupOpened && !Global.isVisiting && !Loader.isShown())
        Toast.fire({
            icon: 'success',
            title: `Guest came! +${Global.gameSceneState.state.ticket_price}$`
        })

    guests++;
}

function guestsLeft(n = 1) {
    Webgl.guestsManager.removeGuest();
    Webgl.guestsManager.removeGuest();

    if (guests - n > 0) {
        guests -= n;
    } else {
        guests -= (n - Math.abs(guests - n));
        n = (n - Math.abs(guests - n));
    } 

    if(n > 0 && !Global.isPopupOpened && !Global.isVisiting && !Loader.isShown())
        Toast.fire({
            icon: 'info',
            title: `Guests left: ${n}!`
        })
    
    console.log("Guest Left!");
}

// public 
function startPolling() {
    // get excitement level and ticket price
    setInterval(() => {
        let guestVisitChance = 100 - (Global.gameSceneState.state.ticket_price * 100 / 30).toFixed(1);
        // cut offs
        if(guestVisitChance < 10) guestVisitChance = 10;
        if(guestVisitChance > 50) guestVisitChance = 50;
        // addon
        const guestVisitBoundary = guestVisitChance + Math.round(Global.gameSceneState.state.excitement / 100);
        // trigger
        guests < max_capacity && getRandomInt(1, 100) < guestVisitBoundary && onGuest();
    }, 10000);
}

function checkLastVisit() {
    return new Promise((resolve, reject) => {
        const oldMoney = Global.gameSceneState.state.money;
        // add revenue accordingly
        Player.addVisitRevenue(Global.homeSceneState.state.user.idToken).then(res => {
            Global.gameSceneState.setState({
                ...Global.gameSceneState.state,
                money: res.newMoney
            })
            
            if(res.newMoney - oldMoney > 0 && !Global.isPopupOpened && !Global.isVisiting && !Loader.isShown()) 
                Toast.fire({
                    icon: 'success',
                    title: `While you were offline, you earned: ${res.newMoney - oldMoney}$`
                })
                
            resolve(res);
        });
    })
    
}

function init() {
    console.log("Checking last visit....");
    checkLastVisit().then(_ => {
        startPolling();
        console.log("Polling started!");
    });
}

// helpers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

return {
    init
}

})();

export default GuestModule;