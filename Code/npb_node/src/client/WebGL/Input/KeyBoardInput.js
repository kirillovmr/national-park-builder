class KeyBoardInput
{
    constructor()
    {
        this.pressedW = false;
        this.pressedA = false;
        this.pressedS = false;
        this.pressedD = false;

        this.clickRDispatched = false;
        this.clickLDispatched = false;

        this.addEventListeners();

        this.rPressed = false;
        this.rtcb = null;
    }

    addRotationHandler(cb) {
        this.rtcb = cb
    }

    addEventListeners()
    {
        document.addEventListener('keydown', (e) => 
        {
            if(e.key === 'w')
            {
                this.pressedW = true;
            }
            if(e.key === 'a')
            {
                this.pressedA = true;
            }
            if(e.key === 's')
            {
                this.pressedS = true;
            }
            if(e.key === 'd')
            {
                this.pressedD = true;
            }
            if(e.key === 'r')
            {
                if (!this.rPressed)
                    this.rtcb();
                this.rPressed = true;
            }
        });

        document.addEventListener('keyup', (e) => 
        {
            if(e.key === 'w')
            {
                this.pressedW = false;
            }
            if(e.key === 'a')
            {
                this.pressedA = false;
            }
            if(e.key === 's')
            {
                this.pressedS = false;
            }
            if(e.key === 'd')
            {
                this.pressedD = false;
            } 
            if(e.key === 'r')
            {
                this.rPressed = false;
            }
        });
    }
}

export default new KeyBoardInput()