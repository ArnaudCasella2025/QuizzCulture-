import { buildLevel } from './builder'
import { level21Questions, level22Questions, level23Questions, level24Questions, level25Questions } from './tier21-25'
import { level26Questions, level27Questions, level28Questions, level29Questions, level30Questions } from './tier26-30'

export const levels21to30 = [
  buildLevel(21, 'Érudits confirmés', 'Culture générale avancée et variée.', level21Questions),
  buildLevel(22, 'Grands savants', 'Culture générale avancée et variée.', level22Questions),
  buildLevel(23, 'Maîtres du savoir', 'Culture générale avancée, pour esprits affûtés.', level23Questions),
  buildLevel(24, 'Références vivantes', 'Culture générale avancée et exigeante.', level24Questions),
  buildLevel(25, 'Sommités', 'Culture générale avancée, niveau expert.', level25Questions),
  buildLevel(26, 'Encyclopédistes', 'Culture générale très avancée et variée.', level26Questions),
  buildLevel(27, 'Virtuoses du savoir', 'Culture générale très avancée et exigeante.', level27Questions),
  buildLevel(28, 'Gardiens du savoir', 'Culture générale très avancée, tous domaines confondus.', level28Questions),
  buildLevel(29, 'Grands maîtres', 'Culture générale au sommet, niveau expert confirmé.', level29Questions),
  buildLevel(30, 'Experts absolus', 'Le niveau ultime de la culture générale, toutes thématiques confondues.', level30Questions),
]
