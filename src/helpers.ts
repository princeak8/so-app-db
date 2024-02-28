import { DataSource } from "typeorm"
const ormConfig = require("./config/ormconfig").default;
import logger from "./logger";

interface errorInterface {
    constraints: [key:any];
}

export const validatorErrors = (errors: any) => {
    let errorMessages = <string[]>[];
    if(errors.length > 0) {
        errors.forEach((error:errorInterface) => {
            Object.values(error.constraints).forEach((value) => errorMessages.push(value))
        })
    }
    return errorMessages;
}

export const percentage = (firstVal:number, secondVal:number):string => {
    let diff = firstVal - secondVal;
    // console.log('diff:', diff);
    return (diff > 0) ? ((diff/firstVal) * 100).toFixed(2) : '0.00';
}

export const wait = (ms: number) => {
    return new Promise((resolve) => {
        console.log(`waiting ${ms/1000}Secs to retry connection`);
        setTimeout(resolve, ms);
    })
}

export const DBChecked:any = async (count=0) => {
    const dataSource = new DataSource(ormConfig);
    // if(!dataSource.isInitialized) {
        try{
            await dataSource.initialize();
            await dataSource.destroy();
            return true;
        } catch(err:any) {
            console.log("error connecting to db: ",err);
            await wait(5000);
        }
        if(count <=10) {
            count++;
            return await DBChecked(count);
        }else{
            logger.error("Exhausted attempts trying to connect the DB");
            return false;
        }
}
