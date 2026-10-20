'use client';
import { useState } from 'react';

export default function FisioColetivaDashboard() {
  // Estado inicial dos pacientes na fila
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nome: 'Maria Silva (Grupo Coluna)',
      prioridade: 'Alta',
      condicao: 'Lombalgia Crônica Pós-Esforço',
      sinaisVitais: { pa: '130/85 mmHg', fc: '78 bpm', spo2: '98%', dor: '7/10' },
      evolucao: 'Paciente relata dor lombar aguda ao iniciar exercícios de flexibilidade. Realizada liberação miofascial prévia.',
      status: 'Aguardando'
    },
    {
      id: 2,
      nome: 'João Santos (Grupo Idosos Ativos)',
      prioridade: 'Média',
      condicao: 'Osteoartrite de Joelho Bilateral',
      sinaisVitais: { pa: '120/80 mmHg', fc: '72 bpm', spo2: '99%', dor: '4/10' },
      evolucao: 'Boa participação no aquecimento aeróbico leve. Sem queixas limitantes no momento.',
      status: 'Em Atendimento'
    },
    {
      id: 3,
      nome: 'Ana Oliveira (Grupo Postural)',
      prioridade: 'Baixa',
      condicao: 'Hipercifose Torácica',
      sinaisVitais: { pa: '110/70 mmHg', fc: '68 bpm', spo2: '100%', dor: '2/10' },
      evolucao: 'Executando exercícios de fortalecimento de romboides com excelente padrão motor.',
      status: 'Concluído'
    }
  ]);

  const [pacienteSelecionado, setPacienteSelecionado] = useState(pacientes[0]);
  const [novoNome, setNovoNome] = useState('');
  const [novaCondicao, setNovaCondicao] = useState('');
  const [novaPrioridade, setNovaPrioridade] = useState('Média');

  // Adicionar novo paciente à fila
  const adicionarPaciente = (e) => {
    e.preventDefault();
    if (!novoNome) return;
    const novo = {
      id: Date.now(),
      nome: novoNome,
      prioridade: novaPrioridade,
      condicao: novaCondicao || 'Avaliação Inicial',
      sinaisVitais: { pa: '120/80 mmHg', fc: '75 bpm', spo2: '98%', dor: '0/10' },
      evolucao: 'Paciente ingressou na fila de atendimento coletivo.',
      status: 'Aguardando'
    };
    setPacientes([...pacientes, novo]);
    setNovoNome('');
    setNovaCondicao('');
  };

  // Cores de prioridade
  const badgeColor = (p) => {
    if (p === 'Alta') return 'bg-red-100 text-red-700 border-red-300';
    if (p === 'Média') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
      {/* Cabeçalho */}
      <header className="max-w-7xl mx-auto mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Estágio Supervisionado • Fisioterapia Coletiva
          </span>
          <h1 className="text-2xl font-bold mt-2 text-slate-900">Prontuário & Triagem Dinâmica</h1>
        </div>
        <div className="flex gap-3 text-sm">
          <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="block text-slate-500 text-xs">Total na Fila</span>
            <strong className="text-lg text-slate-900">{pacientes.length} Pacientes</strong>
          </div>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna 1 e 2: Fila de Espera e Cadastro */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Formulário de Adição Rápida */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">➕ Inserir Paciente na Fila Coletiva</h2>
            <form onSubmit={adicionarPaciente} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nome do Paciente / Grupo"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="text"
                placeholder="Condição / Patologia"
                value={novaCondicao}
                onChange={(e) => setNovaCondicao(e.target.value)}
                className="p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={novaPrioridade}
                onChange={(e) => setNovaPrioridade(e.target.value)}
                className="p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Baixa">Prioridade: Baixa</option>
                <option value="Média">Prioridade: Média</option>
                <option value="Alta">Prioridade: Alta</option>
              </select>
              <button
                type="submit"
                className="md:col-span-3 bg-teal-600 text-white font-medium py-3 rounded-xl hover:bg-teal-700 transition shadow-sm"
              >
                Adicionar à Fila de Atendimento
              </button>
            </form>
          </div>

          {/* Lista de Fila */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">👥 Fila de Atendimento & Prioridades</h2>
            <div className="space-y-3">
              {pacientes.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPacienteSelecionado(p)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                    pacienteSelecionado.id === p.id
                      ? 'border-teal-500 bg-teal-50/30 ring-1 ring-teal-500'
                      : 'border-slate-100 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{p.nome}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${badgeColor(p.prioridade)}`}>
                        {p.prioridade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{p.condicao}</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {p.status}
                    </span>
                    <button className="text-xs text-teal-600 font-semibold hover:underline">
                      Ver Prontuário →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 3: Prontuário Detalhado e Sinais Vitais */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
            <h2 className="text-lg font-semibold mb-2 text-slate-900">📋 Prontuário Eletrônico</h2>
            <p className="text-xs text-slate-400 mb-6">Exibindo dados do paciente selecionado</p>

            <div className="mb-6">
              <h3 className="font-bold text-slate-800 text-base">{pacienteSelecionado.nome}</h3>
              <p className="text-xs text-teal-600 font-medium">{pacienteSelecionado.condicao}</p>
            </div>

            {/* Sinais Vitais */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sinais Vitais Pré-Sessão</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase">Pressão Arterial</span>
                  <p className="text-sm font-semibold text-slate-700">{pacienteSelecionado.sinaisVitais.pa}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase">Frequência Cardíaca</span>
                  <p className="text-sm font-semibold text-slate-700">{pacienteSelecionado.sinaisVitais.fc}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase">Sat. O2</span>
                  <p className="text-sm font-semibold text-slate-700">{pacienteSelecionado.sinaisVitais.spo2}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase">Escala de Dor (EVA)</span>
                  <p className="text-sm font-semibold text-slate-700">{pacienteSelecionado.sinaisVitais.dor}</p>
                </div>
              </div>
            </div>

            {/* Evolução Fisioterapêutica */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Evolução / Notas Clínicas</h4>
              <textarea
                rows="4"
                value={pacienteSelecionado.evolucao}
                onChange={(e) => {
                  const atualizado = { ...pacienteSelecionado, evolucao: e.target.value };
                  setPacienteSelecionado(atualizado);
                  setPacientes(pacientes.map(p => p.id === atualizado.id ? atualizado : p));
                }}
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                placeholder="Digite a evolução clínica do paciente..."
              ></textarea>
              <p className="text-[10px] text-slate-400 mt-1">As alterações são salvas automaticamente no estado da sessão.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}