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
app.config['SECRET_KEY'] = 'chave'

mysql = MySQL(app)
bcrypt = Bcrypt(app)


cors = CORS(app, supports_credentials=True, origins='http://localhost:5173')

def options():
    response = app.response_class()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.status_code = 200
    return response


@app.route('/register', methods = ['POST', 'OPTIONS'])	  
def cadastro():
    try:
        if request.method == 'OPTIONS':
            return options()
    
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

class User:
    def __init__(self, nomeUsuario, telefoneUsuario, emailUsuario, cpf=None, cnpj=None):
        self.nomeUsuario = nomeUsuario
        self.telefoneUsuario = telefoneUsuario
        self.emailUsuario = emailUsuario
        self.cpf = cpf
        self.cnpj = cnpj

    def to_dict(self):
        data = {
            'nomeUsuario': self.nomeUsuario,
            'telefoneUsuario': self.telefoneUsuario,
            'emailUsuario': self.emailUsuario
        }
        if self.cpf:
            data['cpf'] = self.cpf
        if self.cnpj:
            data['cnpj'] = self.cnpj
        return data


@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    try:
        if request.method == 'OPTIONS':
            return options()
        
        data = request.get_json()
        cursor = mysql.connection.cursor()
        
        emailUsuario = data['email']
        senhaUsuario = data['password']
        
        cursor.execute("SELECT emailUsuario,senhaUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        user = cursor.fetchone()

        cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
        idUsuario = cursor.fetchone()
        
        if user:
            if bcrypt.check_password_hash(user[1], senhaUsuario):

                cursor.execute("SELECT nomeUsuario, telefoneUsuario, emailUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                user_data = cursor.fetchone()
                
                cursor.execute("SELECT cpfUsuario FROM pessoafisica WHERE idUsuario = %s", (idUsuario,))
                pessoa_fisica = cursor.fetchone()

                cursor.execute("SELECT cnpjUsuario FROM pessoajuridica WHERE idUsuario = %s", (idUsuario,))
                pessoa_juridica = cursor.fetchone()

                cursor.close()

                if pessoa_fisica:
                    user_object = User(*user_data, pessoa_fisica[0])
                elif pessoa_juridica:
                    user_object = User(*user_data, pessoa_juridica[0])

                
                session['logged_in'] = True
                session['username'] = emailUsuario

                print(session['username'])

                return jsonify({
                    'message': 'Usuário logado com sucesso.',
                    'session': 'True',
                    'user_data': user_object.to_dict(),
                }), 200
            else:
                return jsonify({'error':'Senha incorreta.'}), 401
            
        else:
            return jsonify({'error':'E-mail não cadastrado.'}), 404
        
    except Exception as e:
        print("Error:", e)
        return jsonify({'error':'Internal Server Error'}), 500


@app.route('/cadastrarlivro', methods = ['POST', 'OPTIONS'])	  
def cadastrarlivro():
    try:
        if request.method == 'OPTIONS':
            return options()
        
        else:
            data = request.get_json()
            cursor = mysql.connection.cursor()

            print(data['username'])
            
            cursor.execute("SELECT idUsuario, nomeUsuario FROM usuario WHERE emailUsuario = %s", (data['username'],))
            user = cursor.fetchone()
            
            idVendedor = user[0]
            nomeVendedor = user[1]
            linkImagem = data['linkImg']
            nomeLivro = data['bookName']
            nomeAutor = data['authorName']
            isbn = data['isbn']
            editoraLivro = data['publisher']
            generoLivro = data['genre']
            estadoLivro = data['state']
            precoLivro = float(data['price']) 
            estoqueLivro = int(data['inventory'])
            descricaoLivro = data['description']
            
            ##SE DER ERROR, TROCAR AQUI
            cursor.execute(
                'INSERT INTO livros (nomeVendedor, idVendedor, editoraLivro, linkImagem, precoLivro, descricaoLivro, estadoLivro, estoqueLivro, isbn, generoLivro, nomeLivro, nomeAutor) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', 
                (nomeVendedor, idVendedor, editoraLivro, linkImagem, precoLivro, descricaoLivro, estadoLivro, estoqueLivro, isbn, generoLivro, nomeLivro, nomeAutor)
            )

            
            mysql.connection.commit()
            cursor.close()
            
            return jsonify({'mensagem' : 'Livro cadastrado com sucesso.'}), 200            
            
    
    
    except Exception as e:
        print("Error:", e)
        return jsonify({'error':'Internal Server Error'}), 500
    
@app.route('/mostrarlivros', methods = ['GET'])
def mostrarlivros():
    try:
        if request.method == 'OPTIONS':
            response = app.response_class()
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.status_code = 200
            return response
        
        
        cursor = mysql.connection.cursor()    
        cursor.execute('SELECT * FROM livros')
        rows = cursor.fetchall()
        
        colunas = [i[0] for i in cursor.description]

        livros = [dict(zip(colunas, row)) for row in rows]
                
        cursor.close()
        
        return jsonify({'data' : livros}), 200
        
    except Exception as e:
        print("Error", e)
        return jsonify({'error':'Internal Server Error'}), 500
        
@app.route('/buscarlivro', methods=['GET', 'POST'])
def buscarlivro():
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
        livro = data['id']

        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM livros WHERE  = %s', (livro,))
        data = cursor.fecthall()
        
        cursor.close()
        
        return jsonify({'livros' : data}), 200
        
    except Exception as e:
        print("error", e)
        return jsonify({'error':'Internal Server Error'}), 500

@app.route('/pegarlivro', methods=['GET', 'POST'])
def pegarlivro():
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
        id = data['id']

        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM livros WHERE  = idLivro %s', (id))
        data = cursor.fecthone()
        
        cursor.close()
        
        return jsonify({'livros' : data}), 200
        
    except Exception as e:
        print("error", e)
        return jsonify({'error':'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run()

"""
    nomeVendedor
    idVendedor
    editoraLivro
    fotoLivro
    precoLivro
    descricaoLivro
    estadoLivro
    estoqueLivro
"""