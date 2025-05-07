exports.up = async (knex) => {
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE user_roles AS ENUM (
        'Administrador',
        'Gestor de usuarios',
        'Gestor de alimentos',
        'Gestor de empleados',
        'Usuario'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE user_types AS ENUM ('Cliente', 'Empleado');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE user_status AS ENUM ('Activo', 'Bloqueado', 'Inactivo');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('first_name', 150).notNullable();
    table.string('last_name', 100).notNullable();
    table.string('middle_name', 100);
    table.date('birth_date').notNullable();
    table.string('email', 150).unique().notNullable();
    table.string('password', 40).notNullable();
    table
      .enu('role', null, {
        useNative: true,
        existingType: true,
        enumName: 'user_roles',
      })
      .notNullable();
    table.string('phone', 10).unique();
    table.string('address', 255).notNullable();
    table
      .enu('user_type', null, {
        useNative: true,
        existingType: true,
        enumName: 'user_types',
      })
      .notNullable();
    table
      .enu('status', null, {
        useNative: true,
        existingType: true,
        enumName: 'user_status',
      })
      .notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.raw(`
    ALTER TABLE users
    ADD CONSTRAINT ck_password_min_length CHECK (char_length(password) >= 8);
  `);

  await knex.schema.raw(`
    ALTER TABLE users
    ADD CONSTRAINT ck_phone_only_digits CHECK (phone ~ '^[0-9]{10}$');
  `);
};

exports.down = async (knex) => {
  await knex.schema.raw(`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS ck_password_min_length;
  `);

  await knex.schema.raw(`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS ck_phone_only_digits;
  `);

  await knex.schema.dropTableIfExists('users');

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS user_roles;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS user_types;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS user_status;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);
};
