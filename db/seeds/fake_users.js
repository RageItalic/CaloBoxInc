
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert({
        first_name: 'Marsha',
        last_name: 'Risher',
        email: 'mars_rishe@autozone-inc.info',
        password_hash: '123',
        phone_number: '1234567890',
        address: '1946 Sussex Court, Kosse, TX',
        zipcode: '76653'
      });
    }).then(function () {
        return knex('users').insert({
          first_name: 'Evelina',
          last_name: 'Malloy',
          email: 'evel.mall@diaperstack.com',
          password_hash: '123',
          phone_number: '1234567890',
          address: '859 Coal Street, Centre Hall, PA',
          zipcode: '88888'
        });
    }).then(function () {
        return knex('users').insert({
          first_name: 'Skyla',
          last_name: 'Camp',
          email: 'skylaca@egl-inc.info',
          password_hash: '123',
          phone_number: '2145586122',
          address: '3843 Rebecca Street, Chicage, IL',
          zipcode: '90902'
        });
    }).then(function () {
        return knex('users').insert({
          first_name: 'Charity',
          last_name: 'Rosne',
          email: 'charit_rosne@diaperstack.com',
          password_hash: '123',
          phone_number: '5204848957',
          address: '4889 Elk Rd Little, Tucson, AZ',
          zipcode: '90210'
        });
    }).then(function () {
        return knex('users').insert({
          first_name: 'Sunil',
          last_name: 'Ferreira',
          email: 'sun.ferreira@progressenergyinc.info',
          password_hash: '123',
          phone_number: '2482256491',
          address: '3467 Dogwood Road, Phoenix, AZ',
          zipcode: '10880'
        });
    }).then(function () {
        return knex('users').insert({
          first_name: 'Awusi',
          last_name: 'Moy',
          email: 'aw.moy@egl-inc.info',
          password_hash: '123',
          phone_number: '9145744889',
          address: '4942 Taylor Street, Scarsdale, NY',
          zipcode: '22340'
        });
    });
};
