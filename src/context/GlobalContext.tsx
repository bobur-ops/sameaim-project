import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import { createClubApi, getClubsApi, getUserApi } from '../api/client'
import { uniqueId } from '../utils/uniqueId';

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }: any) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const getMyUser = async () => {
		const cookieUser = getCookie('user');
		if (cookieUser) {
			// const res = await getUserApi(cookieUser);
			// setUser(res.data);
		}
	};

	useEffect(() => {
		getMyUser();
	}, []);

	const createClub = async (clubData: any) => {
		try {
			toast('Processing...');
			setLoading(true);
			const data = {
				...clubData,
				author: JSON.stringify(user),
				clubId: uniqueId('club'),
			};

			// const response = await createClubApi(data);
			// console.log(response);
			// toast.success(
			// 	`Club ${response.data.newClub.clubName} was created successfully`
			// );
			// setLoading(false);
			// setUser(response.data.newUser);
			history.go(-1);
		} catch (error: any) {
			setLoading(false);
			toast.error(`${error.response.data.message}`);
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				createClub,
				getMyUser,
				loading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	return useContext(GlobalContext);
}
