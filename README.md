# Chat Application

A real-time chat application built with React, TypeScript, and Vite.

## Features

- 💬 One-on-one messaging
- 🔐 User authentication (Sign In/Sign Up/Logout)
- 🟢 Online/offline status indicators
- 🔍 Message search with highlighting
- ⏰ Timestamps with relative time
- 🔒 Protected routes
- 📱 Responsive design

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React (icons)
- JSON Server (mock backend)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Install JSON Server globally
```bash
npm install -g json-server
```

### Running the App

1. Start the backend (JSON Server)
```bash
json-server --watch db.json --port 3001
```

2. Start the frontend (in a new terminal)
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser

## API Endpoints

- `GET /chats` - Fetch all messages
- `POST /chats` - Create a message
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch specific user

## Data Structure

### Message
```typescript
{
  id: string;
  message: string;
  userId: string;
  receiverId: string;
  createdAt: string; // ISO 8601
}
```

### User
```typescript
{
  id: string;
  name: string;
  image?: string;
  isOnline: boolean;
}
```

## Key Architecture Decisions

### Context API for State Management
All components share message state through `MessageProvider`. This ensures that when a message is created in one component, it immediately appears in all other components displaying that conversation.

### Custom Hooks
- `use-auth.ts` - Authentication logic
- `use-chat.ts` - Chat operations
- `use-message.ts` - Message CRUD
- `use-status.ts` - User status
- `use-users.ts` - User management

### Component Structure
- **Pages** - Route-level components (Chat, Home, Profile, SignIn, SignUp)
- **Components** - Reusable UI pieces organized by feature
- **Shared** - Common components used across features

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Common Issues

### Messages not appearing after sending
- Make sure MessageProvider wraps your app
- Ensure both components use `useMessage()` from the context
- Check that JSON Server is running on port 3001

### Authentication not persisting
- Check localStorage in browser DevTools
- Verify the auth hook is properly saving tokens/user data

### Port conflicts
- Frontend default: 5173 (Vite)
- Backend default: 3001 (JSON Server)
- Change ports if needed in respective configs

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- WebSocket for real-time updates
- Group chats
- File sharing
- Message reactions
- Typing indicators
- Read receipts

## License

MIT