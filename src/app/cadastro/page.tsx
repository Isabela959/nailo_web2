'use client';
import React, { useState, FormEvent } from 'react';
// Se você estiver usando CSS Modules, importe assim:
// import styles from './Cadastro.module.css'; 

// Usaremos a classe do globals.css para este exemplo
interface FormData {
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
}

const Cadastro: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Lógica de validação e envio do formulário aqui
        console.log("Dados de Cadastro:", formData);
        
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        
        // Simular envio de dados
        alert("Cadastro simulado com sucesso!");
    };

    return (
        <div className="app-container"> {/* Container principal para o fundo */}
            <header className="header">
                <div className="logo">Logo Nallo</div>
            </header>
            
            <main className="main-content">
                <div className="card-cadastro">
                    <h2 className="card-title">Cadastro</h2>
                    <form className="cadastro-form" onSubmit={handleSubmit}>
                        
                        {/* Campo Email */}
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        {/* Campo Telefone */}
                        <div className="input-group">
                            <label htmlFor="telefone">Telefone:</label>
                            <input 
                                type="tel" 
                                id="telefone" 
                                name="telefone" 
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Senha */}
                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <input 
                                type="password" 
                                id="senha" 
                                name="senha" 
                                value={formData.senha}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        {/* Campo Confirmar Senha */}
                        <div className="input-group">
                            <label htmlFor="confirmar-senha">Confirmar senha</label>
                            <input 
                                type="password" 
                                id="confirmar-senha" 
                                name="confirmarSenha" 
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="btn-cadastro">Cadastrar</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Cadastro;