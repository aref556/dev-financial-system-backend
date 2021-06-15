const isProd = process.env.PROD == 'true';
export const AppEnvironment = {
    dbHost: isProd ? 'mongodb://mongo/psu_financial_system_db' : 'mongodb://localhost/psu_financial_system_db'
};