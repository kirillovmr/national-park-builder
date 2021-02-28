class MouseInput
{
    constructor()
    {
        this.mousePressed = false;
        this.mouseMoved = false;

        this.mousePrevX = null;
        this.mousePrevY = null;

        this.mouseCurX = null;
        this.mouseCurY = null;

        this.addEventListeners();
    }

    addEventListeners()
    {
        let canvas = document.getElementById('canvas');

        canvas.addEventListener('mousedown', (e) => 
        {
            this.mouseCurX = e.pageX;
            this.mouseCurY = e.pageY;

            this.mousePressed = true;
        });

        canvas.addEventListener('mouseup', (e) => 
        {
            this.mousePressed = false;
        });

        canvas.addEventListener('mousemove', (e) => 
        {
            // Should be active only if the mouse is pressed
            if(this.mousePressed)
            {   
                this.mouseCurX = e.pageX;
                this.mouseCurY = e.pageY;

                if(this.mousePrevX === this.mouseCurX && this.mousePrevY === this.mouseCurY)
                {
                    this.mouseMoved = false;
                }
                else 
                {
                    this.mouseMoved = true;

                    this.mousePrevX = this.mouseCurX;
                    this.mousePrevY = this.mouseCurY;
                }
            }
        });
    }
}

export default new MouseInput()
