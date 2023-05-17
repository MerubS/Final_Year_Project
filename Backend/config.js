const sqlConfig = {
    user: 'smartinvigilancetool',
    password: 'finalyearproject#23',
    server: 'final-year-project-ksm.database.windows.net',
    database: 'FinalyearProject',
    pool:{
        max:5,
        min:0
    },
    options: {
     trustedConnection: true,
     trustServerCertificate: true,
    },
    port: 1433
}


module.exports = {
    sqlConfig
}