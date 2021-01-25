const db = require('../../config/mysql2/db');
const kliSchema = require('../../model/joi/Klient');


// /**
//  * @param email
//  * @param empId opcjonalne, używane przy edycji aby odróżnić edytowany obiekt (który może mieć taki sam email jak przed edycją)
//  */
checkTelUnique = (nrTel, kliId) => {
    let sql, promise;
    if(kliId) {
        sql = `SELECT COUNT(1) as c FROM Klient where _id != ? and nrTel = ?`;
        promise = db.promise().query(sql, [kliId, nrTel]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Klient where nrTel = ?`;
        promise = db.promise().query(sql, [nrTel]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['nrTel'],
                    message: 'Podany numer tel jest już używany'
                }]
            };
        }
        return err;
    });
}


exports.getKlienci = () => {
    return db.promise().query('SELECT * FROM Klient')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getKlientById = (klientId) => {
    const query = `SELECT k._id as _id, k.firstName, k.lastName, k.nrTel, k.uwagi, zam._id as zam_id,
        zam.ilosc, zam.cenaAll, zam.dataZam, zam.rabat , zam.uwaga, wyr._id as wyr_id, wyr.name, wyr.cenaSz
    FROM Klient k 
    left join Zamowienia zam on zam.kli_id = k._id
    left join Wyrob wyr on zam.wyr_id = wyr._id 
    where k._id = ?`


return db.promise().query(query, [klientId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            console.log(`tutaj jestem`);
            return {}; 
        }
        const klient = {
            _id: parseInt(klientId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            nrTel: firstRow.nrTel,
            uwagi: firstRow.uwagi,
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
                    wyrob: {
                        _id: row.wyr_id,
                        name: row.name,
                        cenaSz: row.cenaSz
                    }
                };
                klient.zamowienia.push(zamowienie);
            }
        }
        return klient;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};


exports.createKlient = (data) => {
    const vRes = kliSchema.validate(data, { abortEarly: false} );
    console.log('weszlam do vres')
    if (vRes.error){
        return Promise.reject(vRes.error);
    }
        // const firstName = newKlientData.firstName;
        // const lastName = newKlientData.lastName;
        // const nrTel = newKlientData.nrTel;
        // const uwagi = newKlientData.uwagi;
        console.log('createKlient');
        console.log(data);
        const sql = 'INSERT into Klient (firstName, lastName, nrTel , uwagi) VALUES (?, ?, ?, ?)';
        return db.promise().execute(sql, [data.firstName, data.lastName, data.nrTel , data.uwagi]);
    
    };

    // jak dodaje do metody Pana metode sprawdzającą unikalność tylko zmieniłam zmienne to niestety nie działa więc musze ją zakomentować bo chyba coś jest nie tak 

// exports.createKlient = (data) => {
//     const vRes = kliSchema.validate(data, { abortEarly: false} );
//     console.log('weszlam do vres')
//     if (vRes.error){
//         return Promise.reject(vRes.error);
//     }
//     return checkTelUnique(data.nrTel)
//     .then(telErr => {
//         if(telErr){
//             return Promise.reject(telErr);
//         } else {
//             console.log('weszlam do elsa')
//         console.log('createKlient');
//         console.log(data);
//         const sql = 'INSERT into Klient (firstName, lastName, nrTel , uwagi) VALUES (?, ?, ?, ?)'
//         return db.promise().execute(sql, [data.firstName, data.lastName, data.nrTel , data.uwagi]); 
//         }
//     })
//     .catch(err => {
//         return Promise.reject(err);
//     });
    
//     };


exports.updateKlient = (klientId, klientData) => {

    const vRes = kliSchema.validate(klientData, { abortEarly: false});
    if (vRes.error){
        console.log('Jestem w vReserror')
        return Promise.reject(vRes.error);
    }

    console.log('Jestem w repo')
    const firstName = klientData.firstName;
    const lastName = klientData.lastName;
    const nrTel = klientData.nrTel;
    const uwagi = klientData.uwagi;
    const sql = 'UPDATE Klient set firstName = ?, lastName = ?, nrTel = ?, uwagi = ? WHERE _id = ?';
    return db.promise().execute(sql, [firstName, lastName, nrTel, uwagi, klientId]);

};

exports.deleteKlient = (klientId) => {
    const sql1 = 'DELETE FROM Zamowienia where kli_id = ?'
    const sql2 = 'DELETE FROM Klient where _id = ?'

    return db.promise().execute(sql1, [klientId])
        .then(() => {
            return db.promise().execute(sql2, [klientId])
        });
};