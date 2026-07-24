# CPlugins — Intégration Worker terminée

Pas besoin de nouvelle table Supabase : votre Worker utilise déjà une table
générique `kv_store` (collection / id / data) pour tout (`cw_team`, `helfos`,
`cw_campaigns`...). J'ai simplement ajouté une nouvelle collection `cplugins`
en suivant exactement le même schéma que `helfos`.

## Ce qui a été ajouté dans `worker.js`

1. **`GET /api/plugins`** (public, section publique du fichier) — retourne
   les plugins non masqués, triés par `order`. Utilisé par `cplugins.html`.
2. **`GET /api/admin/plugins`** (admin) — tous les plugins, y compris masqués.
3. **`PUT /api/admin/plugins`** (admin) — crée ou met à jour un plugin
   (upsert par `id`), log l'action comme pour Helfos/Campagnes.
4. **`DELETE /api/admin/plugins`** (admin) — supprime un plugin par `id`.
5. `plugins` ajouté aux statistiques (`GET /api/admin/stats`).

Aucune autre fonction n'a été modifiée. Le format des données envoyées par
`admin.html` (`id, icon, order, name, version, mc, desc, tags, directLink,
docsLink, hidden`) est stocké tel quel dans `data` — exactement comme les
autres collections, donc aucune conversion de nom de champ n'est nécessaire.

## Déploiement

1. Remplacez votre `worker.js` actuel par celui-ci (ou reportez juste les
   3 blocs marqués `CPlugins` / `plugins` si vous avez fait d'autres
   modifications entre-temps).
2. `wrangler deploy` (ou votre commande habituelle).
3. Aucune variable d'environnement supplémentaire n'est nécessaire — les
   mêmes `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` déjà utilisés pour Helfos
   et l'équipe fonctionnent directement.
4. Allez dans `admin.html` → **⛏️ CPlugins** → ajoutez vos plugins. Ils
   remplaceront automatiquement les exemples affichés sur `cplugins.html`.
