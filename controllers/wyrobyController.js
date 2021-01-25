

const WyrobRepository = require('../repository/mysql2/WyrobyRepository');

exports.showWyrobList = (req , res , next) => {
    WyrobRepository.getWyroby()
    .then(wyroby => {
        res.render('pages/wyrob-lista', {
            wyroby: wyroby,
            navLocation: 'wyrob'
        });
    });
    
}

exports.showAddWyrob = (req , res , next) => {
    res.render('pages/wyrob-new', {navLocation: 'wyrob'});
}

exports.showWyrob = (req , res , next) => {
    res.render('pages/wyrob-show', {navLocation: 'wyrob'});
}

exports.showAddWyrobForm = (req, res, next) => {
    res.render('pages/wyrob-new', {
        wyrob: {},
        pageTitle: 'Nowy wyrob',
        formMode: 'createNew',
        btnLabel: 'Dodaj wyrób',
        formAction: '/wyroby/add',
        navLocation: 'wyrob',
        validationErrors: null
    });
}

exports.showEditWyrobForm = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobRepository.getWyrobById(wyrobId)
        .then(wyrob => {
            res.render('pages/wyrob-new', {
                wyrob: wyrob,
                formMode: 'edit',
                pageTitle: 'Edycja wyrobu',
                btnLabel: 'Edytuj wyrob',
                formAction: '/wyroby/edit',
                navLocation: 'wyrob',
                validationErrors: null
            });
        });
};


exports.showWyrobDetails = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobRepository.getWyrobById(wyrobId)
        .then(wyrob => {
            res.render('pages/wyrob-new', {
                wyrob: wyrob,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wyrobu',
                formAction: '',
                navLocation: 'wyrob',
                validationErrors: null
            });
        });
}


exports.addWyrob = (req, res, next) => {
    const newWyrobData = { ...req.body };
    WyrobRepository.createWyrob(newWyrobData)
        .then( result => {
            res.redirect('/wyroby');
        })
        .catch(err => {
            res.render('pages/wyrob-new', {
                wyrob: newWyrobData,
                pageTitle: 'Dodawanie wyrobu',
                formMode: 'createNew',
                btnLabel: 'Dodaj wyrób',
                formAction: '/wyroby/add',
                navLocation: 'wyrob',
                validationErrors: err.details
            });
        });
};

exports.updateWyrob = (req, res, next) => {
    const wyrobId = req.body._id;
const wyrobData = { ...req.body };
WyrobRepository.updateWyrob(wyrobId, wyrobData)
    .then( result => {
        res.redirect('/wyroby');
    })
    .catch(err => {
        console.log(err.details);
        WyrobRepository.getWyrobById(wyrobId)
        .then(wyrobData => {
        res.render('pages/wyrob-new', {
            wyrob: wyrobData,
            pageTitle: 'Edycja wyrobu',
            formMode: 'edit',
            btnLabel: 'Edytuj wyrob',
            formAction: '/wyroby/edit',
            navLocation: 'wyrob',
            validationErrors: err.details
        });
        });
    });
};

exports.deleteWyrob = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobRepository.deleteWyrob(wyrobId)
    .then( () => {
        res.redirect('/wyroby');
    });
};