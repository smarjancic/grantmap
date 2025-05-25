# GrantMap

GrantMap is a simple Next.js application for browsing and tracking grant opportunities. The project uses Tailwind CSS and connects to an Airtable base for storing grant data.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create an environment file**

   Copy `.env.local.example` to `.env.local` (create the example file if it does not exist) and provide the following variables:

   ```env
   AIRTABLE_ACCESS_TOKEN=your_server_token
   AIRTABLE_BASE_ID=your_base_id
   AIRTABLE_TABLE_NAME=Grants
   NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN=your_public_token
   NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Commands

- `npm run dev` – start the Next.js development server
- `npm run lint` – run ESLint on the project
- `npm run build` – create a production build
- `npm run start` – run the compiled production server

GrantMap is still a work in progress. Feel free to open issues or pull requests if you encounter problems or have suggestions.
