import fs from 'fs'
import logSystem from '../config/Logs';
import * as path from 'path';
import { ICronInterface } from '../dto/scheduleDTO';
import cron from 'node-cron'
import FileMaster from './files'

const consertar = `
fazer com que o arquivo json seja salvo sem a propriedade
[ cron ] 
`

// --------------------------------------------------------------------------
//  INSIRA AS ACTIONS QUE O USUARIO PODE ESTAR ATIVANDO
// --------------------------------------------------------------------------
// exemplo
const actions = {
    'REMOVER_ALL': (message: string) => {
        console.log('Todas as tarefas foram removidas:', message);
    },
    'USER_ALL': (userId: string) => {
        console.log(`Executando ações para o usuário: ${userId}`);
    }
};

type AvailableFunctionNames = keyof typeof actions;
let schedules: ICronInterface = Object();


export default class Schendule {
    private cron;
    private arquivoName: string = 'schendule.json';
    private schedulePath = path.join(__dirname, `../database/store/crons/${this.arquivoName}`);
    
    private timeZone= "America/Sao_Paulo"

    
    constructor(private userId: string) {
        this.cron = cron;
        //this.load(); // Carregar crons existentes ao iniciar a instância
    }


    // --------------------------------------------------------------------------
    // Adicionar um novo cron com parâmetros para a função
    // --------------------------------------------------------------------------
    /**
     * @param cronTime Cron válido para para executar a ação
     * @param params array com os parametros a função [Caso precise]
     * @param fn função a ser executada caso queira
     * 
     * @example
     * 
     * schendule.schenduleAdd('USER_ALL', '* * * * *'); // Sem parâmetros, usa a função do objeto actions

     * schendule.schenduleAdd('USER_ALL', '* * * * *', ['user_123'], ()=>{ console.log('seu codigo')}); // A cada minuto, passando o ID do usuário
     * 
     * schendule.schenduleAdd('REMOVER_ALL', '*5 * * * *', ['Tarefas concluídas'], null); // A cada 5 minutos, passando uma mensagem
     * 
     */
    schenduleAdd( cronTime: string ,
        cronName: AvailableFunctionNames  ,
        params: any[] | null = null, // Array de parâmetros a ser passado para a função, opcional
        fn?: (...args: any[]) => void | null  // Função opcional com valor padrão
    ): void|null {
        
        if(!this.cron.validate(cronTime)){
            logSystem.error('Time cron Inválido !!')
            return null
        }

        let scheduleEntry = Object();
    
        const activeFn = fn ?? actions[cronName];
    
        if (!schedules[this.userId]) {
            schedules[this.userId] = {};
        }

        scheduleEntry= {
            cronTime,
            active: true,
            params: params ?? null,
            fn: fn ?? null,
        }        

        schedules[this.userId][cronName] = scheduleEntry;        

        // Função que será executada pelo cron job, passando os parâmetros (se fornecidos)
        const wrappedFn = () => {            
            if (params ) {
                activeFn(...params); // Passa os parâmetros para a função
            } else {
                activeFn(); // Executa a função sem parâmetros
            }
        };
        
        const execute = this.cron.schedule(cronTime,  wrappedFn,{
            timezone: this.timeZone,
            scheduled:false
        })
        execute.start()
        this.salve()

        schedules[this.userId][cronName].cron= execute        
        logSystem.success(`Cron job '${cronName}' adicionado para o usuário ${this.userId}.`);
    }


    // --------------------------------------------------------------------------
    // Iniciar um cron job específico
    // --------------------------------------------------------------------------
    schenduleStart(cronName: AvailableFunctionNames): void {        
        if (schedules[this.userId] && schedules[this.userId][cronName]) {
            const scheduleEntry = schedules[this.userId][cronName];
            
            if (!scheduleEntry.active) {
                if(!scheduleEntry.cron) return console.log('schenduleStart not cron', scheduleEntry)
                scheduleEntry.cron?.start();
                scheduleEntry.active = true;
                this.salve(); // Atualizar o estado no arquivo JSON
                logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi iniciado.`);
            }
        } else {
            logSystem.error(`Cron job '${cronName}' não encontrado para o usuário ${this.userId}.`);
        }
    }



    // --------------------------------------------------------------------------
    // Parar um cron job específico
    // --------------------------------------------------------------------------
    schenduleStop(cronName: AvailableFunctionNames): void {        
        if (schedules[this.userId] && schedules[this.userId][cronName]) {
            const scheduleEntry = schedules[this.userId][cronName];
            
            if (scheduleEntry.active) {
                if(!scheduleEntry.cron) return console.log('schenduleStop not cron', scheduleEntry)
                scheduleEntry.cron.stop();
                scheduleEntry.active = false;
                this.salve(); // Atualizar o estado no arquivo JSON
                logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi parado.`);
            }
        } else {
            logSystem.error(`Cron job '${cronName}' não encontrado para o usuário ${this.userId}.`);
        }
        
    }



    // --------------------------------------------------------------------------
    // Remover um cron job específico
    // --------------------------------------------------------------------------
    schenduleRemove(cronName: AvailableFunctionNames): void {
        if (schedules[this.userId] && schedules[this.userId][cronName]) {
            const scheduleEntry = schedules[this.userId][cronName];
            if(!scheduleEntry.cron) return console.log('schenduleRemove not cron', scheduleEntry)
            scheduleEntry.cron.stop();
            delete schedules[this.userId][cronName];
            this.salve(); // Salvar estado após a remoção
            logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi removido.`);
        } else {
            logSystem.error(`Cron job '${cronName}' não encontrado para o usuário ${this.userId}.`);
        }
    }



    // --------------------------------------------------------------------------
    // Iniciar todos os cron jobs do usuário
    // --------------------------------------------------------------------------
    schenduleStartAll(): void {
        if (schedules[this.userId]) {
            for (const cronName in schedules[this.userId]) {
                const scheduleEntry = schedules[this.userId][cronName];
                if (!scheduleEntry.active) {
                    if(!scheduleEntry.cron) return console.log('schenduleStartAll not cron', scheduleEntry)
                    scheduleEntry.cron.start();
                    scheduleEntry.active = true;
                    logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi iniciado.`);
                }
            }
            this.salve(); // Atualizar estado no arquivo JSON
        }
    }



    // -------------------------------------------------------------------------- 
    // Parar todos os cron jobs do usuário
    // --------------------------------------------------------------------------
    schenduleStopAll(): void {
        if (schedules[this.userId]) {
            for (const cronName in schedules[this.userId]) {
                
                const scheduleEntry = schedules[this.userId][cronName];                
                if (scheduleEntry.active) {
                    if(!scheduleEntry.cron) return console.log('schenduleStopAll not cron', scheduleEntry)
                    scheduleEntry.cron.stop();
                    scheduleEntry.active = false;
                    logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi parado.`);
                }
            }
            this.salve(); // Atualizar estado no arquivo JSON
        }
    }


    // --------------------------------------------------------------------------
    // Remover todos os cron jobs do usuário
    // --------------------------------------------------------------------------
    schenduleRemoveAll(): void {
        if (schedules[this.userId]) {
            for (const cronName in schedules[this.userId]) {
                const scheduleEntry = schedules[this.userId][cronName];
                if(!scheduleEntry.cron) return console.log('schenduleRemoveAll not cron', scheduleEntry)
                scheduleEntry.cron.stop();
                delete schedules[this.userId][cronName];
                logSystem.success(`Cron job '${cronName}' do usuário ${this.userId} foi removido.`);
            }
            this.salve(); // Salvar estado após a remoção
        }
    } 


    // --------------------------------------------------------------------------
    // Salvar os cron jobs no arquivo JSON
    // -------------------------------------------------------------------------- 
    private salve(): void {        
        //fs.writeFileSync(this.schedulePath, JSON.stringify(schedules, null, 2));
        logSystem.success('Cron jobs salvos no arquivo JSON.');
    }


    // --------------------------------------------------------------------------
    // Carregar os cron jobs do arquivo JSON
    // --------------------------------------------------------------------------
    private load(): void {
        
        if (fs.existsSync(this.schedulePath)) {
            const data = fs.readFileSync(this.schedulePath, 'utf8');
            schedules = JSON.parse(data);            

            //Restaurar os crons que estavam agendados no arquivo
            for (const userId in schedules) {
                for (const cronName in schedules[userId]) {
                    
                    const scheduleEntry = schedules[userId][cronName];
                    const activeFn = actions[scheduleEntry.cronName] ?? scheduleEntry.fn;

                    const execute= this.schenduleAdd(schedules.cronTime, activeFn)
                    // if(scheduleEntry.active){
                    //     schedules[userId][cronName].cron.start()
                    // }
                    // //Reagendar o cron, mas sem iniciar ainda
                    // scheduleEntry.cronJob = this.cron.schedule(scheduleEntry.cronTime, activeFn, {
                    //     scheduled: scheduleEntry.active,
                    // });
                }
            }
            logSystem.success('Cron jobs carregados do arquivo JSON.'); 
        }
    } 
}


//  -----------------------------------------------------------------------------------
//  exemplos de uso do Cron
//  -----------------------------------------------------------------------------------

// const schendule = new Schendule('user_123');

// => Adicionando cron jobs
// schendule.schenduleAdd('*/5 * * * *', 'REMOVER_ALL', ['Tarefas concluídas'], null); // A cada 5 minutos, passando uma mensagem
// schendule.schenduleAdd('* * * * *', 'USER_ALL', ['user_123'], null); // A cada minuto, passando o ID do usuário

// => Iniciar cron job específico
// schendule.schenduleStart('REMOVER_ALL');

// => Parar cron job específico
// schendule.schenduleStop('REMOVER_ALL');

// => Remover cron job específico
// schendule.schenduleRemove('USER_ALL');

// => Iniciar todos os cron jobs
// schendule.schenduleStartAll();

// => Parar todos os cron jobs
// schendule.schenduleStopAll();

// => Remover todos os cron jobs
// schendule.schenduleRemoveAll();