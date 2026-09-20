import { buildLevel } from './builder'
import { level21Questions, level22Questions, level23Questions, level24Questions, level25Questions } from './tier21-25'
import { level26Questions, level27Questions, level28Questions, level29Questions, level30Questions } from './tier26-30'

export const levels21to30 = [
  buildLevel(21, 'Érudits confirmés', 'Culture générale avancée : histoire, sciences, arts.', level21Questions),
  buildLevel(22, 'Grands lettrés', 'Philosophie, économie et histoire mondiale.', level22Questions),
  buildLevel(23, 'Maîtres du savoir', 'Histoire, sciences et pensée politique.', level23Questions),
  buildLevel(24, 'Références vivantes', 'Sciences avancées et géopolitique.', level24Questions),
  buildLevel(25, 'Sommités', 'Philosophie, physique et économie de pointe.', level25Questions),
  buildLevel(26, 'Encyclopédistes', 'Histoire religieuse, mathématiques et philosophie.', level26Questions),
  buildLevel(27, 'Virtuoses du savoir', 'Histoire diplomatique et pensée moderne.', level27Questions),
  buildLevel(28, 'Archivistes du monde', 'Histoire militaire, économie et sciences.', level28Questions),
  buildLevel(29, 'Grands maîtres', 'Antiquité, philosophie et théorie économique.', level29Questions),
  buildLevel(30, 'Experts absolus', 'Le niveau ultime de la culture générale.', level30Questions),
]
