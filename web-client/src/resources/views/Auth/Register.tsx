import React from 'react'
import { Link } from 'react-router-dom';
import ButtonSubmit from '../../components/ButtonSubimt';

/* style */
import './auth.css';

export default function Register(){
	return (
		<div className='auth_container d-flex flex-column align-items-center justify-content-center'>
			<div className='auth_title d-flex flex-column align-items-center justify-content-center mb-4 text-white'>
				<h1>i<b>Host</b></h1>
				<span>simple and safe</span>
			</div>
			<div className='auth_box_container d-flex flex-column'>
				<div className='auth_box_title d-flex flex-column'>
					<h1>Cadastro</h1>
					<span>Lembre-se: simples. seguro.</span>
				</div>

				<form className='form_container mt-3' action="">
					<div className='form_content'>
						<input type="email" className='form_input' placeholder='Nome de usuário' required />
					</div>
                    <div className='form_content'>
						<input type="email" className='form_input' placeholder='Seu melhor email' required />
					</div>
                    <hr />
					<div className='form_content'>
						<input type="password" className='form_input' placeholder='Senha' required />
					</div>
                    <div className='form_content'>
						<input type="password" className='form_input' placeholder='Confirme sua senha' required />
					</div>
					<div className='auth_account_link'>
						<span>Já possui conta? <Link to="/">Entre aqui</Link> </span>
					</div>
					<ButtonSubmit title="Começar" />
				</form>
			</div>
		</div>
	)
}