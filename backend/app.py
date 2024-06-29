from flask import Flask, render_template, request, jsonify, session
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import mysql.connector

app = Flask (__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'projetointegrador'
app.config['CORS_HEADERS'] = 'Content-Type'

mysql = MySQL(app)
bcrypt = Bcrypt(app)


cors = CORS(app, supports_credentials=True, origins='http://localhost:5173')

'''def options():
   response = app.response_class()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.status_code = 200
    return response'''


@app.route('/register', methods = ['POST', 'OPTIONS'])	  
def cadastro():
    try:
        if request.method == 'OPTIONS':
            response = app.response_class()
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.status_code = 200
            return response
    
        data = request.get_json()

        cursor = mysql.connection.cursor()
        
        nomeUsuario = data['name']
        senhaUsuario = bcrypt.generate_password_hash(data['password'])
        telefoneUsuario = data['telephone']
        emailUsuario = data['email']
        tipo_pessoa = data['identity']

        cursor.execute("SELECT emailUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        user_existe = cursor.fetchone()

        if user_existe:
            cursor.close()
            return jsonify({'message': "E-mail existente, digite outro!", 'code': "EMAIL_ALREADY_EXISTS"}), 409
        

        if tipo_pessoa == "fisica":
            cpfPessoa = data['cpf']

            cursor.execute("SELECT cpfUsuario FROM pessoafisica WHERE cpfUsuario = %s", (cpfPessoa,))
            user_existe = cursor.fetchone()

            if user_existe:
                return jsonify({'message': "CPF existente, digite outro!", 'code': 'CPF_ALREADY_EXISTS'}), 409

            cursor.execute('INSERT INTO usuario (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario) VALUES (%s, %s, %s, %s)', (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario))
            mysql.connection.commit()

            cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
            id_usuario = cursor.fetchone()

            cursor.execute("INSERT INTO pessoafisica (cpfUsuario, idUsuario) VALUES(%s, %s)", (cpfPessoa, id_usuario))
        
        elif tipo_pessoa == "juridica":
            cnpjEmpresa = data['cnpj']

            cursor.execute("SELECT cnpjUsuario FROM pessoajuridica WHERE cnpjUsuario = %s", (cnpjEmpresa,))
            user_existe = cursor.fetchone()

            if user_existe:
                return jsonify({'message': "CNPJ existente, digite outro!", 'code': 'CNPJ_ALREADY_EXISTS'}), 409
            
            cursor.execute('INSERT INTO usuario (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario) VALUES (%s, %s, %s, %s)', (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario))
            mysql.connection.commit()

            cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
            id_usuario = cursor.fetchone()
            
            cursor.execute("INSERT INTO pessoajuridica (cnpjUsuario, idUsuario) VALUES(%s, %s)", (cnpjEmpresa, id_usuario))

        mysql.connection.commit()

        cursor.close()

        return jsonify({'message': 'Registrado com sucesso'}), 200
    
    except Exception as e:
        print("Error:", e) 
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    try:
        if request.method == 'OPTIONS':
            response = app.response_class()
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.status_code = 200
            return response
        
        data = request.get_json()
        cursor = mysql.connection.cursor()
        
        emailUsuario = data['email']
        senhaUsuario = data['password']
        
        cursor.execute("SELECT emailUsuario,senhaUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        user = cursor.fetchone()
        
        if user:
            if bcrypt.check_password_hash(user[1], senhaUsuario):
                cursor.close()
                session['logged_in'] = True
                session['username'] = emailUsuario
                return jsonify({'messagem':'Usuário logado com sucesso.', 'session':'True'}), 200
            else:
                return jsonify({'error':'Dados inválidos.'}), 401
            
        else:
            return jsonify({'error':'Usuário não cadastrado.'}), 401
        
    except Exception as e:
        print("Error:", e)
        return jsonify({'error':'Internal Server Error'}), 500



if __name__ == '__main__':
    app.run()

