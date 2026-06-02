# OctoFit Tracker API - cURL Commands Reference

This guide demonstrates how to test the OctoFit Tracker API endpoints using cURL.

## Environment Setup

For **localhost** development:
```bash
API_URL="http://localhost:8000"
```

For **GitHub Codespaces**:
```bash
API_URL="https://$CODESPACE_NAME-8000.app.github.dev"
```

## Health Check

```bash
curl $API_URL/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-06-02T10:00:00.000Z"
}
```

## Root Endpoint

```bash
curl $API_URL/
```

Expected response:
```json
{
  "message": "OctoFit Tracker API",
  "apiUrl": "http://localhost:8000",
  "environment": "localhost"
}
```

## Users Endpoints

### Get all users
```bash
curl $API_URL/api/users
```

### Get a specific user
```bash
curl $API_URL/api/users/{userId}
```

### Create a new user
```bash
curl -X POST $API_URL/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Update a user
```bash
curl -X PUT $API_URL/api/users/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated"
  }'
```

### Delete a user
```bash
curl -X DELETE $API_URL/api/users/{userId}
```

## Activities Endpoints

### Get all activities
```bash
curl $API_URL/api/activities
```

### Get a specific activity
```bash
curl $API_URL/api/activities/{activityId}
```

### Create a new activity
```bash
curl -X POST $API_URL/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{userId}",
    "type": "Running",
    "duration": 45,
    "distance": 8.5,
    "calories": 650
  }'
```

### Update an activity
```bash
curl -X PUT $API_URL/api/activities/{activityId} \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 60
  }'
```

### Delete an activity
```bash
curl -X DELETE $API_URL/api/activities/{activityId}
```

## Teams Endpoints

### Get all teams
```bash
curl $API_URL/api/teams
```

### Get a specific team
```bash
curl $API_URL/api/teams/{teamId}
```

### Create a new team
```bash
curl -X POST $API_URL/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Fitness Team",
    "description": "A team of fitness enthusiasts"
  }'
```

## Workouts Endpoints

### Get all workouts
```bash
curl $API_URL/api/workouts
```

### Get a specific workout
```bash
curl $API_URL/api/workouts/{workoutId}
```

## Leaderboard Endpoints

### Get weekly leaderboard
```bash
curl $API_URL/api/leaderboard
```

### Get leaderboard by time range
```bash
curl $API_URL/api/leaderboard/daily
curl $API_URL/api/leaderboard/weekly
curl $API_URL/api/leaderboard/monthly
```

## Notes

- All POST and PUT requests require `Content-Type: application/json` header
- The API uses MongoDB ObjectIds for resource IDs
- CORS is configured to allow requests from the frontend (port 5173)
- For Codespaces, the frontend can reach the API at the configured URL
- All responses include appropriate HTTP status codes
