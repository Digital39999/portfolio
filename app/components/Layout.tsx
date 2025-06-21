import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '~/components/ui/dialog';
import { ThemeToggle } from '~/components/Theme';
import { Button } from '~/components/ui/button';
import { useScroll } from '~/hooks/useScroll';
import { Link } from '@remix-run/react';
import { cn } from '~/other/utils';

export type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
	return (
		<div className='relative flex flex-col min-h-screen overflow-hidden'>
			<Header />

			<div className='flex flex-col flex-grow w-full mt-24 mb-16 sm:mt-32 px-4 sm:px-6 lg:px-8'>
				{children}
			</div>

			<Footer />
		</div>
	);
}

export function Header() {
	const { isScrolled } = useScroll();

	return (
		<header className={cn('flex items-center gap-3 sm:gap-4 bg-background fixed top-0 left-0 w-full z-50 rounded-md py-2 px-4 sm:px-6', isScrolled && 'backdrop-blur-md')}>
			<div className='flex justify-end items-center w-full'>
				<ThemeToggle />
			</div>
		</header>
	);
}

export default function Footer() {
	return (
		<div className='container mx-auto px-6 sm:px-8 py-8'>
			<div className='flex flex-col items-center justify-center text-center'>
				<div className='flex flex-col items-center justify-center'>
					<p className='text-sm text-muted-foreground'>
						Copyright © 2019 - {new Date().getFullYear()}. All Rights Reserved.
					</p>
				</div>
			</div>
		</div>
	);
}

export type LogoutDialogProps = {
	open: boolean;
	onClose: () => void;
};

export function LogoutDialog({ open, onClose }: LogoutDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Logout</DialogTitle>
					<DialogDescription>Are you sure you want to logout?</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Link to='/logout' reloadDocument>
						<Button variant='destructive'>Logout</Button>
					</Link>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
