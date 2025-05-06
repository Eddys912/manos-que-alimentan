exports.seed = async function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: '0bbe2e09-5fda-4675-b3b3-81047c3163b3',
          first_name: 'Eduardo David',
          last_name: 'Peña',
          middle_name: 'Araujo',
          birth_date: '02-07-2002',
          email: 'eddys912sc@gmail.com',
          password: 'Eddys1912sc',
          role: 'Administrador',
          phone: '7292297535',
          address: 'Toluca, México',
          user_type: 'Empleado',
        },
        {
          id: '12f56c26-4d18-46b7-9765-463006c1f417',
          first_name: 'Jane',
          last_name: 'Doe',
          birth_date: '01-01-1999',
          email: 'jane@gmail.com',
          password: 'joe12345',
          role: 'Usuario',
          phone: '7292587849',
          address: '123 Main St',
          user_type: 'Cliente',
        },
        {
          id: '4955e520-20dd-4b51-a1e8-87bf82115fb1',
          first_name: 'Juan',
          last_name: 'Pérez',
          birth_date: '01-01-2004',
          email: 'juan@gmail.com',
          password: 'juan12345',
          role: 'Usuario',
          phone: '7222685492',
          address: '123 Main St',
          user_type: 'Cliente',
        },
      ]);
    });
};
