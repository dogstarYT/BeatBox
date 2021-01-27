"use strict";
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
let beatCanvas;
let sidePadding = 10;
function onLoad() {
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
    files = files;
}
//# sourceMappingURL=code.js.map