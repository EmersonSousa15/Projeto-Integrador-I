from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import mysql.connector

app = Flask (__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'projetointegrador'
app.config['CORS_HEADERS'] = 'Content-Type'

mysql = MySQL(app)
cors = CORS(app, supports_credentials=True, origins='http://localhost:5173')
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
        senhaUsuario = data['password']
        telefoneUsuario = data['telephone']
        emailUsuario = data['email']
        #cepUsuario = ''
        #endUsuario = ''

        cursor.execute("SELECT emailUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        user_existe = cursor.fetchone()

        if user_existe:
            cursor.close()
            return jsonify({'message': "That email already exists. Please choose another one"}), 409
        
        cursor.execute('INSERT INTO usuario (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario) VALUES (%s, %s, %s, %s)', (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario))
        mysql.connection.commit()

        cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        id_usuario = cursor.fetchone()

        tipo_pessoa = data['type_person']

        if tipo_pessoa == "fisica":
            cpfPessoa = data['cpf']
            
            cursor.execute("SELECT cpfUsuario FROM pessoafisica WHERE cpfUsuario = %s", (cpfPessoa,))
            user_existe = cursor.fetchone()

            if user_existe:
                #cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (id_usuario,)) Essa linha vai apagar o registro da pessoa fisica
                #mysql.connection.commit()
                return jsonify({'message': "CPF existente, digite outro!"}), 409


            cursor.execute("INSERT INTO pessoafisica (cpfUsuario, idUsuario) VALUES(%s, %s)", (cpfPessoa, id_usuario))
        
        elif tipo_pessoa == "juridica":
            cnpjEmpresa = data['cnpj']

            cursor.execute("SELECT cnpjUsuario FROM pessoajuridica WHERE cnpjUsuario = %s", (cnpjEmpresa,))
            user_existe = cursor.fetchone()

            if user_existe:
                #cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (id_usuario,))  Essa linha vai apagar o registro da pessoa juridica
                #mysql.connection.commit()
                return jsonify({'message': "CNPJ existente, digite outro!"}), 409
            
            cursor.execute("INSERT INTO pessoajuridica (cnpjUsuario, idUsuario) VALUES(%s, %s)", (cnpjEmpresa, id_usuario))

        mysql.connection.commit()

        cursor.close()

        return jsonify({'message': 'Registration successful'}), 200
    
    except Exception as e:
        print("Error:", e)  # Adicione esta linha para registrar a exceção
        return jsonify({'error': 'Internal Server Error'}), 500


if __name__ == '__main__':
    app.run()

