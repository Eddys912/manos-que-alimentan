exports.up = async (knex) => {
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE food_status AS ENUM ('Disponible', 'Agotado', 'Descontinuado');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  // Crear la tabla 'foods'
  await knex.schema.createTable('foods', (table) => {
    table.string('id').primary();
    table.string('food_name', 150).unique().notNullable();
    table.string('image', 500).notNullable();
    table.string('category', 100).notNullable();
    table.date('expiration_date');
    table.integer('quantity').notNullable();
    table
      .enu('status', null, {
        useNative: true,
        existingType: true,
        enumName: 'food_status',
      })
      .notNullable()
      .defaultTo('Disponible');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('foods');

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS food_status;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);
};
