import { buildLevel } from './builder'
import { level1Questions, level2Questions, level3Questions, level4Questions, level5Questions } from './tier01-05'
import { level6Questions, level7Questions, level8Questions, level9Questions, level10Questions } from './tier06-10'

export const levels1to10 = [
  buildLevel(1, 'Petits curieux', 'Pour les tout-petits (dès 3 ans) : culture générale toute simple.', level1Questions),
  buildLevel(2, 'Apprentis malins', 'Dès 4 ans : premières questions de culture générale.', level2Questions),
  buildLevel(3, 'Explorateurs en herbe', 'Dès 5 ans : culture générale variée pour les tout-petits.', level3Questions),
  buildLevel(4, 'Petits génies', 'Dès 6 ans : culture générale variée et progressive.', level4Questions),
  buildLevel(5, 'Aventuriers du monde', 'Dès 7 ans : culture générale variée, niveau primaire.', level5Questions),
  buildLevel(6, 'Savants en herbe', 'Dès 8 ans : culture générale variée, niveau primaire.', level6Questions),
  buildLevel(7, 'Globe-trotters', 'Dès 9 ans : culture générale variée, un peu plus poussée.', level7Questions),
  buildLevel(8, 'Champions en herbe', 'Dès 10 ans : culture générale variée, niveau primaire confirmé.', level8Questions),
  buildLevel(9, 'Citoyens du monde', 'Dès 11 ans : culture générale variée, niveau collège.', level9Questions),
  buildLevel(10, 'Cracks du collège', 'Dès 12 ans : culture générale variée, fin du primaire.', level10Questions),
]
