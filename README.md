 ### Porject Setup
 
 Create a `.env` file at the root of the project directory using a provided sample:
    ```bash
   cp .env.example .env
    ```
Use Docker Compose to start the services defined in your `docker-compose.yml` file:
   ```bash
   docker-compose up -d
   ```
   This command starts all required services, including a Postgres database.

Install dependencies 
   ```bash
   npm install
   ```

### Running Migrations

1. **Set the `DATABASE_URL` environment variable**:  
   You need to export the `DATABASE_URL` before running migration commands. Replace `yourusername`, `yourpassword`, and other details with your PostgreSQL credentials and database information.

   ```bash
   export DATABASE_URL=[databaseConnectionString]
   ```

2. **Run the migration commands**:
   After setting the `DATABASE_URL`, run the following commands:

   - **For running migrations**:
     ```bash
     npm run migration:run -- development
     ```

   - **For generating a new migration** (replace `[MigrationName]` with the name of your migration):
     ```bash
     npm run migration:generate -- development [MigrationName]
     ```

**Start the application**:
   Once your migrations are done, start the application using:

   ```bash
   npm start
   ```
