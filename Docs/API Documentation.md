# API Documentation

## Endpoints

### Combo Builder Endpoints
- These endpoints related to the combo builder portion of the application.
- All endpoints are prefixed with `/api/combo-builder`

| Name | Route | Supported Request Types | Query Params | Request Body | Response Body |
|------|-------|-------------------------|--------------|-----------------------|------------------------|
| Characters by Game | `/characters/by-game` | `GET` | `none` | `{ game: <Game> }` | `{ characters: <Character[]> }` |
| Combos by Move ID | `/combos/by-move-id` | `GET` | `moveId: string` | `{ game: <Game> }` | `{ combos: <Combo[]> }` |
| Combo Usage | `/combos/usage` | `GET` | `comboId: string` | `{ game: <Game> }` | `{ combos: <ComboUsage> }` |
| Combo Usage | `/moves/[characterId]` | `GET` | `N/A` | `{ game: <Game> }` | `{ combos: <Move[]> }` |