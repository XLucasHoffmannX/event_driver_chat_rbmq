import React from 'react'
import { Link } from 'react-router-dom';

/* component */
import ButtonSubmit from '../../components/ButtonSubimt';
/* style */
import './auth.css';

export default function Login(){
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

				<form className='form_container mt-3' action="">
					<div className='form_content'>
						<input type="text" className='form_input' placeholder='Nome de usuário ou email' required />
					</div>
					<div className='form_content'>
						<input type="password" className='form_input' placeholder='Senha' required />
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