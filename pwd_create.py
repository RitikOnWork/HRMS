from werkzeug.security import generate_password_hash

# plain text password from signup form
plain_password = "laura"

# create secure hash
password_hash = generate_password_hash(plain_password)

print(password_hash)
