const KlienciRepository = require('../repository/mysql2/KlienciRepository');

exports.getKlienci = (req, res, next) => {
    KlienciRepository.getKlienci()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getKlientById = (req, res, next) => {
    const klientId = req.params.klientId;
    KlienciRepository.getKlientById(klientId)
        .then(kli => {
            if(!kli) {
                res.status(404).json({
                    message: 'Klient with id: '+kliId+' not found'
                })
            } else {
                res.status(200).json(kli);
            }
        });
};

exports.createKlient = (req, res, next) => {
    KlienciRepository.createKlient(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlienciRepository.updateKlient(klientId, req.body)
        .then(result => {
           res.status(200).json({message: 'Klient updated!', klient: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlienciRepository.deleteKlient(klientId)
        .then(result => {
            res.status(200).json({message: 'Removed klient', klient: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};