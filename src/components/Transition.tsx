import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 0.4,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			delay: 0.1,
		},
	},
};

const Transition = ({ children }: any) => {
	const { asPath } = useRouter();

	return (
		<div className="effect-1">
			<AnimatePresence initial={true} exitBeforeEnter>
				<motion.div
					key={asPath}
					variants={variants}
					animate="in"
					initial="out"
					exit="out"
					transition={{ type: 'linear' }}
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Transition;
