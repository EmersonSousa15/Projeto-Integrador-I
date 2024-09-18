@app.route('/apagarlivro', methods=['POST, OPTIONS'])
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
        isbn = data['isbn']
        
        if not isbn:
            return jsonify({'error':'ISBN não informado.'}), 500
        
        cursor = mysql.connection.cursor()
        
        cursor.execute('SELECT idUsuario FROM usuario WHERE emailUsuario = %s', (data['email'],))
        user = cursor.fetchone()
        
        if user:
            idVendedor = user[0]
            
            cursor.execute('DELECT FROM livros WHERE isbn = %s AND idVendedor = %s', (isbn, idVendedor))
            mysql.connection.commit()
            cursor.close()
            
            return jsonify({'mensagem' : 'Livro apagado com sucesso'}), 200
            
    except Exception as e:
        print("Error", e)
        return jsonify({'error':'Internal Server Error'}), 500


@app.route('/editarlivro', methods=['POST, OPTIONS'])
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
        
        
        if 'logged_in' in session:
            data = request.get_json()
            isbn = data['isbn']
            
            if not isbn:
                return jsonify({'error':'ISBN não fornecido.'}), 400
            
            nomeLivro = data.get('nomeLivro', '')
            nomeAutor = data.get('nomeAutor', '')
            editoraLivro = data.get('editoraLivro', '')
            generoLivro = data.get('generoLivro', '')
            estadoLivro = data.get('estadoLivro', '')
            precoLivro = data.get('precoLivro', 0.0)
            estoqueLivro = data.get('estoqueLivro', 0)
            descricaoLivro = data.get('descricaoLivro', '')
            linkImagem = data.get('linkImagem', '')
            
            cursor = mysql.connection.cursor()
            
            cursor.execute('SELECT idUsario FROM usuario WHERE emailUsuario = %s', (data['username'],))
            user = cursor.fetchone()
            
            
            ##SE DER ERROR, TROCAR AQUI
            if user:
                idVendedor = user[0]
                cursor.execute('''UPDATE livros SET nomeLivro = %s, nomeAutor = %s, editoraLivro = %s, generoLivro = %s, estadoLivro = %s, precoLivro = %s,
                               estoqueLivro = %s, descricaoLivro = %s, descricaoLivro = %s, linkImagem = %s WHERE isbn = %s AND idVendedor = %s''', (nomeLivro, nomeAutor, editoraLivro, generoLivro, estadoLivro, precoLivro, estoqueLivro, descricaoLivro, linkImagem, isbn, idVendedor))

                mysql.connection.commit()
                cursor.close()
                return jsonify({'mensagem' : 'Livro atualizado com sucesso'}), 200            
            else:
                return jsonify({'error' : 'Usuário não encontrado.'}), 401
        else:
            return jsonify({'error' : 'Usuário não está logado'}), 401
        
    except Exception as e:
        print("Error", e)
        return jsonify({'error':'Internal Server Error'}), 500