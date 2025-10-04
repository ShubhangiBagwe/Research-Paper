# Frontend Development Test - Research Paper Dashboard

A Next.js 14 (App Router) application that fetches and displays research paper data from Enago’s API.

## Features
- Fetches data asynchronously with loading/error handling  
- Search by title, author, or journal  
- Sort by title/year/impact factor  
- Client-side pagination  
- Responsive SCSS with theme variables  
- View Details modal for full paper info  
- Clean modular structure (Ant Design + SCSS)

## Prerequisites

To run this project, you need **Node.js** installed on your machine.

- Check if Node.js is installed:

```bash
node -v
npm -v

## Run Locally
add .env file locally 

NEXT_PUBLIC_BASE_URL = https://easydash.enago.com

```bash
npm install
npm run dev

Live Demo : https://paperresearch.netlify.app
