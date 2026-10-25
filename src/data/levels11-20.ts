import { buildLevel } from './builder'
import { level11Questions, level12Questions, level13Questions, level14Questions, level15Questions } from './tier11-15'
import { level16Questions, level17Questions, level18Questions, level19Questions, level20Questions } from './tier16-20'

export const levels11to20 = [
  buildLevel(11, 'Collégiens 6e-5e', 'Niveau 6e-5e : culture générale de collège.', level11Questions),
  buildLevel(12, 'Collégiens 4e-3e', 'Niveau 4e-3e : culture générale plus exigeante.', level12Questions),
  buildLevel(13, 'Lycéens', 'Niveau lycée : culture générale approfondie.', level13Questions),
  buildLevel(14, 'Candidats au bac', 'Niveau baccalauréat : culture générale exigeante.', level14Questions),
  buildLevel(15, 'Esprits éclairés', 'Adultes : culture générale variée.', level15Questions),
  buildLevel(16, 'Fins connaisseurs', 'Adultes : culture générale plus pointue.', level16Questions),
  buildLevel(17, 'Érudits', 'Adultes : culture générale exigeante.', level17Questions),
  buildLevel(18, 'Grands experts', 'Adultes : culture générale de haut niveau.', level18Questions),
  buildLevel(19, 'Maîtres du savoir', 'Adultes : culture générale très exigeante.', level19Questions),
  buildLevel(20, 'Génies absolus', 'Adultes : le sommet de la culture générale.', level20Questions),
]
