export function deepClone<T extends object | null | undefined>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
}

let newId:string = "";
/** Next id for a new entity. Always negative! Will be replaced during save */
export function nextNewId() {
  newId = newId+"A";
  return newId;
}
