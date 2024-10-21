import {ScheduledTask} from 'node-cron'

interface ICronExecutesInterface {
    cronTime: string;
    active: boolean; 
    params: any[] | null;
    fn: (() => any) | null;
    cron: ScheduledTask | null
}

interface ICronActions {
    [cronName: string]: ICronExecutesInterface; 
}

export interface ICronInterface {
    [user: string]: ICronActions; 
}