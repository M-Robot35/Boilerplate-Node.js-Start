import dataCurrent from "../helpers/dataCurrent";

class DatabaseBase {
    /**
     * @param database 
     * @description tranforma a data de  ISO para  dd/mm/yyyy
     */
    dataIsoTransform<T extends Record<string, any>>(database: T){    
        const keys: (keyof T)[] = ['created_at', 'update_at'];
        
        if(!database) return database
        
        keys.forEach(key => {
            const value = database[key];
            if (typeof value === 'string') {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    // Transforma a data ISO para o formato dd/mm/yyyy
                    database[key] = dataCurrent.formatarDataISO8601(value) as any; // type assertion
                }
            }
        });
        return database
    }

}

export default DatabaseBase