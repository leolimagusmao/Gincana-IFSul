import conexao from "../config/conexao.js";
const EntradaSchema = new conexao.Schema({
  equipe: {type: String, required: true},
  mascote: {type: String, required: true},
  duracao: {type: Number, required: true},
  tema: {type: String, required: true},
  musicaParodia: {type: String, required: true}
});

const Entrada = conexao.model("Entrada", EntradaSchema);
export default Entrada;