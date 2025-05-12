exports.up = async (knex) => {
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE donation_status AS ENUM ('Pendiente', 'Completado', 'Cancelado');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await knex.schema.createTable('donations_history', (table) => {
    table.string('id').primary();
    table.string('food_id').notNullable();
    table.string('beneficiary_id').notNullable();
    table.integer('quantity_donated').notNullable();
    table.timestamp('donation_date');
    table
      .enu('status', null, {
        useNative: true,
        existingType: true,
        enumName: 'donation_status',
      })
      .notNullable()
      .defaultTo('Pendiente');
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
  await knex.schema.dropTableIfExists('donations_history');

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS donation_status;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);
};
