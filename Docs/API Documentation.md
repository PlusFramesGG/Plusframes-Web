# API Documentation

## Endpoints

### Combo Builder Endpoints
- These endpoints related to the combo builder portion of the application.
- All endpoints are prefixed with `/api/combo-builder`
- Most endpoints will require the `game?=<Game>` query param be affixed to the request URL

| Name | Route | Supported Request Types | Query Params | Request Body | Response Body |
|------|-------|-------------------------|--------------|-----------------------|------------------------|
| Characters by Game | `/characters/all` | `GET` | `game: <Game>` | `{ }` | `{ characters: <Character[]> }` |
| Combos by Move ID | `/combos/by-move/[moveId]` | `GET` | `game: <Game>` | `{ }` | `{ combos: <Combo[]> }` |
| Combo Usage | `/combos/usage/[comboId]` | `GET` | `game: <Game>` | `{ }` | `{ comboUsage: <ComboUsage> }` |
| Combo Usage | `/moves/[characterId]` | `GET` | `game: <Game>` | `{ }` | `{ combos: <Move[]> }` |