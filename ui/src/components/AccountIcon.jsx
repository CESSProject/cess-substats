/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-08-01 17:24:18
 * @LastEditors: chenbinfa
 * @LastEditTime: 2022-08-01 18:00:43
 * @description: 描述信息
 * @author: chenbinfa
 */
export default function ({ hash }) {
	if (!hash || hash.length < 3) {
		hash = "cXa";
	}
	let n = hash.toString().substring(2, 3);
	console.log("props.toString().substring(2, 3);", n, hash);
	const obj = {};
	obj.a = (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="account-icon" viewBox="0 0 24 24">
			<path fill="#e5ccb2" d="M12 2L12 7L7 7ZM17 7L12 7L12 2ZM12 22L12 17L17 17ZM7 17L12 17L12 22ZM7 7L7 12L2 12ZM22 12L17 12L17 7ZM17 17L17 12L22 12ZM2 12L7 12L7 17Z"></path>
			<path
				fill="#cc9966"
				d="M2 7L2 2L4.5 2ZM17 2L22 2L22 4.5ZM22 17L22 22L19.5 22ZM7 22L2 22L2 19.5ZM8 8L12 8L12 12L8 12ZM16 8L16 12L12 12L12 8ZM16 16L12 16L12 12L16 12ZM8 16L8 12L12 12L12 16Z"></path>
		</svg>
	);
	obj.b = (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="#d17586"
				d="M7 7L7 2L12 2ZM12 2L17 2L17 7ZM17 17L17 22L12 22ZM12 22L7 22L7 17ZM2 12L2 7L7 7ZM17 7L22 7L22 12ZM22 12L22 17L17 17ZM7 17L2 17L2 12ZM7 7L12 7L12 7.8L9.9 12L7 12ZM17 7L17 12L16.2 12L12 9.9L12 7ZM17 17L12 17L12 16.2L14.1 12L17 12ZM7 17L7 12L7.8 12L12 14.1L12 17Z"></path>
			<path fill="#e8e8e8" d="M7 7L2 7L2 2ZM17 7L17 2L22 2ZM17 17L22 17L22 22ZM7 17L7 22L2 22Z"></path>
		</svg>
	);
	obj.c = (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="#d2e5b2"
				d="M12 2L12 7L9.5 7ZM17 7L12 7L12 4.5ZM12 22L12 17L14.5 17ZM7 17L12 17L12 19.5ZM7 7L7 12L4.5 12ZM22 12L17 12L17 9.5ZM17 17L17 12L19.5 12ZM2 12L7 12L7 14.5Z"></path>
			<path
				fill="#a6cc66"
				d="M7 4.5L4.5 7L2 4.5L4.5 2ZM19.5 7L17 4.5L19.5 2L22 4.5ZM17 19.5L19.5 17L22 19.5L19.5 22ZM4.5 17L7 19.5L4.5 22L2 19.5ZM7 7L12 7L12 10.5L9 9L10.5 12L7 12ZM17 7L17 12L13.5 12L15 9L12 10.5L12 7ZM17 17L12 17L12 13.5L15 15L13.5 12L17 12ZM7 17L7 12L10.5 12L9 15L12 13.5L12 17Z"></path>
		</svg>
	);
	obj.d = (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				fill="#d175c8"
				d="M7.8 4.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M12.8 4.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M12.8 19.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M7.8 19.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M2.8 9.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M17.8 9.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M17.8 14.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0M2.8 14.5a1.7,1.7 0 1,1 3.3,0a1.7,1.7 0 1,1 -3.3,0"></path>
			<path fill="#e8e8e8" d="M7 7L2 7L2 4.5ZM17 7L17 2L19.5 2ZM17 17L22 17L22 19.5ZM7 17L7 22L4.5 22Z"></path>
			<path fill="#a8389d" d="M7 7L12 7L12 7.8L9.9 12L7 12ZM17 7L17 12L16.2 12L12 9.9L12 7ZM17 17L12 17L12 16.2L14.1 12L17 12ZM7 17L7 12L7.8 12L12 14.1L12 17Z"></path>
		</svg>
	);
	return obj.a;
}
