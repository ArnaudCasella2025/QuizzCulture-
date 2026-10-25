import { buildLevel } from './builder'
import { level1Questions, level2Questions, level3Questions, level4Questions, level5Questions } from './tier01-05'
import { level6Questions, level7Questions, level8Questions, level9Questions, level10Questions } from './tier06-10'

export const levels1to10 = [
  buildLevel(1, 'Tout-petits', 'De 3 à 4 ans : premières découvertes toutes simples.', level1Questions),
  buildLevel(2, 'Petits curieux', 'De 3 à 4 ans : couleurs, animaux et formes.', level2Questions),
  buildLevel(3, 'Apprentis malins', 'De 3 à 4 ans : culture générale toute simple.', level3Questions),
  buildLevel(4, 'Explorateurs en herbe', 'Avant le CP : premières notions de culture générale.', level4Questions),
  buildLevel(5, 'Petits génies', 'Avant le CP : culture générale variée.', level5Questions),
  buildLevel(6, 'Aventuriers du monde', 'Avant le CP : dernière ligne droite avant l\'école.', level6Questions),
  buildLevel(7, 'Écoliers curieux', 'Environ 7 ans : culture générale pour le CP.', level7Questions),
  buildLevel(8, 'Champions du CE1-CE2', 'Niveau CE1-CE2 : culture générale progressive.', level8Questions),
  buildLevel(9, 'Futurs collégiens', 'Pré-collège : culture générale plus complète.', level9Questions),
  buildLevel(10, 'Cracks du CM2', 'Pré-collège : dernière ligne droite avant le collège.', level10Questions),
]
