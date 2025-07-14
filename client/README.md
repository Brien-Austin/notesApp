# Personal Notes Maker - Frontend

A modern, responsive web application for creating and managing personal notes. Built with Next.js 15.3.5, React 19, and TypeScript, featuring a clean and intuitive user interface powered by Tailwind CSS.

## 🚀 Features

- 📝 Create, edit, and delete notes
- 🔍 Full-text search functionality
- 🏷️ Categorize notes with tags
- 🎨 Clean, responsive design
- ⚡ Optimized performance with React Server Components
- 🌓 Dark/Light mode support
- 📱 Mobile-friendly interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.5](https://nextjs.org/) (App Router)
- **UI**: [Tailwind CSS](https://tailwindcss.com/) with [class-variance-authority](https://cva.style/)
- **State Management**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Type Safety**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.x or later / yarn / pnpm

### Installation

1. Clone the repository
   ```bash
   git clone [your-repository-url]
   cd personal_notes_maker/client
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/src
  /app
    /api               # API routes and handlers
    /(dashboard)       # Protected dashboard routes
    /features          # Feature-based modules
      /auth           # Authentication related components and logic
      /notes          # Notes management feature
      /settings       # User settings feature
    /providers        # Context providers and app-wide state
    /constants        # Application-wide constants
    /types           # TypeScript type definitions
    /utils           # Utility functions and helpers
    /fonts           # Custom font configurations
  /public            # Static assets
  /styles            # Global styles and Tailwind configuration

  # Configuration files
  .env               # Environment variables
  next.config.ts     # Next.js configuration
  tsconfig.json      # TypeScript configuration
  tailwind.config.ts # Tailwind CSS configuration
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Follows [Next.js recommended patterns](https://nextjs.org/docs)
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
