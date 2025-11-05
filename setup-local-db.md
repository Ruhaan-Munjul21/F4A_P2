# Local PostgreSQL Setup

## Install PostgreSQL (choose one):

### Homebrew (recommended):
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Docker:
```bash
docker run --name fencing-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=fencing -p 5432:5432 -d postgres:15
```

### Postgres.app:
Download from https://postgresapp.com/

## Create Database:
```bash
createdb fencing_db
```

## Connection String:
```
DATABASE_URL=postgresql://username:password@localhost:5432/fencing_db
```

For Homebrew default:
```
DATABASE_URL=postgresql://$(whoami)@localhost:5432/fencing_db
```