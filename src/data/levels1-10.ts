import { buildLevel } from './builder'
import { level1Questions, level2Questions, level3Questions, level4Questions, level5Questions } from './tier01-05'
import { level6Questions, level7Questions, level8Questions, level9Questions, level10Questions } from './tier06-10'

export const levels1to10 = [
  buildLevel(1, 'Petits curieux', 'Pour les tout-petits (dès 3 ans) : couleurs, animaux, formes.', level1Questions),
  buildLevel(2, 'Apprentis malins', 'Dès 4 ans : animaux, chiffres, fruits et légumes.', level2Questions),
  buildLevel(3, 'Explorateurs en herbe', 'Dès 5 ans : jours de la semaine, corps humain, couleurs.', level3Questions),
  buildLevel(4, 'Petits génies', 'Dès 6 ans : alphabet, saisons, calculs simples.', level4Questions),
  buildLevel(5, 'Aventuriers du monde', 'Dès 7 ans : géographie simple, drapeaux, animaux du monde.', level5Questions),
  buildLevel(6, 'Savants en herbe', 'Dès 8 ans : sciences, histoire et espace.', level6Questions),
  buildLevel(7, 'Globe-trotters', 'Dès 9 ans : géographie de la France et sciences.', level7Questions),
  buildLevel(8, 'Historiens juniors', 'Dès 10 ans : histoire de France et du monde.', level8Questions),
  buildLevel(9, 'Citoyens du monde', 'Dès 11 ans : géographie mondiale et sciences.', level9Questions),
  buildLevel(10, 'Cracks du collège', 'Dès 12 ans : culture générale variée, fin du primaire.', level10Questions),
]
