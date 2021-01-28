let model = {
    lenght: 0,
    steps: 0,
    heightS: 0,
    widthS: 0,
    redraw: ((beatCanvasId: string) => {
        let leftShift = 150;
        if (files.length > 0) {


            if (!beatCanvas) {

                beatCanvas = document.getElementById(beatCanvasId) as HTMLCanvasElement;
                ctxBeat = beatCanvas.getContext('2d');
            }

            ctxBeat.clearRect(0, 0, beatCanvas.width, beatCanvas.height);

            beatCanvas.width = beatCanvas.clientWidth;
            beatCanvas.height = beatCanvas.clientHeight;

            model.heightS = beatCanvas.height / (files.length + 1);
            model.widthS = (beatCanvas.width - leftShift) / (model.steps + 1);

            //draw rows

            for (let i = 1; i <= files.length; i++) {
                ctxBeat.beginPath();
                ctxBeat.moveTo(leftShift, (model.heightS + 1) * i);
                ctxBeat.lineTo(beatCanvas.width, (model.heightS + 1) * i);
                ctxBeat.stroke();

                ctxBeat.font = "30px Arial";
                ctxBeat.fillText(files[i - 1], 0, (model.heightS + 1) * i + 10);
            }


            //draw collums
            for (let j = 1; j <= files.length; j++) {
                for (let i = 1; i <= model.steps; i++) {
                    ctxBeat.beginPath();
                    ctxBeat.moveTo(model.widthS * i + leftShift, (model.heightS + 1) * j)
                    ctxBeat.lineTo(model.widthS * i + leftShift, ((model.heightS + 1) * j) - 10)
                    ctxBeat.stroke();
                }
                for (let i = 1; i <= model.steps; i++) {
                    ctxBeat.beginPath();
                    ctxBeat.moveTo((model.widthS * i) + leftShift, (model.heightS + 1) * j)
                    ctxBeat.lineTo((model.widthS * i) + leftShift, ((model.heightS + 1) * j) + 10)
                    ctxBeat.stroke();
                }
            }

            //text


        }
    })
};

