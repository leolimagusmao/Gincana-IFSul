import conexao from "../config/conexao.js";
const CurtaSchema = new conexao.Schema({
equipe: {type: String, required: true},
titulo: {type: String, required: true},
genero: {type: String, required: true},
sinopse: {type: String, required: true},
duracao: {type: Number, required: true},
poster: {type: Buffer,
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }, required: false},
link: {type: String, required: true}});

const Curta = conexao.model("Curta", CurtaSchema);
export default Curta;