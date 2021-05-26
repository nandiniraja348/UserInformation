const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'postgres',
    password: 'password',
    port: 5432,
    // connectionString: 'postgres://postgres:password@postgres:5432/postgres',
    // idleTimeoutMillis: 30000
})

const createTable = () => {
    console.log("HELLOO)))")
    pool.query('CREATE TABLE IF NOT EXISTS users (ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30)); ', (error, results) => {
        if (error) {
            throw error
        }
        addUsers()
    })
}

const addUsers = () => {
    pool.query('SELECT count(*) FROM users;', (error, results) => {
        if (error) {
            throw error
        }
        console.log("hellp1 ")
        if (+results.rows[0].count === 0) {
            pool.query('INSERT INTO users (name, email) VALUES (\'Jerry\', \'jerry@example.com\'), (\'George\', \'george@example.com\');', (error, results) => {
                if (error) {
                    throw error
                }
                console.log("hellp2")
            })
        }
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createTable,
    addUsers,
}