'use client';
import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, X } from 'lucide-react'; // Importando ícones para o "olho" e fechar

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
    
    // ➡️ NOVOS ESTADOS PARA VISIBILIDADE DE SENHA
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    // ➡️ NOVOS ESTADOS PARA MENSAGENS E ERROS (substituindo o alert())
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Limpa erros ao digitar novamente
        if (passwordError) setPasswordError(null);
        if (successMessage) setSuccessMessage(null);

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // ➡️ FUNÇÕES PARA ALTERNAR VISIBILIDADE
    const toggleSenhaVisibility = () => {
        setShowSenha(prev => !prev);
    };

    const toggleConfirmarSenhaVisibility = () => {
        setShowConfirmarSenha(prev => !prev);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setPasswordError(null); // Limpa erros anteriores
        setSuccessMessage(null); // Limpa sucesso anterior
        
        if (formData.senha !== formData.confirmarSenha) {
            setPasswordError("As senhas não coincidem. Por favor, verifique.");
            return;
        }
        
        console.log("Dados de Cadastro:", formData);
        
        setSuccessMessage("✅ Cadastro realizado com sucesso!");
        // Opcional: Limpar formulário após sucesso
        setFormData({
            email: '',
            telefone: '',
            senha: '',
            confirmarSenha: '',
        });
    };

    return (
        <div className="app-container">
            <header className="header">
                <img src="/img/Nailo1.png" alt="Descrição" 
                width={50}height={50}/>
            </header>
            
            <main className="main-content">
                <div className="card-cadastro">
                    <h2 className="card-title-login">Cadastro</h2>
                    
                    {/* Mensagem de Erro (Substituindo alert) */}
                    {passwordError && (
                        <div className="message error-message">
                            {passwordError}
                            <button className="close-btn" onClick={() => setPasswordError(null)}><X size={16} /></button>
                        </div>
                    )}
                    
                    {/* Mensagem de Sucesso (Substituindo alert) */}
                    {successMessage && (
                        <div className="message success-message">
                            {successMessage}
                            <button className="close-btn" onClick={() => setSuccessMessage(null)}><X size={16} /></button>
                        </div>
                    )}

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
                        
                        {/* Campo Senha - 🔑 Com Olhinho */}
                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="password-input-wrapper">
                                <input 
                                    // ➡️ TIPO DINÂMICO
                                    type={showSenha ? 'text' : 'password'} 
                                    id="senha" 
                                    name="senha" 
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleSenhaVisibility} 
                                    className="toggle-password-btn"
                                    aria-label={showSenha ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {/* ➡️ ÍCONE DINÂMICO */}
                                    {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Campo Confirmar Senha - 🔑 Com Olhinho */}
                        <div className="input-group">
                            <label htmlFor="confirmarSenha">Confirmar senha</label>
                            <div className="password-input-wrapper">
                                <input 
                                    // ➡️ TIPO DINÂMICO
                                    type={showConfirmarSenha ? 'text' : 'password'} 
                                    id="confirmarSenha" 
                                    name="confirmarSenha" 
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleConfirmarSenhaVisibility} 
                                    className="toggle-password-btn"
                                    aria-label={showConfirmarSenha ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {/* ➡️ ÍCONE DINÂMICO */}
                                    {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn-cadastro">Cadastrar</button>

                        <p className="register-text">
                        Já tem conta? 
                        <a href="/" className="register-link">Entre</a> 
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Cadastro;