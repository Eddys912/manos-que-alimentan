exports.up = async (knex) => {
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE notification_status AS ENUM ('Enviado', 'Pendiente', 'Fallido');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await knex.schema.createTable('notifications', (table) => {
    table.string('id').primary();
    table.string('user_id').notNullable();
    table.text('message').notNullable();
    table.timestamp('sent_at');
    table
      .enu('status', null, {
        useNative: true,
        existingType: true,
        enumName: 'notification_status',
      })
      .notNullable()
      .defaultTo('Pendiente');
    table.timestamps(true, true);
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('notifications');

  await knex.schema.raw(`
    DO $$ BEGIN
      DROP TYPE IF EXISTS notification_status;
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `);
};
