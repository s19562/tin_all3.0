const ZamowieniaRepository = require('../repository/mysql2/ZamowieniaRepository');
const KlientRepository = require('../repository/mysql2/KlienciRepository');
const WyrobRepository = require('../repository/mysql2/WyrobyRepository');

exports.showZamList = (req , res , next) => {
    res.render('pages/zam-lista', {navLocation: 'zam'});
};

exports.showAddZam = (req , res , next) => {
    res.render('pages/zam-new', {navLocation: 'zam'});
};

exports.showZam = (req , res , next) => {
    res.render('pages/zam-show', {navLocation: 'zam'});
};


exports.showZamowieniaList = (req, res, next) => {
    ZamowieniaRepository.getZamowienia()
        .then(zamowienia => {
            res.render('pages/zam-lista', {
                zamowienia: zamowienia,
                navLocation: 'zam'
            });
        });
};

exports.showAddZamowienieForm = (req, res, next) => {
    let allKli, allWyr;
    KlientRepository.getKlienci()
        .then(klienci => {
            allKli = klienci;
            return WyrobRepository.getWyroby();
        })
        .then(wyroby => {
            allWyr = wyroby;
            res.render('pages/zam-new', {
                zamowienie: {},
                formMode: 'createNew',
                allKli: allKli,
                allWyr: allWyr,
                pageTitle: 'Nowe zamówienie',
                btnLabel: 'Dodaj zamówienie',
                formAction: '/zam/add',
                navLocation: 'zam',
                validationErrors: null
            });
        });
};

exports.showEditZamowienieForm = (req, res, next) => {

    let allKli, allWyr;
    KlientRepository.getKlienci()
        .then(klienci => {
            allKli = klienci;
            return WyrobRepository.getWyroby();
        })
        .then(wyroby => {
            allWyr = wyroby;
            const zamowienieId = req.params.zamowienieId;
            return ZamowieniaRepository.getZamowienieById(zamowienieId);
            
        }).then(zamowienie => {
            res.render('pages/zam-new', {
                zamowienie: zamowienie,
                formMode: 'edit',
                allKli: allKli,
                allWyr: allWyr,
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/zam/edit',
                navLocation: 'zam',
                validationErrors: null
            });
        });

};

exports.showZamowienieDetails = (req, res, next) => {

    let allKli, allWyr;
    KlientRepository.getKlienci()
        .then(klienci => {
            allKli = klienci;
            return WyrobRepository.getWyroby();
        })
        .then(wyroby => {
            allWyr = wyroby;
            const zamowienieId = req.params.zamowienieId;
            return ZamowieniaRepository.getZamowienieById(zamowienieId);
        }).then(zamowienie => {
            res.render('pages/zam-new', {
                zamowienie: zamowienie,
                formMode: 'showDetails',
                allKli: allKli,
                allWyr: allWyr,
                pageTitle: 'Szczegóły zamówienia',
                formAction: '',
                navLocation: 'zam',
                validationErrors: null
            });
        });
};

// add nie dziala po walidacji serwerowej tak samo edit ,a przed działa ... 

exports.addZamowienie = (req, res, next) => {
    console.log('dodaje addzam')
    const data = { ...req.body };
    ZamowieniaRepository.createZamowienie(data)
        .then( result => {
            console.log('jestem po opercji dodania w kontrolerze')
            res.redirect('/zam');
        })
        .catch(err => {
            let allKli, allWyr;
            KlientRepository.getKlienci()
                .then(klienci => {
                    allKli = klienci;
                    return WyrobRepository.getWyroby();
                })
                .then(wyroby => {
                    allWyr = wyroby;
                    console.log(data)
                    res.render('pages/zam-new', {
                        zamowienie: data,
                        formMode: 'createNew',
                        allKli: allKli,
                        allWyr: allWyr,
                        pageTitle: 'Nowe zamówienie',
                        btnLabel: 'Dodaj zamówienie',
                        formAction: '/zam/add',
                        navLocation: 'zam',
                        validationErrors: err.details
                    });
                });
        });
    };


 

exports.updateZamowienie = (req, res, next) => {
    const zamowienieId = req.body._id;
const data = { ...req.body };
ZamowieniaRepository.updateZamowienie(zamowienieId, data)
    .then( result => {
        res.redirect('/zam');
    })
    .catch(err => {
        console.log(err.details)
        let allKli, allWyr;
    KlientRepository.getKlienci()
        .then(klienci => {
            console.log(err.details)
            allKli = klienci;
            return WyrobRepository.getWyroby();
        })
        .then(wyroby => {
            console.log(err.details)
            allWyr = wyroby;
            // const zamowienieId = req.params.zamowienieId;
            return ZamowieniaRepository.getZamowienieById(zamowienieId);
            
        })
        .then(data => {
            console.log(err.details)
            res.render('pages/zam-new', {
                zamowienie: data,
                formMode: 'edit',
                allKli: allKli,
                allWyr: allWyr,
                pageTitle: 'Edycja zamówienia',
                btnLabel: 'Edytuj zamówienie',
                formAction: '/zam/edit',
                navLocation: 'zam',
                validationErrors: err.details
            });
        });
    });
};

exports.deleteZamowienie = (req, res, next) => {
    const zamowienieId = req.params.zamowienieId;
ZamowieniaRepository.deleteZamowienie(zamowienieId)
    .then( () => {
        res.redirect('/zam');
    });
};