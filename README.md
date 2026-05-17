# ANGULAREX

**ANGULAREX** is a demonstration project created to showcase practical experience with modern Angular development, frontend architecture, and AI integration.

The project combines a traditional Angular application with an AI-powered assistant connected to a custom backend gateway. It serves as an experimental environment for testing UI patterns, Angular features, and modern AI workflows.

> This project is intended as a portfolio/demo application rather than a production system.

---

## Features

- Angular 17 application architecture
- Modular structure (`core`, `shared`, `services`, `pages`)
- Responsive UI
- AI-powered Angular Developer Chat
- Code block rendering with copy support
- Backend communication through protected AI Gateway
- Error handling for limits and unavailable AI services
- Environment-based configuration
- Component-based architecture
- Mobile-friendly modal chat interface

---

## AI Chat Integration

The project includes an **Angular Developer Chat**, designed as a lightweight AI assistant focused primarily on:

- Angular
- TypeScript
- RxJS
- Services & Components
- Routing
- Angular Material
- Frontend architecture
- Debugging and development workflows

AI requests are routed through an external backend gateway:

```text
Angular Frontend
        ↓
AI Gateway Backend
        ↓
LLM / AI Provider
```

The frontend never stores private AI provider keys.

---

## Architecture Overview

Project structure:

```text
src/
 ├── app/
 │    ├── modules/
 │    │      ├── core/
 │    │      ├── pages/
 │    │      ├── services/
 │    │      ├── shared/
 │    │      └── store/
 │    │
 │    └── features/
 │           └── chat/
 │                 ├── components/
 │                 ├── services/
 │                 └── models/
 │
 ├── environments/
 └── assets/
```

Main principles:

- Separation of concerns
- Modular architecture
- Reusable services
- Feature-based organization
- Environment configuration
- AI integration via gateway pattern

---

## Installation

Clone repository:

```bash
git clone YOUR_REPOSITORY_URL
cd angularex
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## Environment Configuration

Configure:

```text
src/environments/environment.ts
```

Example:

```ts
export const environment = {
  aiGatewayBaseUrl: 'YOUR_BACKEND_URL',
  aiClientId: 'angularex',
  aiClientToken: 'demo-token'
};
```

---

## Build

Production build:

```bash
ng build
```

Artifacts:

```text
dist/
```

---

## Technologies

### Frontend
- Angular 17
- TypeScript
- SCSS
- RxJS
- Angular CLI

### AI Integration
- Custom AI Gateway
- LLM integration
- Rate limiting
- Client token validation

### Development
- Git
- npm
- Responsive UI patterns

---

## Purpose of the Project

The goal of this project is to demonstrate:

- Angular development skills
- Component architecture
- API integration
- AI-assisted frontend features
- Modern UI implementation
- Practical experimentation with AI workflows

---

## Disclaimer

This project is intended primarily for learning, experimentation, and portfolio demonstration purposes.

Some features may use demo limits or simplified configurations and are not designed as enterprise production solutions.
