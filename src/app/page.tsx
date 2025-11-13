'use client';
import { Link } from 'lucide-react';
import React, { useState, FormEvent } from 'react';

// Reutilizamos a interface ou definimos uma nova mais simples
interface LoginData {
    email: string;
    senha: string;
}

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        senha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Lógica de autenticação aqui
        console.log("Dados de Login:", loginData);
        
        // Simular autenticação
        if (loginData.email && loginData.senha) {
            alert("Login simulado com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <div className="app-container"> {/* Mantém o fundo turquesa claro */}
            <header className="header"> {/* Mantém o cabeçalho turquesa escuro */}
                <div className="logo">Logo Nallo</div>
            </header>
            
            <main className="main-content"> {/* Centraliza o card */}
                <div className="card-cadastro"> {/* Reutilizamos o estilo do card de cadastro */}
                    <h2 className="card-title-login">Entre</h2> {/* Título "Entre" */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        
                        {/* Campo Email */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={loginData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        {/* Campo Senha */}
                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <input 
                                type="password" 
                                id="senha" 
                                name="senha" 
                                value={loginData.senha}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                      <button type="submit" className="btn-entrar">Entrar</button>
                    </form>
                    
                    <p className="register-text">
                        Não tem conta? 
                        <Link href="/cadastro" className="register-link">
                            Cadastre-se
                        </Link>
                        {/* Se não estiver usando Next.js, use:
                        <a href="/cadastro" className="register-link">Cadastre-se</a> */}
                    </p>
                    {/* ------------------------------- */}

                </div>
            </main>
        </div>
    );
}

export default Login;