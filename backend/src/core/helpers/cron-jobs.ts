import cron from 'node-cron'
import fs from 'fs'
import logSystem from '../config/Logs';
const path = require('path');


// --------------------------------------------------------------------
// Caminho para o arquivo de configuração JSON
// --------------------------------------------------------------------
const arquivoName:string= 'cron-jobs.json'
const cronConfigPath = path.join(__dirname, `../database/store/crons/${arquivoName}`);



// --------------------------------------------------------------------
// Funções disponíveis que podem ser executadas pelos cron jobs
// --------------------------------------------------------------------
// -------   exemplos   --------------
const availableFunctions:Record<string,any> = {
    exampleTask: () => {
        console.log('Tarefa executada em', new Date().toLocaleString());
    },
    anotherTask: () => {
        console.log('Outra tarefa executada em', new Date().toLocaleString());
    }
};


// --------------------------------------------------------------------
// Função para carregar as configurações de cron jobs 
// --------------------------------------------------------------------
const loadCronJobs = () => {
    if (fs.existsSync(cronConfigPath)) {
        const cronData:any = fs.readFileSync(cronConfigPath);
        return JSON.parse(cronData);
    }else{
        fs.writeFileSync(cronConfigPath, JSON.stringify({}))
        logSystem.success(`O Arquivo [ ${arquivoName} ] foi criado`)
    }    
    return {};
};


// --------------------------------------------------------------------
// Função para salvar as configurações de cron jobs
// --------------------------------------------------------------------
const saveCronJobs = (jobs: Record<string, any>) => {
    fs.writeFileSync(cronConfigPath, JSON.stringify(jobs, null, 2));
};


// --------------------------------------------------------------------
// Função para agendar cron jobs
// --------------------------------------------------------------------
const scheduleCronJobs = (cronJobs:any) => {
    for (const userId in cronJobs) {
        const userCrons = cronJobs[userId];
        for (const cronName in userCrons) {
            const { timeAction, fn } = userCrons[cronName];
            
            // Verifica se a função existe no mapeamento de funções
            if (availableFunctions[fn]) {
                cron.schedule(timeAction, availableFunctions[fn]);
                logSystem.success(`Cron "${cronName}" do usuário "${userId}" foi agendado para ${timeAction}`)
            } else {
                logSystem.error(`Função "${fn}" não encontrada para o cron "${cronName}" do usuário "${userId}".`)
            }
        }
    }
};


// --------------------------------------------------------------------
// Função para adicionar um cron job e salvar no arquivo JSON
// --------------------------------------------------------------------
export const addCronJob = (userId:string, cronName:string, timeAction:string, fn:string) => {
    if(!cron.validate(timeAction)){
        logSystem.error(`Cron time inválid -- [ ${timeAction} ]`)
        return
    }

    let cronJobs = loadCronJobs();
    
    if (!cronJobs[userId]) {
        cronJobs[userId] = {};
    }

    cronJobs[userId][cronName] = { timeAction, fn };
    saveCronJobs(cronJobs);
    
    if (availableFunctions[fn]) {
        // Agendar o novo cron job imediatamente após adicionar
        cron.schedule(timeAction, availableFunctions[fn]);
        logSystem.success(`Cron "${cronName}" do usuário "${userId}" adicionado e agendado para ${timeAction}`);
    } else {
        logSystem.error(`Função "${fn}" não encontrada. Cron não será agendado.`);
    }
};


// --------------------------------------------------------------------
// Carregar cron jobs do arquivo JSON e agendar 
// --------------------------------------------------------------------
const cronJobs = loadCronJobs();
scheduleCronJobs(cronJobs);



// --------------------------------------------------------------------
// Exemplo de como adicionar um cron job
// --------------------------------------------------------------------
// addCronJob('user_123', 'exampleCron', '* * * * *', 'exampleTask'); // A cada minuto
// addCronJob('user_123', 'anotherCron', '*/5 * * * *', 'anotherTask'); // A cada 5 minutos
// addCronJob('thiago', 'caraiu', '*/10 * * * *', 'anotherTask'); // A cada 10 minutos