import conexao from "../config/conexao.js";
const ApresentacaoSchema = new conexao.Schema({
  equipe: {type: String, required: true},
  modalidade: {type: String, required: true},
  duracao: {type: Number, required: true},
  resumo: {type: String, required: true},
  participantes: {type: Number, required: true}
});

const Apresentacao = conexao.model("Apresentacao", ApresentacaoSchema);
export default Apresentacao;