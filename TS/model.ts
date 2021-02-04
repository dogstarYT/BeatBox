

let model = {
    positions: [] as Array<{
        x: number, y: number, fileName: string, beat: number
    }>,
    files: [] as Array<{ fileName: string, beats: Array<boolean>, audio: HTMLAudioElement }>,
    lenght: 0,
    steps: 0,
    heightS: 0,
    widthS: 0,
    leftShift: 200,
    reLoadModule: ((beatCanvasId: string) => {
        model.files.forEach(f => {
            while (f.beats.length < model.steps) {
                f.beats.push(false);
            }
            while (f.beats.length > model.steps) {
                f.beats.pop();
            }
        });

        model.redraw(beatCanvasId);
    }),

    redraw: ((beatCanvasId: string) => {

        if (model.files.length > 0) {


            if (!beatCanvas || !ctxBeat) {

                beatCanvas = document.getElementById(beatCanvasId) as HTMLCanvasElement;
                ctxBeat = beatCanvas.getContext('2d');
            }

            ctxBeat.clearRect(0, 0, beatCanvas.width, beatCanvas.height);

            beatCanvas.width = beatCanvas.clientWidth;
            beatCanvas.height = beatCanvas.clientHeight;

            model.heightS = beatCanvas.height / (model.files.length + 1);
            model.widthS = (beatCanvas.width - model.leftShift) / (model.steps + 1);

            //draw rows

            for (let i = 1; i <= model.files.length; i++) {
                ctxBeat.beginPath();
                ctxBeat.moveTo(model.leftShift, (model.heightS + 1) * i);
                ctxBeat.lineTo(beatCanvas.width, (model.heightS + 1) * i);
                ctxBeat.stroke();

                ctxBeat.font = "30px Arial";
                ctxBeat.fillText(model.files[i - 1].fileName, 0, (model.heightS + 1) * i + 10);


            }


            //draw colums
            model.positions = [];
            for (let j = 0; j <= model.files.length - 1; j++) {
                for (let i = 0; i <= model.steps - 1; i++) {
                    let obj = {
                        x: (model.widthS * (i + 1)) + model.leftShift,
                        y: (model.heightS + 1) * (j + 1),
                        fileName: model.files[j].fileName,
                        beat: i
                    }
                    model.positions.push(obj)

                    if (model.files[j].beats[i]) {
                        ctxBeat.beginPath();
                        ctxBeat.arc(obj.x, obj.y, 20, 0, 2 * Math.PI);
                        ctxBeat.fillStyle = "black";
                        ctxBeat.fill();
                    }
                }

            }
            model.positions.forEach(p => {

                ctxBeat.beginPath();
                ctxBeat.moveTo(p.x, p.y + 10)
                ctxBeat.lineTo(p.x, p.y - 10)
                ctxBeat.stroke();
            });


            //text


        }
    }),
    ClickCauculation: ((clickX: number, clickY: number) => {
        //console.log("click at " + clickX + " " + clickY);
        let pos = model.positions.find(p => {
            let a = p.x - clickX;
            let b = p.y - clickY;
            let c = Math.sqrt(a * a + b * b);
            return (c < 30)
        });
        if (pos) {
            model.SelectBeat(pos.beat, pos.fileName)
        }


    }),
    SelectBeat: ((beat: number, fileName: string) => {

        let locationBeat = model.files.find(f => {
            return (f.fileName == fileName);
        });




        if (locationBeat) {
            locationBeat.beats[beat] = !(locationBeat.beats[beat])
            model.redraw("beatCanvas");
        }


    })

};

