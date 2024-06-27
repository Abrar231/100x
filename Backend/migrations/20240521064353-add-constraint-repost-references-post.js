'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION check_repost_content_not_null()
      RETURNS TRIGGER
      LANGUAGE PLPGSQL
      AS $$
      BEGIN
        IF NEW.repost_id IS NOT NULL THEN
          IF (SELECT content FROM "Posts" WHERE id = NEW.repost_id) IS NULL THEN
            RAISE EXCEPTION 'Cannot reference a post with null content for reposting';
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$;
    `);

    // Create the trigger
    await queryInterface.sequelize.query(`
      CREATE TRIGGER check_repost_content_not_null_trigger
      BEFORE INSERT OR UPDATE ON "Posts"
      FOR EACH ROW
      EXECUTE FUNCTION check_repost_content_not_null();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS check_repost_content_not_null_trigger ON "Posts";');

    // Drop the trigger function
    await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS check_repost_content_not_null();');
  }
};
