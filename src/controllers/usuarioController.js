const bcrypt = require("bcryptjs")
const supabase = require("../db.js")

async function cadastrarUsuario(req, res) {
    try {

        const { email, nome, senha } = req.body;

        if (!email || !nome || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
        }

        const passwordHash = await bcrypt.hash(String(senha), 10)

        const { data, error } = await supabase
            .from("usuarios")
            .insert({
                nome: nome,
                email: email,
                password_hash: passwordHash
            })
            .select()
            .single();

        if (error) {
            return res.status(400).json({
                mensagem: "Erro ao cadastrar usuário",
                erro: error.message
            });
        }

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            usuario: {
                id: data.id,
                nome: data.nome,
                email: data.email
            }
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ 
        mensagem: "Erro interno do servidor",
        erro_real: error.message
    });
    }
}

module.exports = {
    cadastrarUsuario
}