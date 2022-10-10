const fs = window.require('fs');
const path = window.require("path");
import { writeJSONFile, readJSONFile } from ".";
import { useTemplateStore } from "@/store";

export function checkConfig(projectPath, callback) {
    fs.access(path.join(projectPath, 'tool.config.json'), fs.constants.F_OK, (err) => {
        if (callback && typeof callback === 'function') {
            callback(err);
        }
    })
}

export function createConfig(projectPath, data, callback) {
    writeJSONFile(path.join(projectPath, 'tool.config.json'), data, callback);
}


function readConfig(path) {
    const config = JSON.parse(readJSONFile(path));
    return (key) => {
        return key.split('.').reduce((o, i) => {
            if (o) return o[i]
        }, config)
    }
}

export const readConfigByKey = readConfig(useTemplateStore().getProjectPath);