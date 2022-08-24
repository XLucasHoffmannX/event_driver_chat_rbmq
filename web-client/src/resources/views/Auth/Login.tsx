import React, { SyntheticEvent, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Http } from '../../../app/config/Http';
import changeInputRecursive from '../../../app/helpers/ChangeInputRecursive';
import { ContextState } from '../../../context/DataProvider';

/* component */
import ButtonSubmit from '../../components/ButtonSubimt';
/* style */
import './auth.css';

export default function Login() {
	const state: any = useContext(ContextState);

	const setNotify = state.notifyGeral.notify[1];
	const [redirect, setRedierect] = React.useState(false);
	const [inputData, setInputData] = React.useState<any>({
		email: "",
		password: ""
	});

	const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, inputData, setInputData);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await Http.post("/auth", {
			...inputData
		}).then(res => {
			localStorage.setItem('primaryLogin', 'true');
			if (res.status === 201 || res.status === 200) setRedierect(true);
		}).catch(error => {
			setNotify({ open: true, message: 'Ocorreu um erro ao entrar!', success: false });
			if (error) throw error;
		});
	}

	if (redirect) return <Redirect to={'/chat'} />;

	return (
		<div className='auth_container d-flex flex-column align-items-center justify-content-center'>
			<div className='auth_title d-flex flex-column align-items-center justify-content-center mb-4 text-white'>
				<h1>i<b>Host</b></h1>
				<span>simple and safe</span>
			</div>
			<div className='auth_box_container d-flex flex-column'>
				<div className='auth_box_title d-flex flex-column'>
					<h1>Boas vindas!</h1>
					<span>Você por aqui novamente?</span>
					<span>Aproveite ao máximo</span>
				</div>

				<form className='form_container mt-3' onSubmit={handleSubmit}>
					<div className='form_content'>
						<input type="text" className='form_input' placeholder='Nome de usuário ou email' name='email' value={inputData.email} onChange={changeInput} required />
					</div>
					<div className='form_content'>
						<input type="password" className='form_input' placeholder='Senha' name='password' value={inputData.password} onChange={changeInput} required />
					</div>
					<div className='auth_account_link'>
						<span>Não possui conta ainda? <Link to="/register">Cadastre aqui</Link> </span>
					</div>
					<ButtonSubmit title="Vamos lá" />
				</form>
			</div>
		</div>
	)
}