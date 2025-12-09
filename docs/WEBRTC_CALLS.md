# Sistema de Llamadas WebRTC

## Descripción General

Sistema completo de videollamadas en tiempo real utilizando WebRTC y Socket.IO para señalización.

## Componentes

### Backend

1. **CallRoomController** (`src/communication/infrastructure/controllers/call-room.controller.ts`)
   - Gestiona salas de llamada (crear, obtener, unirse, salir)
   - Actualiza estado de participantes (mute/video)
   - Auto-cierra salas vacías

2. **WebRTCSignalingServer** (`src/communication/infrastructure/services/webrtc-signaling.service.ts`)
   - Servidor Socket.IO para señalización WebRTC
   - Maneja eventos: join-room, offer, answer, ice-candidate, toggle-audio, toggle-video
   - Autenticación JWT en conexión WebSocket

3. **Base de datos** (Prisma schema)
   - Tabla `salas_llamada`: ID, teamId, fechas
   - Tabla `participantes_llamada`: ID sala, userId, estado mute/video

### Frontend

1. **useWebRTCSocket Hook** (`src/features/dashboard/modules/teams/hooks/useWebRTCSocket.ts`)
   - Hook personalizado para conexión Socket.IO
   - Emisores: sendOffer, sendAnswer, sendIceCandidate, toggleAudio, toggleVideo
   - Manejadores: onUserJoined, onUserLeft, onOffer, onAnswer, onIceCandidate

2. **CallRoom Component** (`src/features/dashboard/modules/teams/components/call/CallRoom.tsx`)
   - Interfaz completa de llamada
   - Grid de videos responsivo (1-9+ participantes)
   - Controles: mute/unmute, video on/off, colgar
   - Gestión de RTCPeerConnection para cada participante

3. **ChatTab Integration** (`src/features/dashboard/modules/teams/components/chat/ChatTab.tsx`)
   - Botón de teléfono en header
   - Banner de llamada activa
   - Integración con CallRoom

## Flujo de Funcionamiento

### 1. Crear Llamada
```
Usuario → Click botón teléfono → POST /api/calls/rooms
                                ↓
                         Sala creada en DB
                                ↓
                      Banner "Llamada en curso"
```

### 2. Unirse a Llamada
```
Usuario → Click "Entrar a la llamada" → Se abre CallRoom
                                        ↓
                                getUserMedia (cámara/mic)
                                        ↓
                                Socket.IO connect
                                        ↓
                                join-room event
                                        ↓
                            Crear RTCPeerConnection
```

### 3. Señalización WebRTC
```
Peer A                 Socket.IO Server              Peer B
  |                           |                         |
  |------ offer ------------->|                         |
  |                           |------- offer ---------> |
  |                           |                         |
  |                           | <------ answer -------- |
  | <----- answer ------------|                         |
  |                           |                         |
  |-- ice-candidate --------> |                         |
  |                           |-- ice-candidate ------> |
  |                           |                         |
  | <=================== Conexión P2P =================>|
```

### 4. Transmisión de Medios
```
Peer A                                              Peer B
  |                                                    |
  |---- Video/Audio stream (RTCPeerConnection) -----> |
  | <--- Video/Audio stream (RTCPeerConnection) ----- |
```

### 5. Controles en Tiempo Real
```
Usuario mute → toggleAudio() → Socket.IO → Servidor → Otros peers
                    ↓
            audioTrack.enabled = false
```

## APIs Disponibles

### REST Endpoints

- `POST /api/calls/rooms` - Crear sala de llamada
- `GET /api/calls/rooms/team/:teamId` - Obtener sala activa del equipo
- `POST /api/calls/rooms/:roomId/join` - Unirse a sala
- `POST /api/calls/rooms/:roomId/leave` - Salir de sala
- `PATCH /api/calls/rooms/:roomId/state` - Actualizar estado (mute/video)

### Socket.IO Events

**Cliente → Servidor:**
- `join-room` - Unirse a sala
- `offer` - Enviar oferta WebRTC
- `answer` - Enviar respuesta WebRTC
- `ice-candidate` - Enviar candidato ICE
- `toggle-audio` - Cambiar estado de audio
- `toggle-video` - Cambiar estado de video
- `leave-room` - Salir de sala

**Servidor → Cliente:**
- `user-joined` - Usuario se unió
- `user-left` - Usuario salió
- `offer` - Recibir oferta
- `answer` - Recibir respuesta
- `ice-candidate` - Recibir candidato ICE
- `room-participants` - Lista de participantes

## Características

✅ Video y audio en tiempo real
✅ Múltiples participantes
✅ Mute/unmute audio
✅ Activar/desactivar video
✅ Grid responsivo (1-9+ videos)
✅ Indicadores de estado (muted, sin video)
✅ Auto-cierre de salas vacías
✅ Persistencia en base de datos
✅ Autenticación JWT en WebSocket
✅ STUN servers públicos de Google

## Tecnologías

- **WebRTC**: Comunicación peer-to-peer
- **Socket.IO**: Señalización en tiempo real
- **RTCPeerConnection**: Conexiones entre peers
- **getUserMedia**: Acceso a cámara/micrófono
- **Prisma**: ORM para gestión de salas
- **React**: Interfaz de usuario
- **TypeScript**: Tipado estático

## Próximas Mejoras

- [ ] Compartir pantalla
- [ ] Grabación de llamadas
- [ ] Chat durante llamada
- [ ] Efectos de video (blur background)
- [ ] TURN server para NAT traversal
- [ ] Calidad adaptativa según ancho de banda
- [ ] Notificaciones push para llamadas entrantes
- [ ] Historial de llamadas
