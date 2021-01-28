"use strict";
let beatCanvas;
let ctxBeat;
let files = [];
let allSoundsJson = {
    "beats": [
        "Bum",
        "Bell"
    ],
    "gituar": [
        "Top-down",
        "Down-top"
    ]
};
let sidePadding = 10;
function onLoad() {
    LenghtOrStepChange('stepsI', 'lenghtI');
    model.redraw("beatCanvas");
}
function changeItemState(id) {
    let item = document.getElementById(id);
    let state = item.style.display;
    if (state == "" || state == "none") {
        item.style.display = "block";
    }
    else {
        item.style.display = "none";
    }
    return false;
}
function clearAll() {
    console.log("clear all");
}
function save(id) {
    let name = document.getElementById(id).value;
    localStorage.setItem(name, '1');
    console.log("save " + name);
}
function load(id) {
    let name = document.getElementById(id).value;
    console.log("find " + name);
}
function allStorageItems() {
    var values = [], keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        values.push({
            value: localStorage.getItem(keys[i]),
            key: keys[i]
        });
    }
    return values;
}
function fillLoad(id) {
    removeAllOptions(document.getElementById(id));
    let storageItems = allStorageItems();
    for (let i = 0; i < storageItems.length; i++) {
        let opt = document.createElement('option');
        opt.value = storageItems[i].value;
        opt.innerHTML = storageItems[i].key;
        document.getElementById(id).appendChild(opt);
    }
}
function removeAllOptions(selectbox) {
    for (let i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}
function loadInstruments(id) {
    let log = document.getElementById(id);
    log.innerHTML = "";
    let x = 0;
    Object.keys(allSoundsJson).forEach((groupName) => {
        x++;
        console.log(groupName);
        let groupDiv = document.createElement('div');
        groupDiv.className = "InstrumentGroup";
        groupDiv.innerText = groupName;
        groupDiv.id = "id:" + x;
        groupDiv.onclick = (() => { changeItemStateGroup(groupDiv.id); });
        log.appendChild(groupDiv);
        let fileDivContainer = document.createElement('div');
        fileDivContainer.id = "id:" + x + "c";
        fileDivContainer.style.display = "none";
        log.appendChild(fileDivContainer);
        allSoundsJson[groupName].forEach(fileName => {
            console.log("---" + fileName);
            let checked = "";
            if (files.indexOf(fileName) != -1) {
                checked = "checked";
            }
            let fileDiv = document.createElement('div');
            fileDiv.className = "InstrumentName";
            fileDiv.innerHTML = "<input id='" + fileName + "' class='CheckBox' " + checked + " type='checkbox'></input>" + fileName;
            fileDivContainer.appendChild(fileDiv);
        });
    });
}
function changeItemStateGroup(myId) {
    changeItemState(myId + "c");
}
function loadAllInstruments(cId, classId) {
    let checkboxes = document.getElementById(cId).querySelectorAll("." + classId);
    files = [];
    checkboxes = checkboxes.forEach(c => {
        if (c.checked) {
            files.push(c.id);
        }
    });
    model.redraw("beatCanvas");
}
function LenghtOrStepChange(idStep, idLenght) {
    let s = document.getElementById(idStep).value;
    let l = document.getElementById(idLenght).value;
    model.lenght = parseInt(l);
    model.steps = parseInt(s);
    model.redraw("beatCanvas");
}
let model = {
    lenght: 0,
    steps: 0,
    heightS: 0,
    widthS: 0,
    redraw: ((beatCanvasId) => {
        let constant = 150;
        if (files.length > 0) {
            if (!beatCanvas) {
                beatCanvas = document.getElementById(beatCanvasId);
                ctxBeat = beatCanvas.getContext('2d');
            }
            ctxBeat.clearRect(0, 0, beatCanvas.width, beatCanvas.height);
            beatCanvas.width = beatCanvas.clientWidth;
            beatCanvas.height = beatCanvas.clientHeight;
            model.heightS = beatCanvas.height / (files.length + 1);
            model.widthS = (beatCanvas.width - constant) / (model.steps + 1);
            for (let i = 1; i <= files.length; i++) {
                ctxBeat.beginPath();
                ctxBeat.moveTo(constant, (model.heightS + 1) * i);
                ctxBeat.lineTo(beatCanvas.width, (model.heightS + 1) * i);
                ctxBeat.stroke();
                ctxBeat.font = "30px Arial";
                ctxBeat.fillText(files[i - 1], 0, (model.heightS + 1) * i + 10);
            }
            for (let j = 1; j <= files.length; j++) {
                for (let i = 1; i <= model.steps; i++) {
                    ctxBeat.beginPath();
                    ctxBeat.moveTo(model.widthS * i + constant, (model.heightS + 1) * j);
                    ctxBeat.lineTo(model.widthS * i + constant, ((model.heightS + 1) * j) - 10);
                    ctxBeat.stroke();
                }
                for (let i = 1; i <= model.steps; i++) {
                    ctxBeat.beginPath();
                    ctxBeat.moveTo((model.widthS * i) + constant, (model.heightS + 1) * j);
                    ctxBeat.lineTo((model.widthS * i) + constant, ((model.heightS + 1) * j) + 10);
                    ctxBeat.stroke();
                }
            }
        }
    })
};
//# sourceMappingURL=code.js.map