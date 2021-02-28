import Swal from 'sweetalert2';
import bgImg from '../img/home_bg.png';

const Loader = (function() {

    // Private
    const loaderSelector = "loader";
    const animationClasses = {
        show: "showAnimation",
        hide: "hideAnimation",
    }
    let shown = false;

    // document.getElementById(loaderSelector).style.backgroundImage = `url(${bgImg})`;
    document.getElementById(loaderSelector).classList.add("hidden");
    document.getElementById(loaderSelector).style.backgroundSize = `cover`;
    // document.getElementById(loaderSelector).style.opacity = 0.8;


    // helpers
    function fadeIn() {
        shown = true;
        Swal.isVisible() && Swal.close()
        console.log("Fading In")
        
        // document.getElementById(loaderSelector).classList.remove("hidden");
        // document.getElementById(loaderSelector).classList.add(animationClasses.show);
        // setTimeout(() => {
        //     document.getElementById(loaderSelector).classList.remove(animationClasses.show);
        //     document.getElementById(loaderSelector).classList.add("shown");

        //     // blur the body
        //     document.getElementById("root").classList.add("blurred");
        //     document.getElementById("canvas").classList.add("blurred");
        // }, 200);

        
        document.getElementById(loaderSelector).classList.remove("hidden");
        document.getElementById(loaderSelector).classList.remove(animationClasses.show);
        document.getElementById(loaderSelector).classList.add("shown");

        // blur the body
        document.getElementById("root").classList.add("blurred");
        document.getElementById("canvas").classList.add("blurred");

        // document.getElementById(loaderSelector).style.opacity = 0.8
        // document.getElementById(loaderSelector).style.visibility = "visible"
    }

    function fadeOut() {
        console.log("Fading out");
        document.getElementById(loaderSelector).classList.add(animationClasses.hide);
        setTimeout(() => {
            document.getElementById(loaderSelector).classList.remove(animationClasses.hide);
            document.getElementById(loaderSelector).classList.add("hidden");
        }, 900)

        // unblur the body
        document.getElementById("root").classList.remove("blurred");
        document.getElementById("canvas").classList.remove("blurred");
        // document.getElementById(loaderSelector).style.opacity = 0;
        // document.getElementById(loaderSelector).style.visibility = "hidden"
        // setTimeout(() => document.getElementById(loaderSelector).className = "", 899)
        // document.getElementById(loaderSelector).classList.add("hidden");

        shown = false;
    }

    function toggleReload() {
        shown === true ? fadeIn() : fadeOut();
    }

    function reload(time = 1300) {
        fadeIn();
        setTimeout(() => fadeOut(), time);
    }

    function isShown() {
        return shown;
    }
    // Interface
    return {
        fadeIn,
        fadeOut,
        toggleReload,
        isShown,
        reload
    }

})();


export default Loader;
