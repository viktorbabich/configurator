module.exports = {
    port:"3251",
    mongoUrl: "mongodb://localhost/configurator",
    session: {
        secret: '576hgf54u3jjdfghj3',
        name: 'configurator.sid',
        proxy: true,
        resave: true,
        saveUninitialized: true
    },
    appSalt: "hb^hbfG^4F5tfgG53646tgfr&8y6tgNmj",
    multer:{
        dest:'./uploads/'
    },
    oAuth: {
    	id: '1038039075063-pu793sqguhim3is0uu7rhrfn4a8tdsvh.apps.googleusercontent.com',
    	secret: '1bpbFZwTVZQCOwqgnxUU0iBk',
    	returnURL: '/auth/google/return'
    }
};