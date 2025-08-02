# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GoodJobShare is a React-based web application for workplace transparency in Taiwan. It allows users to anonymously share salary information, work experiences, interview experiences, and labor rights information. The project uses Razzle for universal React applications with server-side rendering.

## Development Commands

### Installation
```bash
yarn install
```

### Development
```bash
npm run start        # Start development server with TypeScript watch mode
npm run start:tsc    # Start TypeScript compiler in watch mode
```

### Building
```bash
npm run build        # Build production version (includes TypeScript compilation)
```

### Testing and Linting
```bash
npm run test         # Run full test suite (lint + stylelint + tests)
npm run testonly     # Run Jest tests only
npm run lint         # ESLint for JS/TS files
npm run stylelint    # CSS linting
```

### Production
```bash
npm run start-production  # Start production server
```

## Architecture

### Core Technologies
- **React 16** with server-side rendering via Razzle
- **Redux** with redux-persist for state management  
- **TypeScript** (partial migration - mixed JS/TS codebase)
- **CSS Modules** for styling
- **React Router 5** for routing
- **GraphQL** for API communication

### Directory Structure

**`src/components/`** - React components organized by feature:
- `CompanyAndJobTitle/` - Company and job title pages with nested routes
- `ExperienceDetail/` - Individual experience detail pages
- `ShareExperience/` - Multi-step forms for sharing workplace experiences
- `LaborRightsSingle/` - Labor rights educational content
- `common/` - Reusable UI components, forms, and utilities

**`src/actions/`** - Redux action creators for API calls and state updates

**`src/reducers/`** - Redux reducers, including TypeScript migration files (`.ts`)

**`src/apis/`** - API client functions for backend communication

**`src/graphql/`** - GraphQL query definitions

**`src/pages/`** - Page-level providers and data fetchers for companies and job titles

**`src/hooks/`** - Custom React hooks for authentication, routing, experiments

**`src/constants/`** - Application constants and configuration

### Key Patterns

**Routing**: Nested route configuration in `src/routes.js` with provider components for data fetching

**State Management**: Redux with thunks for async operations. Persistent auth state via redux-persist

**TypeScript Migration**: Ongoing - files ending in `.ts`/`.tsx` are migrated, `.js` files remain legacy

**CSS Modules**: Each component has its own `.module.css` file for scoped styling

**Path Aliases**: 
- `common/*` → `src/components/common/*`
- `images/*` → `src/components/images/*`

## Testing

Tests use Jest with React Testing Library. Module name mapping configured for path aliases. Run individual tests with Jest CLI patterns.

## Important Notes

- This is a mixed JS/TypeScript codebase in migration
- Uses Razzle's custom webpack configuration in `razzle.config.js`  
- CSS uses PostCSS with mixins, nested rules, and variables
- Husky pre-commit hooks run lint-staged for code quality