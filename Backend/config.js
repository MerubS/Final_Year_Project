const sqlConfig = {
    user: 'SIT',
    password: '34670',
    server: 'SHAIKHZ',
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