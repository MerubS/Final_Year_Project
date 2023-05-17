const sqlConfig = {
<<<<<<< HEAD
    user: 'smartinvigilancetool',
    password: 'finalyearproject#23',
    server: 'final-year-project-ksm.database.windows.net',
    database: 'FinalyearProject',
=======
    user: 'root',
    password: '12345',
    server: 'DESKTOP-1GRPU84',
    database: 'fyp',
>>>>>>> 07f9edacd4b147002164ed2ff541f84051ee388c
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