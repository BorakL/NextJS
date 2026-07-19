import { readFile } from "fs/promises"
import path from "path"

export const getData = async () => {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
    const jsonData = await readFile(filePath, "utf-8")
    const data = JSON.parse(jsonData);
    return data;
}