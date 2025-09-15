import { redirect } from 'next/navigation';

export default function HomePage() {
  // By default, redirect to the main login page.
  // The app-layout will handle showing the correct dashboard
  // if the user is already authenticated.
  redirect('/login');
}
