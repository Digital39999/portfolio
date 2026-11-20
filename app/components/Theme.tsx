import { Button } from '~/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const saved = window.localStorage.getItem('theme');
		const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
		setDark(isDark);
		document.documentElement.classList.toggle('dark', isDark);
	}, []);

	const toggleTheme = () => {
		const nextDark = !dark;
		setDark(nextDark);
		document.documentElement.classList.toggle('dark', nextDark);
		window.localStorage.setItem('theme', nextDark ? 'dark' : 'light');
	};

	return (
		<Button variant='ghost' size='icon' onClick={toggleTheme} aria-label='Toggle theme'>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
		</Button>
	);
}
