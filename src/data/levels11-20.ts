import { buildLevel } from './builder'
import { level11Questions, level12Questions, level13Questions, level14Questions, level15Questions } from './tier11-15'
import { level16Questions, level17Questions, level18Questions, level19Questions, level20Questions } from './tier16-20'

export const levels11to20 = [
  buildLevel(11, 'Collégiens affûtés', 'Dès 13 ans : histoire, sciences et philosophie de base.', level11Questions),
  buildLevel(12, 'Esprits curieux', 'Culture générale collège : arts, sciences, histoire.', level12Questions),
  buildLevel(13, 'Voyageurs du temps', 'Moyen Âge et Renaissance.', level13Questions),
  buildLevel(14, 'Experts du globe', 'Géographie économique et mondiale.', level14Questions),
  buildLevel(15, 'Amateurs d\'art', 'Littérature et arts classiques.', level15Questions),
  buildLevel(16, 'Lycéens avertis', 'Philosophie, histoire du XXe siècle.', level16Questions),
  buildLevel(17, 'Têtes chercheuses', 'Sciences physiques et chimie avancées.', level17Questions),
  buildLevel(18, 'Lettrés et économistes', 'Littérature, économie et institutions.', level18Questions),
  buildLevel(19, 'Historiens du monde', 'Histoire contemporaine et géopolitique.', level19Questions),
  buildLevel(20, 'Bacheliers de la culture', 'Culture générale niveau baccalauréat.', level20Questions),
]
