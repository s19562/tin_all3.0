const KlientRepository = require('../repository/mysql2/KlienciRepository');

exports.showKlienciList = (req , res , next) => {
    KlientRepository.getKlienci()
        .then(klis =>{
            res.render('pages/klienci-list', {
                klis: klis,
                navLocation: 'klient'
            });
        });
}

exports.showAddKlient = (req , res , next) => {
    res.render('pages/klient-new', {navLocation: 'klient'});
}

exports.showKlient = (req , res , next) => {
    res.render('pages/klient-show', {navLocation: 'klient'});
}

exports.showAddKlientForm = (req, res, next) => {
    res.render('pages/klient-new', {
        klient: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/klienci/add',
        navLocation: 'klient',
        validationErrors: null
    });
}

exports.showEditKlientForm = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('pages/klient-new', {
                klient: klient,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/klienci/edit',
                navLocation: 'klient',
                validationErrors: null
            });
        });
};

exports.showKlientDetails = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            res.render('pages/klient-new', {
                klient: klient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                formAction: '',
                navLocation: 'klient',
                validationErrors: null
            });
        });
}



exports.addKlient = (req, res, next) => {
    const data = { ...req.body };
    KlientRepository.createKlient(data)
        .then( result => {
            res.redirect('/klienci');
        })
        .catch(err =>{
            res.render('pages/klient-new' , {
                klient: data,
                pageTitle: 'Nowy klient',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/klienci/add',
                navLocation: 'klient',
                validationErrors: err.details
            });
        });
};

exports.updateKlient = (req, res, next) => {
const klientId = req.body._id;
const klientData = { ...req.body };
KlientRepository.updateKlient(klientId, klientData)
    .then( result => {
        res.redirect('/klienci');
    })
    .catch(err =>{
        console.log(err.details)
        KlientRepository.getKlientById(klientId)
        .then(klientDataDb => {
            //klientData. nadpisac dane nowe (powiazane rekordy)
        res.render('pages/klient-new' , {
            klient: klientData,
            pageTitle: 'Edycja klienta',
            formMode: 'edit',
            btnLabel: 'Edytuj klienta',
            formAction: '/klienci/edit',
            navLocation: 'klient',
            validationErrors: err.details
        });
        });
    });
};

exports.deleteKlient = (req, res, next) => {
    const klientId = req.params.klientId;
KlientRepository.deleteKlient(klientId)
    .then( () => {
        res.redirect('/klienci');
    });
};
