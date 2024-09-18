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
            idUsuario = cursor.fetchone()[0]
            
            cursor.execute('INSERT INTO dadosbancarios (idUsuario, cpfTitular, nomeTitular, numeroConta, numeroAgencia, codigoBanco) VALUES (%s, %s, %s, %s, %s, %s)', (idUsuario, None, None, None, None, None))
            mysql.connection.commit()
            
            cursor.execute('INSERT INTO endereco (idUsuario, cep, cidade, bairro, numeroResidencia, estado, rua, complemento) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (idUsuario, None, None, None, None, None, None, None))
            mysql.connection.commit()

            cursor.execute("INSERT INTO pessoafisica (cpfUsuario, idUsuario) VALUES(%s, %s)", (cpfPessoa, idUsuario))
        
        elif tipo_pessoa == "juridica":
            cnpjEmpresa = data['cnpj']

            cursor.execute("SELECT cnpjUsuario FROM pessoajuridica WHERE cnpjUsuario = %s", (cnpjEmpresa,))
            user_existe = cursor.fetchone()

            if user_existe:
                return jsonify({'message': "CNPJ existente, digite outro!", 'code': 'CNPJ_ALREADY_EXISTS'}), 409
            
            cursor.execute('INSERT INTO usuario (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario, enderecoUsuario, cepUsuario) VALUES (%s, %s, %s, %s, %s, %s)', (nomeUsuario, senhaUsuario, telefoneUsuario, emailUsuario, None, None))
            mysql.connection.commit()
            
            cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
            idUsuario = cursor.fetchone()[0]
            
            cursor.execute('INSERT INTO dadosbancarios (idUsuario, cpfTitular, nomeTitular, numeroConta, numeroAgencia, codigoBanco) VALUES (%s, %s, %s, %s, %s, %s)', (idUsuario, None, None, None, None, None))
            mysql.connection.commit()
            
            cursor.execute('INSERT INTO endereco (idUsuario, cep, cidade, bairro, numeroResidencia, estado, rua, complemento) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (idUsuario, None, None, None, None, None, None, None))
            mysql.connection.commit()
            
            cursor.execute("INSERT INTO pessoajuridica (cnpjUsuario, idUsuario) VALUES(%s, %s)", (cnpjEmpresa, idUsuario))

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

        # Verifica se o usuário existe
        cursor.execute("SELECT emailUsuario, senhaUsuario FROM Usuario WHERE emailUsuario = %s", (emailUsuario,))
        user = cursor.fetchone()

        if user:
            # Verifica se a senha está correta
            if bcrypt.check_password_hash(user[1], senhaUsuario):
                session['logged_in'] = True
                session['username'] = emailUsuario

                cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                idUsuario = cursor.fetchone()
                
                if idUsuario:
                    idUsuario = idUsuario[0]

                    # Verifica se é pessoa física ou jurídica
                    cursor.execute("SELECT * FROM pessoafisica WHERE idUsuario = %s", (idUsuario,))
                    pessoa_fisica = cursor.fetchone()

                    cursor.execute("SELECT * FROM pessoajuridica WHERE idUsuario = %s", (idUsuario,))
                    pessoa_juridica = cursor.fetchone()
                        

                    # Atualiza os dados do usuário
                    cursor.execute("SELECT * FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                    updated_user = cursor.fetchone()

                    cursor.execute("SELECT * FROM dadosbancarios WHERE idUsuario = %s", (idUsuario,))
                    updated_dadosBancarios = cursor.fetchone()

                    cursor.execute("SELECT * FROM endereco WHERE idUsuario = %s", (idUsuario,))
                    updated_endereco = cursor.fetchone()

                    # Construção da resposta
                    if pessoa_fisica:
                        documento = {'cpf': pessoa_fisica[1]}
                        tipo_pessoa = "fisica"
                    else:
                        documento = {'cnpj': pessoa_juridica[1]}
                        tipo_pessoa = "juridica"

                    response_data = {
                        'identity': tipo_pessoa,
                        'email': emailUsuario,
                        'name': updated_user[1] if updated_user and updated_user[1] else None,
                        'telephone': updated_user[3] if updated_user and updated_user[3] else None,
                        'accountCPF': updated_dadosBancarios[1] if updated_dadosBancarios else None,
                        'accountHolder': updated_dadosBancarios[2] if updated_dadosBancarios else None,
                        'accountNumber': updated_dadosBancarios[3] if updated_dadosBancarios else None,
                        'agencyNumber': updated_dadosBancarios[4] if updated_dadosBancarios else None,
                        'accountCode': updated_dadosBancarios[5] if updated_dadosBancarios else None,
                        'cep': updated_endereco[1] if updated_endereco else None,
                        'city': updated_endereco[2] if updated_endereco else None,
                        'neighborhood': updated_endereco[3] if updated_endereco else None,
                        'residenceNumber': updated_endereco[4] if updated_endereco else None,
                        'state': updated_endereco[5] if updated_endereco else None,
                        'street': updated_endereco[6] if updated_endereco else None,
                        'adicional': updated_endereco[7] if updated_endereco else None,
                        'cardName': pessoa_fisica[2] if pessoa_fisica and tipo_pessoa == "fisica" else None,
                        'numbercard': pessoa_fisica[3] if pessoa_fisica and tipo_pessoa == "fisica" else None,
                        'cardExpireDate': pessoa_fisica[4] if pessoa_fisica and tipo_pessoa == "fisica" else None,
                        'cvvcard': pessoa_fisica[5] if pessoa_fisica and tipo_pessoa == "fisica" else None
                    }

                    response_data.update(documento)

                    cursor.close()

                    return jsonify({'messagem': 'Usuário logado com sucesso.', 'session': 'True', 'data': response_data}), 200
                else:
                    return jsonify({'error': 'Usuário não encontrado.'}), 404
            else:
                return jsonify({'error': 'Senha incorreta.'}), 401
        else:
            return jsonify({'error': 'Usuário não cadastrado.'}), 401

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500
    

   
@app.route('/update', methods=['POST'])
def update():
    try:
            user_data = request.get_json() 
            emailUsuario = user_data.get('email')

            if not emailUsuario:
                return jsonify({'error': 'Usuário não autenticado'}), 400

            flag = user_data.get('flag')
            cursor = mysql.connection.cursor()
            
            if flag == "0":
                cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                idUsuario = cursor.fetchone()
                ###
                cursor.execute("DELETE FROM usuario WHERE idUsuario = %s", (idUsuario[0],))
                
                mysql.connection.commit()
                
                cursor.close()
                
                return jsonify({'success': 'Conta apagada com sucesso!'}), 200
            
            elif flag == "1":
                nomeUsuario = user_data.get('name')
                telefoneUsuario = user_data.get('telephone')
                cepUsuario = user_data.get('cep') 
                cidade = user_data.get('city')
                bairro = user_data.get('neighborhood')
                numeroResidencia = user_data.get('residenceNumber')
                estado = user_data.get('state') 
                rua = user_data.get('street') 
                complemento = user_data.get('adicional') 
                cpfTitular = user_data.get('accountCPF')
                nomeTitular = user_data.get('accountHolder')
                numeroConta = user_data.get('accountNumber')
                numeroAgencia = user_data.get('agencyNumber')
                codigoBanco = user_data.get('accountCode')
                tipo_pessoa = user_data.get('identity')
        
                
                if tipo_pessoa == 'fisica':
                    cpf = user_data.get('cpf')
                else:
                    cnpj = user_data.get('cnpj')
                
                cursor.execute("SELECT idUsuario FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                idUsuario = cursor.fetchone()[0]
                
                cursor.execute(
                    "UPDATE usuario SET nomeUsuario = %s, telefoneUsuario = %s WHERE emailUsuario = %s",
                    (nomeUsuario, telefoneUsuario, emailUsuario)
                )
                
                cursor.execute(
                    "UPDATE dadosbancarios SET cpfTitular = %s, nomeTitular = %s, numeroConta = %s, numeroAgencia = %s, codigoBanco = %s WHERE idUsuario= %s",
                    (cpfTitular, nomeTitular, numeroConta, numeroAgencia, codigoBanco, idUsuario)
                )
                
                cursor.execute(
                    "UPDATE endereco SET cep = %s, cidade = %s, bairro = %s, numeroResidencia = %s, estado = %s, rua = %s, complemento = %s WHERE idUsuario = %s",
                    (cepUsuario, cidade, bairro, numeroResidencia, estado, rua, complemento, idUsuario)
                )
                mysql.connection.commit()
                
                if tipo_pessoa == "fisica":
                    nomeCartao = user_data.get('cardName')
                    numeroCartao = user_data.get('cardNumber')
                    dataCartao = user_data.get('cardExpireDate')
                    cvvCartao = user_data.get('cardCVV')
                    
                    cursor.execute(
                    "UPDATE pessoafisica SET nomeCartao = %s, numeroCartao = %s, dataCartao = %s, cvvCartao = %s WHERE idUsuario = %s",
                    (nomeCartao, numeroCartao, dataCartao, cvvCartao, idUsuario)
                    )
                    mysql.connection.commit()
                    
                    cursor.execute("SELECT * FROM pessoafisica WHERE idUsuario = %s", (idUsuario,))
                    pessoa_fisica = cursor.fetchone()
                
                cursor.execute("SELECT * FROM usuario WHERE emailUsuario = %s", (emailUsuario,))
                updated_user = cursor.fetchone()
                
                cursor.execute("SELECT * FROM dadosbancarios WHERE idUsuario = %s", (idUsuario,))
                updated_dadosBancarios = cursor.fetchone()
                
                cursor.execute("SELECT * FROM endereco WHERE idUsuario = %s", (idUsuario,))
                updated_endereco = cursor.fetchone()
                
                if tipo_pessoa == 'fisica':
                    documento = {'cpf': cpf}
                else:
                    documento = {'cnpj': cnpj}

                response_data = {
                    'identity': tipo_pessoa,
                    'email': emailUsuario,
                    'name': updated_user[1] if updated_user[1] else None,
                    'telephone': updated_user[3] if updated_user[3] else None,
                    'accountCPF': updated_dadosBancarios[1] if updated_dadosBancarios[1] else None,
                    'accountHolder': updated_dadosBancarios[2] if updated_dadosBancarios[2] else None,
                    'accountNumber': updated_dadosBancarios[3] if updated_dadosBancarios[3] else None,
                    'agencyNumber': updated_dadosBancarios[4] if updated_dadosBancarios[4] else None,
                    'accountCode': updated_dadosBancarios[5] if updated_dadosBancarios[5] else None,
                    'cep': updated_endereco[1] if updated_endereco[1] else None,
                    'city': updated_endereco[2] if updated_endereco[2] else None,
                    'neighborhood': updated_endereco[3] if updated_endereco[3] else None,
                    'residenceNumber': updated_endereco[4] if updated_endereco[4] else None,
                    'state': updated_endereco[5] if updated_endereco[5] else None,
                    'street': updated_endereco[6] if updated_endereco[6] else None,
                    'adicional': updated_endereco[7] if updated_endereco[7] else None,
                    'cardName': pessoa_fisica[2] if tipo_pessoa == "fisica" and pessoa_fisica[2] is not None else None,
                    'numbercard': pessoa_fisica[3] if tipo_pessoa == "fisica" and pessoa_fisica[3] is not None  else None,
                    'cardExpireDate': pessoa_fisica[4] if tipo_pessoa == "fisica" and pessoa_fisica[4] is not None  else None,
                    'cvvcard': pessoa_fisica[5] if tipo_pessoa == "fisica" and pessoa_fisica[5] is not None  else None
                }
            
                response_data.update(documento) #adciona a pessoa fisica ou juridica

                cursor.close()

                return jsonify({'success': 'Dados atualizados com sucesso!', 'data': response_data}), 200
        
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500
    
@app.route('/cadastrarlivro', methods = ['POST', 'OPTIONS'])	  
def cadastrarlivro():
    try:
        if request.method == 'OPTIONS':
            return options()
        
        else:
            data = request.get_json()
            cursor = mysql.connection.cursor()

            cursor.execute("SELECT idUsuario, nomeUsuario FROM usuario WHERE emailUsuario = %s", (data['email'],))
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

@app.route('/editarlivro', methods=['OPTIONS', 'POST'])
def editarlivro():
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
        isbn = data.get('isbn')
        
        if not isbn:
            return jsonify({'error': 'ISBN não fornecido.'}), 400
        
        nomeLivro = data.get('nomeLivro', '')
        nomeAutor = data.get('nomeAutor', '')
        editoraLivro = data.get('editoraLivro', '')
        generoLivro = data.get('generoLivro', '')
        estadoLivro = data.get('estadoLivro', '')
        precoLivro = data.get('precoLivro', 0.0)
        estoqueLivro = data.get('estoqueLivro', 0)
        descricaoLivro = data.get('descricaoLivro', '')
        linkImagem = data.get('linkImagem', '')
        username = data.get('email')
        
        cursor = mysql.connection.cursor()
        
        cursor.execute('SELECT idUsuario FROM usuario WHERE emailUsuario = %s', (username,))
        user = cursor.fetchone()

        print(user)
        
        if user:
            idVendedor = user[0]
            cursor.execute('''UPDATE livros SET nomeLivro = %s, nomeAutor = %s, editoraLivro = %s, generoLivro = %s, estadoLivro = %s, precoLivro = %s,
                            estoqueLivro = %s, descricaoLivro = %s, linkImagem = %s WHERE isbn = %s AND idVendedor = %s''', (nomeLivro, nomeAutor, editoraLivro, generoLivro, estadoLivro, precoLivro, estoqueLivro, descricaoLivro, linkImagem, isbn, idVendedor))

            mysql.connection.commit()
            cursor.close()
            return jsonify({'mensagem': 'Livro atualizado com sucesso'}), 200
            
        else:
            return jsonify({'error': 'Usuário não está logado'}), 401
        
    except Exception as e:
        print("Error", e)
        return jsonify({'error': 'Internal Server Error'}), 500



@app.route('/mostrarlivros', methods = ['GET'])
def mostrarlivros():
    try:
        
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
        
@app.route('/buscarlivro/<int:id>', methods=['GET', 'POST'])
def buscarlivro(id):  # Adicione o parâmetro id aqui
    try:
        # Conectando ao banco de dados
        cursor = mysql.connection.cursor()
        # Use %s ao invés de %i para parâmetros no SQL
        cursor.execute('SELECT * FROM livros WHERE idLivro = %s', (id,))
        rows = cursor.fetchall()

        colunas = [i[0] for i in cursor.description]  # Pegando os nomes das colunas
        livros = [dict(zip(colunas, row)) for row in rows]  # Convertendo para lista de dicionários
        
        cursor.close()
        
        return jsonify({'livros': livros}), 200  # Retorna a lista de livros
        
    except Exception as e:
        print("error", e)
        return jsonify({'error': 'Internal Server Error'}), 500

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
        email = data['email']

        cursor = mysql.connection.cursor()

        # Buscar o ID do usuário a partir do email
        cursor.execute('SELECT idUsuario FROM usuario WHERE emailUsuario = %s', (email,))
        id = cursor.fetchone()[0]

        # Buscar todos os livros do vendedor correspondente ao ID
        cursor.execute('SELECT * FROM livros WHERE idVendedor = %s', (id,))
        rows = cursor.fetchall()

        if rows:
            # Obter os nomes das colunas
            colunas = [i[0] for i in cursor.description]
            # Criar uma lista de dicionários onde cada dicionário representa um livro
            livros = [dict(zip(colunas, row)) for row in rows]
        else:
            livros = []

        cursor.close()

        # Retornar os livros em uma tupla
        return jsonify({'livros': tuple(livros)}), 200

    except Exception as e:
        print("error", e)
        return jsonify({'error': 'Internal Server Error'}), 500
@app.route('/apagarlivro', methods=['POST'])
def apagarlivro():
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
        isbn = data.get('isbn')
        email = data.get('email')
        
        if not isbn:
            return jsonify({'error': 'ISBN não informado.'}), 400
        
        cursor = mysql.connection.cursor()
        
        cursor.execute('SELECT idUsuario FROM usuario WHERE emailUsuario = %s', (email,))
        user = cursor.fetchone()
        
        if user:
            idVendedor = user[0]
            
            cursor.execute('DELETE FROM livros WHERE isbn = %s AND idVendedor = %s', (isbn, idVendedor))
            mysql.connection.commit()
            cursor.close()
            
            return jsonify({'mensagem': 'Livro apagado com sucesso'}), 200
        else:
            return jsonify({'error': 'Usuário não encontrado.'}), 404
            
    except Exception as e:
        print("Error", e)
        return jsonify({'error': 'Internal Server Error'}), 500



#Compra de um livro 
@app.route('/registrarvenda', methods=['POST', 'OPTIONS'])
def registrar_venda():
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
        id_livro = data['idLivro']
        email_comprador = data['emailComprador']
        data_venda = datetime.now()
        horario_venda = data_venda.time()
        id_vendedor = data['idVendedor']
        preco_livro = data['precoLivro']

        cursor = mysql.connection.cursor()
        
        cursor.execute('''
            INSERT INTO vendas (idLivro, emailComprador, dataVenda, horarioVenda, idVendedor, precoLivro)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (id_livro, email_comprador, data_venda, horario_venda, id_vendedor, preco_livro))

        id_venda = cursor.lastrowid
      
        cursor.execute('''
            UPDATE vendas
            SET idVendaCarrinho = %s
            WHERE idVenda = %s
        ''', (id_venda, id_venda))

        mysql.connection.commit()
        cursor.close()
        
        return jsonify({"message": "Venda registrada com sucesso!"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500


#Minhas compras
@app.route('/listarcompras', methods=['POST'])
def listar_compras():
    data = request.get_json()
    email_comprador = data.get('email')

    if not email_comprador:
        return jsonify({'error': 'O email do comprador é obrigatório'}), 400

    try:
        cursor = mysql.connection.cursor()

        cursor.execute('''
            SELECT v.idVendaCarrinho, v.dataVenda, e.rua, e.numeroResidencia, e.cep,
                   db.nomeTitular, db.codigoBanco
            FROM vendas v
            LEFT JOIN usuario u ON v.emailComprador = u.emailUsuario
            LEFT JOIN endereco e ON u.idUsuario = e.idUsuario
            LEFT JOIN dadosbancarios db ON u.idUsuario = db.idUsuario
            WHERE v.emailComprador = %s
            GROUP BY v.idVendaCarrinho, v.dataVenda, e.rua, e.numeroResidencia, e.cep, db.nomeTitular, db.codigoBanco
            ORDER BY v.dataVenda;
        ''', (email_comprador,))

        compras = cursor.fetchall()

        if not compras:
            return jsonify({'message': 'Nenhuma compra encontrada para este email'}), 404

        compras_list = []

        for compra in compras:
            id_venda_carrinho = compra[0]

            cursor.execute('''
                SELECT l.nomeLivro, l.nomeAutor, v.precoLivro, l.linkImagem, COUNT(*) as quantidade
                FROM vendas v
                LEFT JOIN livros l ON v.idLivro = l.idLivro
                WHERE v.idVendaCarrinho = %s
                GROUP BY l.nomeLivro, l.nomeAutor, v.precoLivro, l.linkImagem
                ORDER BY l.nomeLivro;
            ''', (id_venda_carrinho,))

            livros = cursor.fetchall()

            livros_list = [
                {
                    'title': livro[0],
                    'author': livro[1],
                    'price': f'{livro[2]:.2f}',
                    'image': livro[3],
                    'quantidade': livro[4]
                }
                for livro in livros
            ]

            compras_list.append({
                'id': id_venda_carrinho,
                'data': compra[1],
                'total': str(len(livros_list)),
                'rua': compra[2],
                'numero': compra[3],
                'cep': compra[4],
                'numeroCartao': compra[5],
                'nomeCartao': compra[6],
                'livros': livros_list
            })

        cursor.close()

        return jsonify(compras_list), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500


    
@app.route('/listarvendas', methods=['GET', 'POST'])
def listar_vendas():
    data = request.get_json()
    email_vendedor = data.get('email')

    if not email_vendedor:
        return jsonify({'error': 'O ID do vendedor é obrigatório'}), 400

    try:
        cursor = mysql.connection.cursor()

        cursor.execute('''
            SELECT idUsuario FROM usuario WHERE emailUsuario = %s
        ''', (email_vendedor,))

        id_vendedor = cursor.fetchone()
        print(id_vendedor)

        cursor.execute('''
            SELECT v.idVendaCarrinho, v.dataVenda, e.rua, e.numeroResidencia, e.cep,
                   u.nomeUsuario, u.emailUsuario, u.telefoneUsuario
            FROM vendas v
            LEFT JOIN Usuario u ON v.emailComprador = u.emailUsuario
            LEFT JOIN endereco e ON u.idUsuario = e.idUsuario
            WHERE v.idVendedor = %s
            GROUP BY v.idVendaCarrinho, v.dataVenda, e.rua, e.numeroResidencia, e.cep, u.nomeUsuario, u.emailUsuario, u.telefoneUsuario
            ORDER BY v.dataVenda;
        ''', (id_vendedor,))

        vendas = cursor.fetchall()

        if not vendas:
            return jsonify({'message': 'Nenhuma venda encontrada para este vendedor'}), 404

        vendas_list = []

        for venda in vendas:
            id_venda_carrinho = venda[0]
            
            cursor.execute('''
                SELECT l.nomeLivro, l.nomeAutor, v.precoLivro, l.linkImagem, COUNT(*) as quantidade
                FROM vendas v
                LEFT JOIN livros l ON v.idLivro = l.idLivro
                WHERE v.idVendaCarrinho = %s
                GROUP BY l.nomeLivro, l.nomeAutor, v.precoLivro, l.linkImagem
                ORDER BY l.nomeLivro;
            ''', (id_venda_carrinho,))

            livros = cursor.fetchall()

            livros_list = [
                {
                    'title': livro[0],
                    'author': livro[1],
                    'price': f'{livro[2]:.2f}',
                    'image': livro[3],
                    'quantidade': livro[4]
                }
                for livro in livros
            ]

            vendas_list.append({
                'id': id_venda_carrinho,
                'data': venda[1],
                'hora': venda[2],
                'nomeCliente': venda[5],
                'email': venda[6],
                'telefone': venda[7],
                'rua': venda[2],
                'numero': venda[3],
                'cep': venda[4],
                'livros': livros_list
            })

        cursor.close()

        return jsonify({'vendas': vendas_list}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500
    

#Listagem dos livros do carrinho (2 ou mais livros)
@app.route('/carrinho', methods=['POST'])
def registrar_carrinho():
    try:
        data = request.get_json()
        email_comprador = data.get('emailComprador')
        livros = data.get('livros')

        if not email_comprador or not livros:
            return jsonify({'error': 'Dados incompletos'}), 400
        
        if not isinstance(livros, list) or len(livros) == 0:
            return jsonify({'error': 'A lista de livros está vazia'}), 400

        data_venda = data.get('date')
        horario_venda = data.get('time')

        cursor = mysql.connection.cursor()

        try:
            if len(livros) > 0:
                primeiro_livro = livros[0]
                id_livro_primeiro = primeiro_livro.get('idLivro')
                preco_livro_primeiro = primeiro_livro.get('precoLivro')
                id_vendedor = primeiro_livro.get('idVendedor')

                cursor.execute(''' 
                    INSERT INTO vendas (idLivro, emailComprador, dataVenda, horarioVenda, idVendedor, precoLivro) 
                    VALUES (%s, %s, %s, %s, %s, %s)
                ''', (id_livro_primeiro, email_comprador, data_venda, horario_venda, id_vendedor, preco_livro_primeiro))
                
                id_venda = cursor.lastrowid
                id_venda_carrinho = id_venda 

                cursor.execute('''
                    UPDATE vendas 
                    SET idVendaCarrinho = %s 
                    WHERE idVenda = %s
                ''', (id_venda_carrinho, id_venda))

                for livro in livros[1:]:
                    id_livro = livro.get('idLivro')
                    preco_livro = livro.get('precoLivro')
                    if not id_livro or preco_livro is None:
                        continue

                    cursor.execute(''' 
                        INSERT INTO vendas (idLivro, emailComprador, dataVenda, horarioVenda, idVendedor, precoLivro, idVendaCarrinho) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ''', (id_livro, email_comprador, data_venda, horario_venda, id_vendedor, preco_livro, id_venda_carrinho))

            mysql.connection.commit()
            return jsonify({"message": "Carrinho registrado com sucesso!"}), 200

        except Exception as e:
            mysql.connection.rollback()
            print("Error:", e)
            return jsonify({'error': 'Erro ao registrar o carrinho'}), 500

        finally:
            cursor.close()

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500
    
'''@app.route('/pegarlivro', methods=['GET', 'POST'])
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
        return jsonify({'error':'Internal Server Error'}), 500'''

if __name__ == '__main__':
    app.run()