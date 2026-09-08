# QuizzCulture

Jeu de culture générale multijoueur, pensé pour le mobile (web app), en français.

## Principe

- On choisit le nombre de joueurs (1 à 8), avec un nom et un niveau de départ pour chacun (1 à 30).
- Le jeu tourne : chaque joueur reçoit une question de son niveau à tour de rôle, avec 3 propositions de réponse et une explication après réponse.
- Au bout de 10 bonnes réponses consécutives, le joueur monte d'un niveau (jusqu'au niveau 30).
- Il y a 30 niveaux, du niveau 1 (dès 3 ans) au niveau 30 (experts de culture générale), chacun avec sa propre banque de questions.
- La partie peut être arrêtée à tout moment ; un classement final s'affiche alors.

## Stack technique

- React + TypeScript + Vite
- Tailwind CSS v4 (mobile-first)
- État persisté en `localStorage` (la partie reprend si l'onglet est fermé par erreur)

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production
npm run lint     # oxlint
```

## Banque de questions

Les questions sont réparties par niveau dans `src/data/levels1-10.ts`, `levels11-20.ts` et `levels21-30.ts`
(agrégées par `src/data/index.ts`). Chaque niveau contient actuellement 15 questions ; le format
(`src/data/builder.ts`, type `Row`) permet d'en ajouter facilement pour se rapprocher des 100 questions par niveau visées à terme.
