const sqlConfig = {
    user: 'root',
    password: '12345',
    server: 'DESKTOP-1GRPU84',
    database: 'fyp',
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