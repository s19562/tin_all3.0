const db = require('../../config/mysql2/db');
const zamSchema = require('../../model/joi/Zam');

exports.getZamowienia = () => {
    const query = `SELECT zam._id as zam_id, zam.ilosc, zam.cenaAll, zam.dataZam, zam.rabat, zam.uwaga, wyr._id as wyr_id, wyr.name,
            wyr.cenaSz, k._id as k_id, k.firstName, k.lastName, k.nrTel , k.uwagi
        FROM Zamowienia zam
        left join Klient k on zam.kli_id = k._id
        left join Wyrob wyr on zam.wyr_id = wyr._id`
    return db.promise().query(query)
        .then( (results, fields) => {
            const zamowienia = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const zamowienie = {
                    _id: row.zam_id,
                    ilosc: row.ilosc,
                    cenaAll: row.cenaAll,
                    dataZam: row.dataZam,
                    rabat: row.rabat,
                    uwaga: row.uwaga,
                    wyrob: {
                        _id: row.wyr_id,
                        name: row.name,
                        cenaSz: row.cenaSz
                    },
                    klient: {
                        _id: row.k_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        nrTel: row.nrTel,
                        uwagi: row.uwagi
                    }
                };
                zamowienia.push(zamowienie);
            }
            console.log(zamowienia);
            return zamowienia;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getZamowienieById = (zamowienieId) => {
    const query = `SELECT zam._id as zam_id, zam.ilosc, zam.cenaAll, zam.dataZam, zam.rabat, zam.uwaga, wyr._id as wyr_id, wyr.name,
    wyr.cenaSz, k._id as k_id, k.firstName, k.lastName, k.nrTel , k.uwagi
    FROM Zamowienia zam
    left join Klient k on zam.kli_id = k._id
    left join Wyrob wyr on zam.wyr_id = wyr._id
        where zam._id = ?`
    return db.promise().query(query, [zamowienieId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const zamowienie = {
                _id: zamowienieId,
                ilosc: row.ilosc,
                cenaAll: row.cenaAll,
                dataZam: row.dataZam,
                rabat: row.rabat,
                uwaga: row.uwaga,
                wyrob: {
                    _id: row.wyr_id,
                    name: row.name,
                    cenaSz: row.cenaSz
                },
                klient: {
                    _id: row.k_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    nrTel: row.nrTel,
                    uwagi: row.uwagi
                }
            };
            console.log(zamowienie);
            return zamowienie;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createZamowienie = (data) => {
    const vRes = zamSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    console.log('createZamowienie');
    console.log(data);
    const sql = 'INSERT into Zamowienia (kli_id, wyr_id, ilosc, cenaAll, dataZam, rabat, uwaga) VALUES (?, ?, ?, ?, ?, ? ,?)';
    console.log('jwstem przed returnem');
    return db.promise().execute(sql, [data.klientId, data.wyrobId, data.ilosc, data.cenaAll, data.dataZam, data.rabat, data.uwaga]);
};

exports.updateZamowienie = (zamowienieId, data) => {
    const vRes = zamSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        console.log(vRes.error)
        return Promise.reject(vRes.error);
    }
    console.log('updateZamowienie');
    console.log(data);
    
    const sql = `UPDATE Zamowienia set kli_id = ?, wyr_id = ?, ilosc = ?, cenaAll = ?, dataZam = ?, rabat = ?, uwaga = ? where _id = ?`;
    return db.promise().execute(sql, [data.klientId, data.wyrobId, data.ilosc, data.cenaAll, data.dataZam, data.rabat, data.uwaga, zamowienieId]);
};

exports.deleteZamowienie = (zamowienieId) => {
    const sql = 'DELETE FROM Zamowienia where _id = ?'
    return db.promise().execute(sql, [zamowienieId]);
};

exports.deleteManyZamowienia = (zamowienieIds) => {
    const sql = 'DELETE FROM Zamowienia where _id IN (?)'
    return db.promise().execute(sql, [zamowienieIds]);
};