const ZamRepository = require('../repository/mysql2/ZamowieniaRepository');

exports.getZamowienia = (req, res, next) => {
    ZamRepository.getZamowienia()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getZamowienieById = (req, res, next) => {
    const zamowienieId = req.params.zamowienieId;
    ZamRepository.getZamowienieById(zamowienieId)
        .then(zam => {
            if(!zam) {
                res.status(404).json({
                    message: 'Zamowienie with id: '+zamowienieId+' not found'
                })
            } else {
                res.status(200).json(zam);
            }
        });
};

exports.createZamowienie = (req, res, next) => {
    ZamRepository.createZamowienie(req.body)
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

exports.updateZamowienie = (req, res, next) => {
    const zamowienieId = req.params.zamowienieId;
    ZamRepository.updateWyrob(zamowienieId, req.body)
        .then(result => {
           res.status(200).json({message: 'Zamowienie updated!', zam: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteZamowienie = (req, res, next) => {
    const zamowienieId = req.params.zamowienieId;
    ZamRepository.deleteZamowienie(zamowienieId)
        .then(result => {
            res.status(200).json({message: 'Removed zamowienie', zam: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyZamowienia = (req, res, next) => {
    const zamowienieIds = req.params.zamowienieIds;
    ZamRepository.deleteManyZamowienia(zamowienieIds)
        .then(result => {
            res.status(200).json({message: 'Removed zamowienia', zam: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

