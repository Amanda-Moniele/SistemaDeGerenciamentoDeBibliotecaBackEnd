const bcrypt = require("bcryptjs")
const supabase = require("../db.js")

async function cadastrarUsuario(req, res) {
    try {

        const { email, nome, senha } = req.body;

        if (!email || !nome || !senha) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
        }

        // email no formato padrão
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // não pode caracteres especiais e pode conter espaços
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

        // mínimo de 8 caracteres, pelo menos 1 letra maiúscula, pelo menos 1 letra minúscula, pelo menos 1 caractere especial
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

       if (!nomeRegex.test(nome)) {
            return res.status(400).json({mensagem: "O nome não pode conter caracteres especiais"})
       }

       if (!emailRegex.test(email)) {
            return res.status(400).json({mensagem: "O email não está no formato válido"})
       }

       if (!senhaRegex.test(senha)) {
            return res.status(400).json({mensagem: "O email não está no formato válido"})
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