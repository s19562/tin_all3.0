const db = require('../../config/mysql2/db');
const wyrSchema = require('../../model/joi/Wyrob');

exports.getWyroby = () => {
    return db.promise().query('SELECT * FROM Wyrob')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getWyrobById = (wyrobId) => {
    const query = `SELECT w._id as _id, w.name, w.cenaSz, zam._id as zam_id,
        zam.ilosc, zam.cenaAll, zam.dataZam, zam.rabat , zam.uwaga, kli._id as kli_id, kli.firstName, kli.lastName , 
        kli.nrTel , kli.uwagi 
    FROM Wyrob w 
    left join Zamowienia zam on zam.wyr_id = w._id
    left join Klient kli on zam.kli_id = kli._id 
    where w._id = ?`
    
return db.promise().query(query, [wyrobId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const wyrob = {
            _id: parseInt(wyrobId),
            name: firstRow.name,
            cenaSz: firstRow.cenaSz,
            zamowienia: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.zam_id) {
                const zamowienie = {
                    _id: row.zam_id,
                    ilosc: row.ilosc,
                    cenaAll: row.cenaAll,
                    dataZam: row.dataZam,
                    rabat: row.rabat,
                    uwaga: row.uwaga,
                    klient: {
                        _id: row.kli_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        nrTel: row.nrTel,
                        uwagi: row.uwagi
                    }
                };
                wyrob.zamowienia.push(zamowienie);
            }
        }
        return wyrob;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createWyrob = (newWyrobData) => {
    const vRes = wyrSchema.validate(newWyrobData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newWyrobData.name;
    const cenaSz = newWyrobData.cenaSz;
    const sql = 'INSERT into Wyrob (name, cenaSz) VALUES (?, ?)'
    return db.promise().execute(sql, [name , cenaSz]);

};

exports.updateWyrob = (wyrobId, wyrobData) => {
    const vRes = wyrSchema.validate(wyrobData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = wyrobData.name;
    const cenaSz = wyrobData.cenaSz;
    const sql = `UPDATE Wyrob set name = ?, cenaSz = ? where _id = ?`;
    return db.promise().execute(sql, [name, cenaSz, wyrobId]);

};

exports.deleteWyrob = (wyrobId) => {
    const sql1 = 'DELETE FROM Zamowienia where wyr_id = ?'
    const sql2 = 'DELETE FROM Wyrob where _id = ?'

    return db.promise().execute(sql1, [wyrobId])
        .then(() => {
            return db.promise().execute(sql2, [wyrobId])
        });
};