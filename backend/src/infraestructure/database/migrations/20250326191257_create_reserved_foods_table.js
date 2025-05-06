exports.up = async (knex) => {
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE reservation_status AS ENUM ('Pendiente', 'Completado', 'Cancelado');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  // Crear la tabla 'reserved_food'
  await knex.schema.createTable('reserved_food', (table) => {
    table.string('id').primary();
    table.string('food_id').notNullable();
    table.string('beneficiary_id').notNullable();
    table.integer('quantity_reserved').notNullable();
    table.timestamp('reservation_date');
    table
      .enu('status', null, {
        useNative: true,
        existingType: true,
        enumName: 'reservation_status',
      })
      .notNullable()
      .defaultTo('Pendiente');
    table.date('deadline').notNullable();
    table.timestamps(true, true);
    table
      .foreign('food_id')
      .references('id')
      .inTable('foods')
      .onDelete('CASCADE');
    table
      .foreign('beneficiary_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('reserved_food');

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS reservation_status;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);
};
