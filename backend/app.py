from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import mysql.connector

app = Flask (__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1712'
app.config['MYSQL_DB'] = 'piteste'

mysql = MySQL(app)
 
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup')
def cadastrar():
    return render_template('signup.html')

@app.route('/register', methods = ['POST']) 
def cadastro(): 
    cursor = mysql.connection.cursor()
    
    nomeUsuario = request.form['nome']
    senhaUsuario = request.form['senha']
    telefoneUsuario = request.form['telefone']
    emailUsuario = request.form['email']
    cepUsuario = request.form['cep']
    endUsuario = request.form['endereco']

    cursor.execute("SELECT nomeUsuario FROM usuario WHERE nomeUsuario = %s", (nomeUsuario,))
    user_existe = cursor.fetchone()

    if user_existe:
        return "Usuário existente, digite outro!"
    
    cursor.execute('INSERT INTO usuario (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario, cepUsuario, endUsuario) VALUES (%s, %s, %s, %s, %s, %s)', (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario, cepUsuario, endUsuario))
    
    mysql.connection.commit()

    cursor.execute("SELECT idUsuario FROM usuario WHERE nomeUsuario = %s", (nomeUsuario,))
    id_usuario = cursor.fetchone()[0]

    tipo_pessoa = request.form['tipo_pessoa']

    if tipo_pessoa == "fisica":
        cpfPessoa = request.form['cpf']
        
        cursor.execute("SELECT cpfPessoa FROM pessoa WHERE cpfPessoa = %s", (cpfPessoa,))
        user_existe = cursor.fetchone()

        if user_existe:
            cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (id_usuario,))
            mysql.connection.commit()
            return "CPF existente, digite outro!"


        cursor.execute('INSERT INTO pessoa (cpfPessoa, idPessoa) VALUES(%s, %s)', (cpfPessoa, id_usuario))
    
    elif tipo_pessoa == "juridica":
        cnpjEmpresa = request.form['cnpj']

        cursor.execute("SELECT cnpjEmpresa FROM empresa WHERE cnpjEmpresa = %s", (cnpjEmpresa,))
        user_existe = cursor.fetchone()

        if user_existe:
            cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (id_usuario,))
            mysql.connection.commit()
            return "CNPJ existente, digite outro!"
        
        cursor.execute('INSERT INTO empresa (cnpjEmpresa, idEmpresa) VALUES(%s, %s)', (cnpjEmpresa, id_usuario))

    mysql.connection.commit()

    cursor.close()
    return render_template('login.html')

if __name__ == '__main__':
    app.run()

