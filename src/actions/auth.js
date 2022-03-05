import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = { name, email, password };
		console.log(body);
		try {
			const res = await axios.post(
				`http://localhost:5000/api/users/`,
				body,
				config
			);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg || error.message, "danger"))
				);
			}
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};
