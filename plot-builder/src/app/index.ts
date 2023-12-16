import { v4 as uuidv4 } from 'uuid';

export function deepClone<T extends object | null | undefined>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
}

let newId:string = "";
/** Next id for a new entity. Always negative! Will be replaced during save */
export function nextNewId() {
  newId = newId+"A";
  return newId;
}

export function uid4():string{
  return '94423984-fb5c-44fb-ba5e-6d3bb6737ba3';
}

export const DEFAULT_ID:string = '94423984-fb5c-44fb-ba5e-6d3bb6737ba3';
