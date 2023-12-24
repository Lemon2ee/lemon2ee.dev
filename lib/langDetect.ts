import {ModelOperations} from "@vscode/vscode-languagedetection";
import {Lang} from "shiki";
import fs from "fs";


export default async function langDetect(code: string): Promise<Lang> {
    const modulOperationOptions = {
        modelJsonLoaderFunc: async () => {
            const file = fs.readFileSync(process.cwd() + '/model/model.json', "utf8");
            return JSON.parse(file)
        },
        weightsLoaderFunc: (): Promise<ArrayBuffer> => {
            return new Promise((resolve, reject) => {
                try {
                    const file = fs.readFileSync(process.cwd() + '/model/group1-shard1of1.bin');
                    resolve(file.buffer);
                } catch (error) {
                    reject(error);
                }
            });
        },

    }
    const modulOperations = new ModelOperations(modulOperationOptions);
    const result = await modulOperations.runModel(code)
    const lang = result[0].languageId || "plaintext"
    return lang as Lang
}