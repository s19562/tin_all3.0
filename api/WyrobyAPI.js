const WyrobyRepository = require('../repository/mysql2/WyrobyRepository');

exports.getWyroby = (req, res, next) => {
    WyrobyRepository.getWyroby()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getWyrobById = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobyRepository.getWyrobById(wyrobId)
        .then(wyrob => {
            if(!wyrob) {
                res.status(404).json({
                    message: 'Wyrob with id: '+wyrobId+' not found'
                })
            } else {
                res.status(200).json(wyrob);
            }
        });
};

exports.createWyrob = (req, res, next) => {
    WyrobyRepository.createWyrob(req.body)
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

exports.updateWyrob = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobyRepository.updateWyrob(wyrobId, req.body)
        .then(result => {
           res.status(200).json({message: 'Wyrob updated!', wyrob: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteWyrob = (req, res, next) => {
    const wyrobId = req.params.wyrobId;
    WyrobyRepository.deleteWyrob(wyrobId)
        .then(result => {
            res.status(200).json({message: 'Removed wyrob', wyrob: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};