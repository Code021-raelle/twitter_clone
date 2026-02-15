from fastapi import WebSocket, WebSocketDisconnect, Depends
from jose import JWTError, jwt
from app.websockets.manager import ConnectionManager
from app.utils.auth import create_access_token

manager = ConnectionManager()

async def get_user_id(token: str):
    try:
        payload = jwt.decode(token, create_access_token, algorithms=["HS256"])
        return payload.get("user_id")
    except JWTError:
        return None
    
async def notifications_socket(websocket: WebSocket):
    token = websocket.query_params.get("token")
    user_id = await get_user_id(token)

    if not user_id:
        await websocket.close()
        return

    await manager.connect(user_id, websocket)

    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(user_id)
