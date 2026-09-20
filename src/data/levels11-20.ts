import { buildLevel } from './builder'
import { level11Questions, level12Questions, level13Questions, level14Questions, level15Questions } from './tier11-15'
import { level16Questions, level17Questions, level18Questions, level19Questions, level20Questions } from './tier16-20'

export const levels11to20 = [
  buildLevel(11, 'Collégiens affûtés', 'Dès 13 ans : culture générale variée, niveau collège.', level11Questions),
  buildLevel(12, 'Esprits curieux', 'Culture générale variée pour esprits curieux.', level12Questions),
  buildLevel(13, 'Fins limiers', 'Culture générale variée, niveau collège confirmé.', level13Questions),
  buildLevel(14, 'Puits de science', 'Culture générale variée et un peu plus exigeante.', level14Questions),
  buildLevel(15, 'Fins connaisseurs', 'Culture générale variée, niveau lycée.', level15Questions),
  buildLevel(16, 'Lycéens avertis', 'Culture générale variée pour lycéens avertis.', level16Questions),
  buildLevel(17, 'Têtes chercheuses', 'Culture générale variée et exigeante, niveau lycée.', level17Questions),
  buildLevel(18, 'Esprits brillants', 'Culture générale variée, niveau lycée confirmé.', level18Questions),
  buildLevel(19, 'Grands curieux', 'Culture générale variée et approfondie.', level19Questions),
  buildLevel(20, 'Bacheliers de la culture', 'Culture générale variée, niveau baccalauréat.', level20Questions),
]
