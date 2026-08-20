# Info Nucléaire Belgique

Prototype documentaire d'un voicebot trilingue et de sa landing page, fondé sur les consignes officielles belges, européennes et internationales.

## Contenu

- landing multi-page : accueil, sources, incidents historiques, architecture ;
- prompt système ElevenLabs ;
- base de connaissances permanente ;
- architecture Supabase / n8n / MLab ;
- migration SQL restrictive par défaut.

## Statut

Le site est un prototype local. L'agent ElevenLabs `agent_5601m0fmedq1eneatyp2m305thfr` a été créé sans numéro attaché et reste explicitement hors production. Aucun workflow n8n ou projet Supabase de production n'est affirmé comme déployé. Une validation humaine métier et des transcripts réels FR/NL/DE sont requis avant publication.

## Commandes

`npm run dev` — développement.  
`npm run build` — build de production.  
`npm test` — build et contrôles de contenu critique.
