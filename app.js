<!DOCTYPE html>
<html lang="pt-BR" class="h-full bg-slate-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma de Estágio em Fisioterapia Coletiva</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts (Inter) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        /* Custom scrollbar for clean UI */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>
<body class="font-sans antialiased h-full text-slate-800 flex flex-col bg-slate-50">

    <!-- Toast Notification Box -->
    <div id="toast" class="fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 ease-in-out pointer-events-none flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700">
        <i id="toast-icon" class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>
        <span id="toast-message" class="text-sm font-medium">Ação realizada com sucesso!</span>
    </div>

    <!-- Top Navigation Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                        <i class="fa-solid fa-hand-holding-medical text-xl"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h1 class="font-bold text-slate-900 text-lg leading-tight">FisioColetiva</h1>
                            <span class="bg-teal-50 text-teal-700 border border-teal-200/80 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Academic Edition
                            </span>
                        </div>
                        <p class="text-xs text-slate-500 hidden sm:block">Plataforma de Estágio Supervisionado em Fisioterapia Coletiva</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 sm:gap-4">
                    <div class="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/80 text-xs text-slate-600 font-medium">
                        <i class="fa-solid fa-graduation-cap text-teal-600"></i>
                        <span>Semana Acadêmica 2026</span>
                    </div>
                    <button onclick="resetData()" title="Restaurar dados iniciais" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm flex items-center gap-1.5">
                        <i class="fa-solid fa-rotate"></i>
                        <span class="text-xs font-medium hidden sm:inline">Resetar</span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        <!-- Top Overview & Dashboard Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total na Fila</p>
                        <h3 id="stat-total" class="text-3xl font-bold text-slate-900 mt-1">0</h3>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <i class="fa-solid fa-users"></i>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    <span class="inline-block w-2 h-2 rounded-full bg-blue-500"></span> Pacientes cadastrados no dia
                </p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Aguardando</p>
                        <h3 id="stat-waiting" class="text-3xl font-bold text-amber-600 mt-1">0</h3>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    <span class="inline-block w-2 h-2 rounded-full bg-amber-500"></span> Prontos para atendimento
                </p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Em Atendimento</p>
                        <h3 id="stat-active" class="text-3xl font-bold text-teal-600 mt-1">0</h3>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                        <i class="fa-solid fa-heart-pulse"></i>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    <span class="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> Atendimentos em progresso
                </p>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Alta Prioridade</p>
                        <h3 id="stat-high-priority" class="text-3xl font-bold text-rose-600 mt-1">0</h3>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-3 flex items-center gap-1">
                    <span class="inline-block w-2 h-2 rounded-full bg-rose-500"></span> Requer atenção imediata
                </p>
            </div>
        </div>

        <!-- Secondary Section: Registration Form & Filter Controls -->
        <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div class="flex items-center justify-between cursor-pointer select-none" onclick="toggleForm()">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <div>
                        <h2 class="font-bold text-slate-900 text-base">Nova Triagem / Adicionar Paciente ou Grupo</h2>
                        <p class="text-xs text-slate-500">Cadastre um novo paciente com prioridade e sinais vitais iniciais</p>
                    </div>
                </div>
                <button id="form-toggle-btn" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-transform duration-200">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>

            <!-- Expandable Form -->
            <form id="triage-form" onsubmit="handleFormSubmit(event)" class="mt-5 border-t border-slate-100 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 hidden">
                <div class="space-y-1.5 md:col-span-2 lg:col-span-1">
                    <label class="text-xs font-semibold text-slate-700">Nome / Nome do Grupo <span class="text-rose-500">*</span></label>
                    <input type="text" id="input-name" required placeholder="Ex: Maria Silva ou Grupo Coluna" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                </div>

                <div class="space-y-1.5 md:col-span-2 lg:col-span-1">
                    <label class="text-xs font-semibold text-slate-700">Condição / Diagnóstico <span class="text-rose-500">*</span></label>
                    <input type="text" id="input-condition" required placeholder="Ex: Lombalgia Crônica ou Artrose" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                </div>

                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-700">Nível de Prioridade</label>
                    <select id="input-priority" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white">
                        <option value="Baixa">🟢 Baixa (Rotina/Manutenção)</option>
                        <option value="Média" selected>🟡 Média (Moderada)</option>
                        <option value="Alta">🔴 Alta (Sintomas Agudos)</option>
                    </select>
                </div>

                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-700">PA (Pressão Arterial)</label>
                    <input type="text" id="input-pa" placeholder="Ex: 120/80 mmHg" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                </div>

                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-700">FC (Freq. Cardíaca)</label>
                    <input type="text" id="input-fc" placeholder="Ex: 75 bpm" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                </div>

                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-700">SpO2 (Saturação O2)</label>
                    <input type="text" id="input-spo2" placeholder="Ex: 98%" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                </div>

                <div class="space-y-1.5">
                    <label class="text-xs font-semibold text-slate-700">Dor Escala EVA (0-10)</label>
                    <select id="input-eva" class="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white">
                        <option value="0/10">0/10 - Sem Dor</option>
                        <option value="2/10">2/10 - Dor Leve</option>
                        <option value="4/10" selected>4/10 - Dor Moderada</option>
                        <option value="6/10">6/10 - Dor Intensa</option>
                        <option value="8/10">8/10 - Dor Muita Intensa</option>
                        <option value="10/10">10/10 - Dor Insuportável</option>
                    </select>
                </div>

                <div class="md:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
                    <button type="button" onclick="toggleForm()" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                    <button type="submit" class="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/20 transition flex items-center gap-2">
                        <i class="fa-solid fa-check"></i> Inserir na Fila
                    </button>
                </div>
            </form>
        </div>

        <!-- Main Workspace: Queue & Medical Record Side-by-Side -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <!-- Left Panel: Queue Management (7 cols) -->
            <div class="lg:col-span-7 space-y-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="font-bold text-slate-900 text-base">Fila de Atendimento Coletivo</h2>
                        <p class="text-xs text-slate-500">Selecione um paciente para abrir seu prontuário detalhado</p>
                    </div>

                    <!-- Filter Controls -->
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <div class="relative flex-1 sm:w-40">
                            <select id="filter-status" onchange="renderQueue()" class="w-full pl-3 pr-8 py-1.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                <option value="ALL">Todos os Status</option>
                                <option value="Aguardando">Aguardando</option>
                                <option value="Em Atendimento">Em Atendimento</option>
                                <option value="Concluído">Concluído</option>
                            </select>
                        </div>
                        <button onclick="toggleSort()" id="sort-btn" title="Alternar Ordenação" class="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 text-slate-700 whitespace-nowrap">
                            <i class="fa-solid fa-arrow-down-wide-short text-teal-600"></i>
                            <span>Prioridade</span>
                        </button>
                    </div>
                </div>

                <!-- Patient Cards List Container -->
                <div id="patient-queue-list" class="space-y-3 min-h-[300px]">
                    <!-- Dynamically Rendered via JS -->
                </div>
            </div>

            <!-- Right Panel: Electronic Health Record - SOAP (5 cols) -->
            <div class="lg:col-span-5">
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm sticky top-24 overflow-hidden flex flex-col">
                    
                    <!-- EHR Header -->
                    <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="text-[10px] uppercase tracking-wider font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-800/50">
                                    Prontuário & Evolução SOAP
                                </span>
                                <h3 id="ehr-patient-name" class="text-lg font-bold mt-2">Nenhum Paciente Selecionado</h3>
                                <p id="ehr-patient-condition" class="text-xs text-slate-300 mt-0.5">Selecione um paciente na fila ao lado</p>
                            </div>
                            <div id="ehr-priority-badge">
                                <!-- Badge added dynamically -->
                            </div>
                        </div>
                    </div>

                    <!-- EHR Content (Hidden or disabled if no selection) -->
                    <div id="ehr-body" class="p-5 space-y-5">
                        
                        <!-- Vital Signs Live Editing Box -->
                        <div>
                            <div class="flex justify-between items-center mb-3">
                                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <i class="fa-solid fa-heart-pulse text-rose-500"></i>
                                    Sinais Vitais Pré/Pós Sessão
                                </h4>
                                <span class="text-[10px] text-slate-400">Edição em Tempo Real</span>
                            </div>

                            <div class="grid grid-cols-2 gap-2.5">
                                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                                    <label class="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Pressão Arterial</label>
                                    <input type="text" id="ehr-pa" onblur="updateCurrentVitals()" class="w-full bg-white px-2 py-1 text-xs border border-slate-200 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none">
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                                    <label class="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Freq. Cardíaca</label>
                                    <input type="text" id="ehr-fc" onblur="updateCurrentVitals()" class="w-full bg-white px-2 py-1 text-xs border border-slate-200 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none">
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                                    <label class="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Saturação O2</label>
                                    <input type="text" id="ehr-spo2" onblur="updateCurrentVitals()" class="w-full bg-white px-2 py-1 text-xs border border-slate-200 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none">
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                                    <label class="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Dor (EVA)</label>
                                    <input type="text" id="ehr-eva" onblur="updateCurrentVitals()" class="w-full bg-white px-2 py-1 text-xs border border-slate-200 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none">
                                </div>
                            </div>
                        </div>

                        <!-- SOAP Notes & Evolution Area -->
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <i class="fa-solid fa-notes-medical text-teal-600"></i>
                                Nova Evolução Fisioterapêutica
                            </label>
                            <textarea id="ehr-notes-input" rows="4" placeholder="Descreva os exercícios realizados, resposta do paciente, conduta e observações para o relatório do estágio..." class="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none transition"></textarea>
                            <div class="flex justify-between items-center pt-1">
                                <span class="text-[10px] text-slate-400">Pressione 'Salvar' para atualizar o prontuário.</span>
                                <button onclick="saveEvolution()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                                    <i class="fa-solid fa-floppy-disk text-teal-400"></i> Salvar Evolução
                                </button>
                            </div>
                        </div>

                        <!-- History Log -->
                        <div class="border-t border-slate-100 pt-4">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                                <i class="fa-solid fa-clock-rotate-left text-slate-400"></i>
                                Histórico do Prontuário
                            </h4>
                            <div id="ehr-history" class="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                                <!-- History timeline items dynamically inserted -->
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </main>

    <!-- App JavaScript Logic -->
    <script>
        // Default Mock Data for Academic Presentation Demonstration
        const initialPatients = [
            {
                id: 'p1',
                nome: 'Grupo Saúde da Coluna (10 pac.)',
                condicao: 'Lombalgia Crônica & Alterações Posturais',
                prioridade: 'Alta',
                status: 'Aguardando',
                sinaisVitais: { pa: '130/85 mmHg', fc: '78 bpm', spo2: '97%', eva: '7/10' },
                historico: [
                    { data: '20/10/2026 14:10', texto: 'Aguardando liberação de espaço no ginásio para iniciar cinesioterapia em grupo.' },
                    { data: '18/10/2026 15:30', texto: 'Sessão anterior: Exercícios de mobilidade pélvica e ponte glútea executados com boa adesão.' }
                ]
            },
            {
                id: 'p2',
                nome: 'Dona Maria Oliveira',
                condicao: 'Osteoartrite de Joelho Bilateral',
                prioridade: 'Média',
                status: 'Em Atendimento',
                sinaisVitais: { pa: '120/80 mmHg', fc: '72 bpm', spo2: '98%', eva: '4/10' },
                historico: [
                    { data: '20/10/2026 14:30', texto: 'Atendimento iniciado. Realizando fortalecimento de quadríceps em cadeia cinemática fechada.' }
                ]
            },
            {
                id: 'p3',
                nome: 'Grupo Idosos Ativos (08 pac.)',
                condicao: 'Treino de Equilíbrio & Prevenção de Quedas',
                prioridade: 'Baixa',
                status: 'Aguardando',
                sinaisVitais: { pa: '118/75 mmHg', fc: '68 bpm', spo2: '99%', eva: '2/10' },
                historico: [
                    { data: '20/10/2026 14:00', texto: 'Sinais vitais checados na recepção. Todos aptos para o circuito funcional.' }
                ]
            },
            {
                id: 'p4',
                nome: 'Sr. João Batista',
                condicao: 'Pós-Op Reconstrução LCA (Fase Final)',
                prioridade: 'Alta',
                status: 'Concluído',
                sinaisVitais: { pa: '125/82 mmHg', fc: '80 bpm', spo2: '98%', eva: '1/10' },
                historico: [
                    { data: '20/10/2026 13:45', texto: 'Treino proprioceptivo concluído com sucesso. Sem relato de dor ou instabilidade articular.' }
                ]
            }
        ];

        // State variables
        let patients = [];
        let selectedPatientId = null;
        let sortByPriority = true;

        // Initialize App
        window.addEventListener('DOMContentLoaded', () => {
            loadData();
            if (patients.length > 0) {
                selectedPatientId = patients[0].id;
            }
            renderQueue();
            renderEHR();
        });

        // Save and Load from LocalStorage
        function saveData() {
            localStorage.setItem('fisio_coletiva_data', JSON.stringify(patients));
        }

        function loadData() {
            const stored = localStorage.getItem('fisio_coletiva_data');
            if (stored) {
                try {
                    patients = JSON.parse(stored);
                } catch(e) {
                    patients = [...initialPatients];
                }
            } else {
                patients = [...initialPatients];
            }
        }

        function resetData() {
            patients = JSON.parse(JSON.stringify(initialPatients));
            selectedPatientId = patients[0].id;
            saveData();
            renderQueue();
            renderEHR();
            showToast('Dados de demonstração restaurados!', 'fa-rotate');
        }

        // Form Collapsible Toggle
        function toggleForm() {
            const form = document.getElementById('triage-form');
            const btn = document.getElementById('form-toggle-btn');
            const isHidden = form.classList.contains('hidden');
            
            if (isHidden) {
                form.classList.remove('hidden');
                btn.style.transform = 'rotate(180deg)';
            } else {
                form.classList.add('hidden');
                btn.style.transform = 'rotate(0deg)';
            }
        }

        // Add Patient
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('input-name').value.trim();
            const condition = document.getElementById('input-condition').value.trim();
            const priority = document.getElementById('input-priority').value;
            const pa = document.getElementById('input-pa').value.trim() || '120/80 mmHg';
            const fc = document.getElementById('input-fc').value.trim() || '75 bpm';
            const spo2 = document.getElementById('input-spo2').value.trim() || '98%';
            const eva = document.getElementById('input-eva').value;

            const now = new Date();
            const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            const newPatient = {
                id: 'p_' + Date.now(),
                nome: name,
                condicao: condition,
                prioridade: priority,
                status: 'Aguardando',
                sinaisVitais: { pa, fc, spo2, eva },
                historico: [
                    { data: timestamp, texto: `Triagem concluída. Ingressou na fila com prioridade ${priority}.` }
                ]
            };

            patients.unshift(newPatient);
            selectedPatientId = newPatient.id;
            saveData();
            
            // Reset form fields
            document.getElementById('triage-form').reset();
            toggleForm();
            
            renderQueue();
            renderEHR();
            showToast('Paciente adicionado à fila com sucesso!');
        }

        // Priority Weight for Sorting
        function getPriorityWeight(p) {
            if (p === 'Alta') return 3;
            if (p === 'Média') return 2;
            return 1;
        }

        // Status Weight for Sorting
        function getStatusWeight(s) {
            if (s === 'Em Atendimento') return 3;
            if (s === 'Aguardando') return 2;
            return 1;
        }

        function toggleSort() {
            sortByPriority = !sortByPriority;
            const btn = document.getElementById('sort-btn');
            if (sortByPriority) {
                btn.innerHTML = `<i class="fa-solid fa-arrow-down-wide-short text-teal-600"></i> <span>Prioridade</span>`;
            } else {
                btn.innerHTML = `<i class="fa-solid fa-list-ol text-teal-600"></i> <span>Ordem de Entrada</span>`;
            }
            renderQueue();
        }

        // Update Statistics Counters
        function updateStats() {
            document.getElementById('stat-total').innerText = patients.length;
            document.getElementById('stat-waiting').innerText = patients.filter(p => p.status === 'Aguardando').length;
            document.getElementById('stat-active').innerText = patients.filter(p => p.status === 'Em Atendimento').length;
            document.getElementById('stat-high-priority').innerText = patients.filter(p => p.prioridade === 'Alta' && p.status !== 'Concluído').length;
        }

        // Render Queue List
        function renderQueue() {
            updateStats();
            const queueContainer = document.getElementById('patient-queue-list');
            const statusFilter = document.getElementById('filter-status').value;

            let filtered = patients.filter(p => {
                if (statusFilter === 'ALL') return true;
                return p.status === statusFilter;
            });

            if (sortByPriority) {
                filtered.sort((a, b) => {
                    const statusDiff = getStatusWeight(b.status) - getStatusWeight(a.status);
                    if (statusDiff !== 0) return statusDiff;
                    return getPriorityWeight(b.prioridade) - getPriorityWeight(a.prioridade);
                });
            }

            if (filtered.length === 0) {
                queueContainer.innerHTML = `
                    <div class="bg-white p-8 rounded-2xl border border-slate-200/80 text-center text-slate-400">
                        <i class="fa-solid fa-folder-open text-3xl mb-2"></i>
                        <p class="text-sm">Nenhum paciente encontrado neste filtro.</p>
                    </div>
                `;
                return;
            }

            queueContainer.innerHTML = filtered.map(p => {
                const isSelected = p.id === selectedPatientId;
                
                // Priority Badge Styles
                let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                let dotStyle = 'bg-emerald-500';
                if (p.prioridade === 'Alta') {
                    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
                    dotStyle = 'bg-rose-500';
                } else if (p.prioridade === 'Média') {
                    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
                    dotStyle = 'bg-amber-500';
                }

                // Status Badge Styles
                let statusBadge = 'bg-slate-100 text-slate-600';
                if (p.status === 'Em Atendimento') statusBadge = 'bg-teal-100 text-teal-800 font-semibold';
                if (p.status === 'Concluído') statusBadge = 'bg-emerald-100 text-emerald-800';

                return `
                    <div onclick="selectPatient('${p.id}')" 
                         class="bg-white p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                             isSelected 
                             ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md bg-teal-50/10' 
                             : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                         }">
                        
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="w-2.5 h-2.5 rounded-full ${dotStyle}"></span>
                                <h3 class="font-bold text-slate-900 text-sm sm:text-base">${p.nome}</h3>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${badgeStyle}">
                                    ${p.prioridade}
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 flex items-center gap-1.5 pl-4">
                                <i class="fa-solid fa-stethoscope text-slate-400 text-[10px]"></i>
                                ${p.condicao}
                            </p>
                        </div>

                        <div class="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                            <span class="text-xs px-2.5 py-1 rounded-lg ${statusBadge}">
                                ${p.status}
                            </span>
                            
                            <!-- Quick Status Actions -->
                            <div class="flex items-center gap-1" onclick="event.stopPropagation()">
                                ${p.status === 'Aguardando' ? `
                                    <button onclick="changeStatus('${p.id}', 'Em Atendimento')" title="Iniciar Atendimento" class="p-1.5 bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white rounded-lg transition text-xs flex items-center gap-1 px-2.5 font-medium">
                                        <i class="fa-solid fa-play"></i> Iniciar
                                    </button>
                                ` : ''}

                                ${p.status === 'Em Atendimento' ? `
                                    <button onclick="changeStatus('${p.id}', 'Concluído')" title="Concluir Atendimento" class="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition text-xs flex items-center gap-1 px-2.5 font-medium">
                                        <i class="fa-solid fa-check"></i> Concluir
                                    </button>
                                ` : ''}

                                ${p.status === 'Concluído' ? `
                                    <button onclick="changeStatus('${p.id}', 'Aguardando')" title="Reiniciar/Mover para Fila" class="p-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition text-xs">
                                        <i class="fa-solid fa-rotate-left"></i>
                                    </button>
                                ` : ''}

                                <button onclick="deletePatient('${p.id}')" title="Excluir paciente" class="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition text-xs">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                `;
            }).join('');
        }

        // Select Patient for EHR
        function selectPatient(id) {
            selectedPatientId = id;
            renderQueue();
            renderEHR();
        }

        // Render Electronic Health Record
        function renderEHR() {
            const patient = patients.find(p => p.id === selectedPatientId);
            
            const nameEl = document.getElementById('ehr-patient-name');
            const condEl = document.getElementById('ehr-patient-condition');
            const priorityBadgeEl = document.getElementById('ehr-priority-badge');
            
            if (!patient) {
                nameEl.innerText = 'Nenhum Paciente Selecionado';
                condEl.innerText = 'Selecione um paciente na fila ao lado';
                priorityBadgeEl.innerHTML = '';
                document.getElementById('ehr-pa').value = '';
                document.getElementById('ehr-fc').value = '';
                document.getElementById('ehr-spo2').value = '';
                document.getElementById('ehr-eva').value = '';
                document.getElementById('ehr-history').innerHTML = '<p class="text-xs text-slate-400">Nenhum histórico disponível.</p>';
                return;
            }

            nameEl.innerText = patient.nome;
            condEl.innerText = patient.condicao;

            // Render Badge in Header
            let badgeStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            if (patient.prioridade === 'Alta') badgeStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
            if (patient.prioridade === 'Média') badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/30';

            priorityBadgeEl.innerHTML = `
                <span class="text-xs font-bold px-2.5 py-1 rounded-lg border ${badgeStyle}">
                    ${patient.prioridade}
                </span>
            `;

            // Fill Vital Signs Inputs
            document.getElementById('ehr-pa').value = patient.sinaisVitais.pa || '';
            document.getElementById('ehr-fc').value = patient.sinaisVitais.fc || '';
            document.getElementById('ehr-spo2').value = patient.sinaisVitais.spo2 || '';
            document.getElementById('ehr-eva').value = patient.sinaisVitais.eva || '';

            // Render History Timeline
            const historyContainer = document.getElementById('ehr-history');
            if (patient.historico && patient.historico.length > 0) {
                historyContainer.innerHTML = patient.historico.map(h => `
                    <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                        <div class="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                            <span class="font-semibold text-teal-700"><i class="fa-solid fa-user-doctor"></i> Estagiário / Monitor</span>
                            <span>${h.data}</span>
                        </div>
                        <p class="text-slate-700 leading-relaxed">${h.texto}</p>
                    </div>
                `).join('');
            } else {
                historyContainer.innerHTML = `<p class="text-xs text-slate-400">Sem registros anteriores.</p>`;
            }
        }

        // Live Vital Signs Update
        function updateCurrentVitals() {
            if (!selectedPatientId) return;
            const patient = patients.find(p => p.id === selectedPatientId);
            if (!patient) return;

            patient.sinaisVitais.pa = document.getElementById('ehr-pa').value;
            patient.sinaisVitais.fc = document.getElementById('ehr-fc').value;
            patient.sinaisVitais.spo2 = document.getElementById('ehr-spo2').value;
            patient.sinaisVitais.eva = document.getElementById('ehr-eva').value;

            saveData();
            showToast('Sinais vitais atualizados!');
        }

        // Save SOAP Evolution Note
        function saveEvolution() {
            if (!selectedPatientId) {
                showToast('Selecione um paciente para salvar a evolução.', 'fa-circle-exclamation');
                return;
            }

            const input = document.getElementById('ehr-notes-input');
            const text = input.value.trim();

            if (!text) {
                showToast('Escreva algum comentário antes de salvar.', 'fa-circle-exclamation');
                return;
            }

            const patient = patients.find(p => p.id === selectedPatientId);
            if (!patient) return;

            const now = new Date();
            const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            patient.historico.unshift({
                data: timestamp,
                texto: text
            });

            input.value = '';
            saveData();
            renderEHR();
            showToast('Evolução clínica salva no prontuário!');
        }

        // Change Patient Status
        function changeStatus(id, newStatus) {
            const patient = patients.find(p => p.id === id);
            if (!patient) return;

            patient.status = newStatus;

            const now = new Date();
            const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            patient.historico.unshift({
                data: timestamp,
                texto: `Status alterado para: ${newStatus}`
            });

            saveData();
            renderQueue();
            if (selectedPatientId === id) renderEHR();
            showToast(`Status de ${patient.nome} alterado para '${newStatus}'!`);
        }

        // Delete Patient
        function deletePatient(id) {
            patients = patients.filter(p => p.id !== id);
            if (selectedPatientId === id) {
                selectedPatientId = patients.length > 0 ? patients[0].id : null;
            }
            saveData();
            renderQueue();
            renderEHR();
            showToast('Paciente removido da fila.');
        }

        // UI Toast Notification helper
        function showToast(message, iconClass = 'fa-circle-check') {
            const toast = document.getElementById('toast');
            const msgEl = document.getElementById('toast-message');
            const iconEl = document.getElementById('toast-icon');

            msgEl.innerText = message;
            iconEl.className = `fa-solid ${iconClass} text-emerald-400 text-lg`;

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 2800);
        }
    </script>
</body>
</html>
