
"use client"

import { useRouter } from "next/navigation";
import { User, LogOut, Trash2, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// 1. Definição da Interface (Mock)

interface IAgendamento {
  _id: string; // Usando string para simplificar o mock
  clienteId: string;
  profissionalId: string;
  servicoId: string;
  data: string; // ex: "2025-11-08"
  hora: string; // ex: "14:30 - 15:30"
  status: "pendente" | "confirmado" | "concluido" | "cancelado";
  observacao?: string;
  criadoEm: Date;
}


// 2. Mocks de Profissionais

const mockProfissionais = [
    { id: "p1", nome: "Cleide Barros" },
    { id: "p2", nome: "Sir Ugaland de Ugalândia" },
    { id: "p3", nome: "Profissional C" },
    { id: "p4", nome: "Profissional D" },
];

const getProfissionalName = (id: string): string => {
    return mockProfissionais.find(p => p.id === id)?.nome || "Profissional Desconhecido";
};


// 3. Função de Listagem Simplificada (Mock)

const simularListagemAgendamentos = async (): Promise<IAgendamento[]> => {
    // Atraso simulado para dar tempo de ver o "Carregando"
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // Dados exatamente como na imagem
    return [
        { 
            _id: "a1", 
            clienteId: "c1", 
            profissionalId: "p1", 
            servicoId: "s1", 
            data: "2025-11-17", // Segunda 17/11
            hora: "16:30 - 18:00", 
            status: "confirmado", 
            observacao: "Unha em gel", 
            criadoEm: new Date() 
        },
        { 
            _id: "a2", 
            clienteId: "c1", 
            profissionalId: "p2", 
            servicoId: "s2", 
            data: "2025-12-12", // Sexta 12/12
            hora: "18:15 - 19:45", 
            status: "pendente", 
            observacao: "Pé de luxo", 
            criadoEm: new Date() 
        },
    ];
};


export default function Home() {
    const router = useRouter();
    const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
    const [loading, setLoading] = useState(true);

    const formatarData = (dataStr: string) => {
        try {
            const [ano, mes, dia] = dataStr.split('-').map(Number);
            const dataObj = new Date(ano, mes - 1, dia);

            return format(dataObj, 'EEEE dd/MM', { locale: ptBR }).replace(
                /(^\w|\s\w)/g,
                (l: string) => l.toUpperCase()
            );
        } catch (e) {
            return dataStr;
        }
    };

    // Função para carregar os agendamentos (usando a função mockada)
    const fetchAgendamentos = useCallback(async () => {
        setLoading(true);
        try {
            // ✅ SUBSTITUÍDO: Chamando a função de mock local
            const data = await simularListagemAgendamentos(); 
            setAgendamentos(data);
        } catch (error) {
            console.error("Erro ao simular agendamentos:", error);
            setAgendamentos([]); 
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAgendamentos();
    }, [fetchAgendamentos]);

    // Função de exclusão (Apenas simula a ação, sem chamar API)
    const handleDelete = async (agendamentoId: string) => {
        if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) {
            return;
        }
        
        // Simulação de exclusão: filtra o item da lista
        setAgendamentos(prev => prev.filter(ag => ag._id !== agendamentoId));

        console.log(`Simulação de exclusão do agendamento: ${agendamentoId}`);
        alert("Agendamento excluído (apenas visualmente).");
    };

    const handleSair = async () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#A7E8E4] flex flex-col items-center">
            {/* Barra superior (Header) */}
            <header className="w-full bg-[#48CFCB] flex justify-between items-center px-6 py-3">
                {/* Logo/Nome */}
                <div className="flex items-center space-x-2">
                    <div className="bg-[#F7CAC9] text-xs px-2 py-1 rounded">Logo</div>
                    <span className="font-semibold text-white text-lg">Nailo</span>
                </div>
                {/* Navegação */}
                <nav className="flex space-x-6 text-white font-medium">
                    <a href="/" className="underline">Home</a>
                    <a href="/agendamento" className="hover:underline">Agenda</a>
                    <a href="/historico" className="hover:underline">Histórico</a>
                </nav>
                {/* Perfil e Sair */}
                <div className="flex items-center space-x-4">
                    <div
                        onClick={() => router.push("/perfil")}
                        className="bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition"
                        title="Meu Perfil"
                    >
                        <User className="w-5 h-5 text-[#48CFCB]" />
                    </div>
                    <button
                        onClick={handleSair}
                        className="text-white hover:text-[#F7CAC9] transition"
                        title="Sair"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="container-principal w-full max-w-2xl p-4">

                {/* 1. Container de Agendamentos */}
                <div className="card-agendamentos bg-white rounded-lg shadow-xl overflow-hidden mb-6">
                    <div className="header-agendamentos bg-[#48CFCB] text-white p-3 font-bold rounded-t-lg">
                        Agendamentos
                    </div>
                    <div className="lista-agendamentos p-4 relative">
                        
                        {loading ? (
                            <p className="text-center text-gray-500 py-6">Carregando agendamentos...</p>
                        ) : agendamentos.length === 0 ? (
                            <p className="text-center text-gray-500 py-6">
                                Nenhum agendamento encontrado.
                            </p>
                        ) : (
                            agendamentos.map((agendamento) => {
                                // Lógica de cor baseada na data para replicar o layout
                                const isRed = agendamento.data.includes("11-17"); 
                                const bgColor = isRed ? 'bg-[#F7CAC9]' : 'bg-[#C9D6F7]';
                                const profissionalNome = getProfissionalName(agendamento.profissionalId);

                                return (
                                    <div
                                        key={agendamento._id}
                                        className={`card-item flex justify-between items-center p-4 my-2 rounded-lg shadow-md ${bgColor} text-gray-800`}
                                    >
                                        <div>
                                            <div className="card-data-horario font-semibold text-sm">
                                                <strong className="block">{formatarData(agendamento.data)}</strong>
                                                <span className="font-normal text-xs">{agendamento.hora}</span>
                                            </div>
                                            <div className="card-detalhe text-sm mt-1">
                                                {/* Combina a observação (serviço) e o nome do profissional */}
                                                {agendamento.observacao} - {profissionalNome}
                                            </div>
                                        </div>
                                        
                                        {/* Botão de Excluir */}
                                        <button
                                            className="btn-excluir text-gray-600 hover:text-red-700 transition p-1"
                                            onClick={() => handleDelete(agendamento._id)}
                                            title="Excluir agendamento"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                );
                            })
                        )}

                        {/* Botão de Adicionar (Posicionado no canto inferior direito) */}
                        <button
                            onClick={() => router.push("/agendamento/novo")}
                            className="btn-adicionar absolute bottom-[-10px] right-2 bg-[#F7CAC9] text-[#48CFCB] rounded-full p-3 shadow-lg hover:scale-110 transition"
                            title="Adicionar novo agendamento"
                        >
                            <Plus className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* 2. Carrossel de Profissionais */}
                <div className="container-profissionais w-full mt-8">
                    <div className="label-profissionais bg-white text-gray-700 p-2 rounded-t-lg font-semibold border-b-2 border-[#48CFCB]">
                        Profissionais
                    </div>
                    <div className="carrossel-profissionais flex items-center space-x-4 bg-white p-4 rounded-b-lg shadow overflow-x-auto">
                        {mockProfissionais.map((prof) => (
                        <div 
                            key={prof.id} 
                            className="perfil-profissional flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                            title={prof.nome}
                            onClick={() => router.push(`/profissionais/${prof.id}`)}
                        >
                            <div className="icone-circular bg-[#F7CAC9] rounded-full p-4">
                                <User className="w-8 h-8 text-[#48CFCB]" /> 
                            </div>
                        </div>
                        ))}
                        {/* Seta do Carrossel */}
                        <div className="seta-carrossel flex-shrink-0 cursor-pointer hover:scale-110 transition p-2">
                            <ArrowRight className="w-6 h-6 text-[#48CFCB]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

