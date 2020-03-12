INSERT INTO users(first_name, last_name, email, phone)
VALUES($1, $2, $3, $4)
RETURNING *



