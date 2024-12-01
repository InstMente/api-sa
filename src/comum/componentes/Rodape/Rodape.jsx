import { useNavigate } from 'react-router-dom';
import BotaoCustomizado from '../BotaoCustomizado/BotaoCustomizado';
import './Rodape.css';
import { ImGithub } from 'react-icons/im';

function Rodape() {
  const anoAtual = new Date().getFullYear();
  const navigate = useNavigate()

  return (
    <footer className="rodape_root">
      <h6>
        Copyright © {anoAtual} - Todos os direitos
        reservados.
      </h6>
      <BotaoCustomizado aoClicar={() => navigate("/settings-user")}></BotaoCustomizado>
    </footer>
  );
}

export default Rodape;
