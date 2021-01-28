"use strict";
let beatCanvas: HTMLCanvasElement;
let ctxBeat: CanvasRenderingContext2D;

let files: Array<string> = [];
let allSoundsJson: any = {
    "beats": [
        "Bum",
        "Bell"
    ],
    "gituar": [
        "Top-down",
        "Down-top"
    ]
}

let sidePadding = 10;
function onLoad() {

    //    console.log("load");
    LenghtOrStepChange('stepsI', 'lenghtI')

    model.redraw("beatCanvas");
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
    console.log("clear all")
}

function save(id: string) {
    let name = (document.getElementById(id) as HTMLInputElement).value;
    localStorage.setItem(name, '1')
    console.log("save " + name);

}

function load(id: string) {
    let name = (document.getElementById(id) as HTMLInputElement).value;
    console.log("find " + name);

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
            if (files.indexOf(fileName) != -1) {
                checked = "checked";
            }

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


    files = [];
    //@ts-ignore
    checkboxes = checkboxes.forEach(c => {
        //@ts-ignore
        if (c.checked) {
            files.push(c.id);
        }
    });
    model.redraw("beatCanvas");
}


function LenghtOrStepChange(idStep: string, idLenght: string) {
    let s = (document.getElementById(idStep) as HTMLInputElement).value;
    let l = (document.getElementById(idLenght) as HTMLInputElement).value;

    model.lenght = parseInt(l);
    model.steps = parseInt(s);
    model.redraw("beatCanvas")
}