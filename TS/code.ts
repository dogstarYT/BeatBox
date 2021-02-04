"use strict";
let beatCanvas: HTMLCanvasElement;
let ctxBeat: CanvasRenderingContext2D;
let index: number = null;


let allSoundsJson: any = {
    "Bells": [
        "Bell-Hard",
        "Bell-Hardest",
        "Bell-Med",
        "Bell-Soft",
        "Bell-Softest",
        "Cowbell-Hard",
        "Cowbell-Hardest",
        "Cowbell-Med",
        "Cowbell-Soft",
        "Cowbell-Softest"
    ],
    "24-ride": [
        "24Ride-1",
        "24Ride-2",
        "24Ride-3",
        "24Ride-4",
        "24Ride-5"
    ],
    "Crash": [
        "Crash-Hard",
        "Crash-Hardest",
        "Crash-Med",
        "Crash-Soft",
        "Crash-Softest"
    ],
    "Hat": [
        "HatClosed-Hard",
        "HatClosed-Hardest",
        "HatClosed-Med",
        "HatClosed-Soft",
        "HatClosed-Softest",
        "HatOpen-Hard",
        "HatOpen-Hardest",
        "HatOpen-Med",
        "HatOpen-Soft",
        "HatOpen-Softest",
        "HatPedal-Hard",
        "HatPedal-Hardest",
        "HatPedal-Med",
        "HatPedal-Soft",
        "HatPedal-Softest",
        "HatSemiOpen-Hard",
        "HatSemiOpen-Hardest",
        "HatSemiOpen-Med",
        "HatSemiOpen-Soft",
        "HatSemiOpen-Softest"
    ],
    "Kick": [
        "Kick-Hard",
        "Kick-Hardest",
        "Kick-Med",
        "Kick-Soft",
        "Kick-Softest"
    ],
    "Ride": [
        "Ride-Hard",
        "Ride-Hardest",
        "Ride-Med",
        "Ride-Soft",
        "Ride-Softest",
    ],
    "SideSticks": [
        "SideStick-Hard",
        "SideStick-Hardest",
        "SideStick-Med",
        "SideStick-Soft",
        "SideStick-Softest",
    ],
    "Tom": [
        "Tom1-Hard",
        "Tom1-Hardest",
        "Tom1-Med",
        "Tom1-Soft",
        "Tom1-Softest",
        "Tom2-Hard",
        "Tom2-Hardest",
        "Tom2-Med",
        "Tom2-Soft",
        "Tom2-Softest",
        "TomFloor-Hard",
        "TomFloor-Hardest",
        "TomFloor-Med",
        "TomFloor-Soft"
    ],
    "Snare": [
        "Snare-Hard",
        "Snare-Hardest",
        "Snare-Med",
        "Snare-Soft",
        "Snare-Softest",
        "SnareRimshot-Hard",
        "SnareRimshot-Hardest",
        "SnareRimshot-Med",
        "SnareRimshot-Soft",
        "SnareRimshot-Softest"
    ],
    "Splash": [
        "Splash-Hard",
        "Splash-Hardest",
        "Splash-Med",
        "Splash-Soft",
        "Splash-Softest"
    ],
    "Others": ["HandClap"]

}

let sidePadding = 10;
function onLoad() {
    beatCanvas = (document.getElementById("beatCanvas") as HTMLCanvasElement);
    //    console.log("load");
    LenghtOrStepChange('stepsI', 'lenghtI')

    model.reLoadModule(beatCanvas.id);

    beatCanvas.onclick = ((e: MouseEvent) => {
        model.ClickCauculation(e.offsetX, e.offsetY);
    })
    play(index);
}

function play(i: number) {
    index = i;
    console.log(index);

    if (index != null) {
        //   console.log("play");
        for (let j = 0; j < model.files.length; j++) {
            if (model.files[j].beats[index]) {
                let audio = model.files[j].audio;
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }
    } else {
        //  console.log("Stop");
    }

    if (index >= model.steps - 1) {
        index = -1;
    }

    setTimeout(() => {
        if (index == null) {
            play(null);
        } else {
            play(index + 1);
        }

    }, (model.lenght * 100) / model.steps);

}

function switchPausePlay() {
    let oldIndex = index;
    if (oldIndex != null) {
        index = null;
    } else if (oldIndex == null) {
        index = 0;
    }
}

function changeItemState(id: string) {
    let item = document.getElementById(id);
    let state = item.style.display;
    if (state == "" || state == "none") {
        item.style.display = "block";

    } else {
        item.style.display = "none";
    }
    return false;
}

function clearAll() {
    console.log("clear all");
    model.files.forEach(f => {
        f.beats = [];
    });
    model.redraw(beatCanvas.id);
}

function save(id: string) {
    let name = (document.getElementById(id) as HTMLInputElement).value;
    localStorage.setItem(name, JSON.stringify(model));
}

function load(id: string) {
    let optionStorer = document.getElementById(id) as any;
    let name = optionStorer.options[optionStorer.selectedIndex].text
    let json = localStorage.getItem(name);
    model = { ...model, ...JSON.parse(json) };

    model.files.forEach(f => {
        f.audio = new Audio("./sounds/" + f.fileName + ".wav")
    });
    console.log("find " + name);
    model.redraw("beatCanvas");
}

function allStorageItems() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push({
            value: localStorage.getItem(keys[i]),
            key: keys[i]
        });
    }

    return values;
}

function fillLoad(id: string) {
    removeAllOptions(document.getElementById(id));

    let storageItems = allStorageItems();
    for (let i = 0; i < storageItems.length; i++) {
        let opt = document.createElement('option');
        opt.value = storageItems[i].value;
        opt.innerHTML = storageItems[i].key;
        document.getElementById(id).appendChild(opt);
    }
}

function removeAllOptions(selectbox: any) {
    for (let i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}

function loadInstruments(id: string) {
    let log = document.getElementById(id);
    log.innerHTML = "";

    let x = 0;
    Object.keys(allSoundsJson).forEach((groupName) => {
        x++;
        console.log(groupName);
        //make group div
        let groupDiv = document.createElement('div');
        groupDiv.className = "InstrumentGroup";
        groupDiv.innerText = groupName;
        groupDiv.id = "id:" + x;
        groupDiv.onclick = (() => { changeItemStateGroup(groupDiv.id) })
        log.appendChild(groupDiv);


        let fileDivContainer = document.createElement('div');
        fileDivContainer.id = "id:" + x + "c";
        fileDivContainer.style.display = "none";
        log.appendChild(fileDivContainer);
        //@ts-ignore
        allSoundsJson[groupName].forEach(fileName => {
            console.log("---" + fileName);

            let checked = ""
            model.files.forEach(f => {
                if (f.fileName.indexOf(fileName) != -1) {
                    checked = "checked";
                }
            });


            //make file div
            let fileDiv = document.createElement('div');
            fileDiv.className = "InstrumentName";
            fileDiv.innerHTML = "<input id='" + fileName + "' class='CheckBox' " + checked + " type='checkbox'></input>" + fileName;
            fileDivContainer.appendChild(fileDiv);
        });

    })
}

function changeItemStateGroup(myId: string) {
    changeItemState(myId + "c");
}

function loadAllInstruments(cId: string, classId: string) {
    let checkboxes = document.getElementById(cId).querySelectorAll("." + classId);


    let newfiles: Array<string> = [];
    //@ts-ignore
    checkboxes = checkboxes.forEach(c => {
        //@ts-ignore
        if (c.checked) {
            newfiles.push(c.id);
        }
    });
    model.files = model.files.filter(f => {
        return (newfiles.indexOf(f.fileName) != -1);
    });
    newfiles.forEach(n => {
        if (!(model.files.find((f) => { return (f.fileName == n) }))) {

            model.files.push({ fileName: n, beats: [], audio: new Audio("./sounds/" + n + ".wav") });
        }

    });

    model.files.forEach(f => {
        f.audio = new Audio("./sounds/" + f.fileName + ".wav")
    });


    model.reLoadModule(beatCanvas.id);
}


function LenghtOrStepChange(idStep: string, idLenght: string) {
    let s = (document.getElementById(idStep) as HTMLInputElement).value;
    let l = (document.getElementById(idLenght) as HTMLInputElement).value;

    model.lenght = parseInt(l);
    model.steps = parseInt(s);
    model.reLoadModule(beatCanvas.id);
}