/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ClipboardList, Weight, Search, Stethoscope, Droplets, Info, AlertCircle, Share2, Printer, Clock, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { MEDICAMENTOS, CATEGORIAS, PROTOCOLOS } from './constants';

function parseIdadeParaMeses(idadeStr: string): number | null {
  if (!idadeStr) return null;
  const normalized = idadeStr.toLowerCase().trim();
  
  // Extract all numbers and units
  const regex = /(\d+)\s*(mes|mês|ano|a)/g;
  let totalMonths = 0;
  let match;
  let found = false;

  while ((match = regex.exec(normalized)) !== null) {
    found = true;
    const num = parseInt(match[1]);
    const unit = match[2];
    if (unit.startsWith('m')) {
      totalMonths += num;
    } else {
      totalMonths += num * 12;
    }
  }

  if (found) return totalMonths;

  // Fallback: If just a number is provided
  const justNumbers = normalized.match(/^(\d+)$/);
  if (justNumbers) {
    const num = parseInt(justNumbers[1]);
    // If number is small (e.g. < 24) and no unit, we can't be sure, but usually years in dosage apps
    // However, the placeholder says "3 meses ou 5 anos". 
    // Let's assume years if no unit.
    return num * 12;
  }

  return null;
}

export default function App() {
  const [peso, setPeso] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [dosePorQuilo, setDosePorQuilo] = useState<string>('');
  const [medicamentoId, setMedicamentoId] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [refSearch, setRefSearch] = useState('');

  const filteredProtocolos = useMemo(() => {
    if (!refSearch) return PROTOCOLOS;
    const search = refSearch.toLowerCase();
    return PROTOCOLOS.map(prot => ({
      ...prot,
      itens: prot.itens.filter(item => 
        item.nome.toLowerCase().includes(search) || 
        prot.categoria.toLowerCase().includes(search)
      )
    })).filter(prot => prot.itens.length > 0);
  }, [refSearch]);

  const selectedMedicamento = MEDICAMENTOS[medicamentoId];

  const handleCalcular = () => {
    if (!peso || isNaN(parseFloat(peso)) || parseFloat(peso) <= 0) {
      alert('Por favor, insira um peso válido em kg.');
      return;
    }
    if (!medicamentoId) {
      alert('Por favor, selecione um medicamento.');
      return;
    }
    setShowResult(true);
  };

  const dosage = useMemo(() => {
    if (showResult && selectedMedicamento && peso) {
      const p = parseFloat(peso);
      
      if (dosePorQuilo && selectedMedicamento.concentracaoMgMl) {
        const d = parseFloat(dosePorQuilo);
        const totalMg = p * d;
        const volume = totalMg / selectedMedicamento.concentracaoMgMl;
        
        if (selectedMedicamento.unidade === 'gotas') {
          return Math.round(volume * 20) + " gotas";
        } else {
          return volume.toFixed(1) + " mL";
        }
      }
      
      return selectedMedicamento.calc(p);
    }
    return '';
  }, [showResult, selectedMedicamento, peso, dosePorQuilo]);

  const explicitDose = useMemo(() => {
    if (!showResult || !selectedMedicamento) return null;
    const typeLabel = selectedMedicamento.doseTipo === 'dia' ? '/dia' : '/dose';
    if (dosePorQuilo) return dosePorQuilo + " mg/kg" + typeLabel;
    if (selectedMedicamento.doseSugeridaMgKg) return selectedMedicamento.doseSugeridaMgKg + " mg/kg" + typeLabel;
    return null;
  }, [showResult, selectedMedicamento, dosePorQuilo]);

  const ageWarning = useMemo(() => {
    if (!showResult || !selectedMedicamento || !idade) return null;
    const totalMonths = parseIdadeParaMeses(idade);
    if (totalMonths !== null && selectedMedicamento.idadeMinimaMeses && totalMonths < selectedMedicamento.idadeMinimaMeses) {
      const minIdadeStr = selectedMedicamento.idadeMinimaMeses >= 12 
        ? `${selectedMedicamento.idadeMinimaMeses / 12} ano(s)` 
        : `${selectedMedicamento.idadeMinimaMeses} meses`;
      return `Atenção: Uso não recomendado para pacientes menores de ${minIdadeStr}.`;
    }
    return null;
  }, [showResult, selectedMedicamento, idade]);

  return (
    <div className="min-h-screen bg-[#e0f2f1] font-sans text-slate-800 relative overflow-hidden flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-8 justify-center items-stretch">
      {/* Mesh Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Left Panel: Inputs */}
      <div className="w-full md:w-[420px] shrink-0 flex flex-col gap-6 relative z-10">
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-900/10">
            <Stethoscope className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PediCalc Pro</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Assistente de Prescrição</p>
          </div>
        </header>

        <section className="flex-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 md:p-8 shadow-xl flex flex-col">
          <div className="space-y-8 flex-1">
            {/* Medicamento Select */}
            <div className="space-y-3 flex-1 flex flex-col">
              <label className="block text-[10px] font-bold text-teal-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Search className="w-3 h-3" /> Fármaco
              </label>
              <div className="relative flex-1">
                <select
                  value={medicamentoId}
                  onChange={(e) => {
                    setMedicamentoId(e.target.value);
                    setShowResult(false);
                  }}
                  className="w-full bg-white/60 border border-teal-100/50 rounded-2xl px-4 py-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/10 appearance-none cursor-pointer h-full min-h-[60px]"
                >
                  <option value="">Selecione um fármaco...</option>
                  {CATEGORIAS.map(categoria => (
                    <optgroup key={categoria} label={categoria}>
                      {Object.entries(MEDICAMENTOS)
                        .filter(([_, m]) => m.categoria === categoria)
                        .map(([id, m]) => (
                          <option key={id} value={id}>{m.nome}</option>
                        ))
                      }
                    </optgroup>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Dose Personalizada */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-teal-800 uppercase tracking-widest ml-1 flex items-center justify-between">
                <span className="flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Dose Customizada (Opcional)</span>
                {selectedMedicamento?.doseSugeridaMgKg && (
                  <button 
                    onClick={() => setDosePorQuilo(selectedMedicamento.doseSugeridaMgKg!.toString())}
                    className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-2 py-0.5 rounded transition-colors text-[9px] normal-case"
                  >
                    Clique para usar padrão
                  </button>
                )}
              </label>
              <div className="relative group">
                <input
                  type="number"
                  placeholder="Ex: 15"
                  value={dosePorQuilo}
                  onChange={(e) => {
                    setDosePorQuilo(e.target.value);
                    setShowResult(false);
                  }}
                  className="w-full bg-white/60 border border-teal-100/50 rounded-2xl px-5 py-4 text-xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-200"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">mg/kg</span>
              </div>
              {selectedMedicamento?.doseSugeridaMgKg && (
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                  <Info className="w-4 h-4 text-teal-600 shrink-0" />
                  <p className="text-[10px] text-teal-800 font-bold leading-tight">
                    Sugestão de bula: <span className="text-teal-600">{selectedMedicamento.doseSugeridaMgKg} mg/kg/{selectedMedicamento.doseTipo || 'dose'}</span>
                  </p>
                </div>
              )}
              <p className="text-[9px] text-slate-400 ml-1 italic font-medium">*Se em branco, será feito o cálculo padrão (gotas/kg ou ml/kg).</p>
            </div>

            {/* Idade Input */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-teal-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Idade (Anos ou Meses)
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ex: 3 meses ou 5 anos"
                  value={idade}
                  onChange={(e) => {
                    setIdade(e.target.value);
                    setShowResult(false);
                  }}
                  className="w-full bg-white/60 border border-teal-100/50 rounded-2xl px-5 py-4 text-xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-200"
                />
              </div>
            </div>

            {/* Peso Input */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-teal-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Weight className="w-3 h-3" /> Paciente
              </label>
              <div className="relative group">
                <input
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={peso}
                  onChange={(e) => {
                    setPeso(e.target.value);
                    setShowResult(false);
                  }}
                  className="w-full bg-white/60 border border-teal-100/50 rounded-2xl px-5 py-4 text-3xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-200"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">kg</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleCalcular}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-teal-600/20 active:scale-95 transition-all text-lg flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Gerar Prescrição
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 px-4 leading-snug">
              Cálculos baseados em protocolos pediátricos padrão. <br/> Sempre verifique a bula e a condição clínica.
            </p>
          </div>
        </section>

        {/* Reference Protocols Section */}
        <section className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] overflow-hidden transition-all shadow-lg flex flex-col">
          <button 
            onClick={() => setShowRef(!showRef)}
            className="w-full px-6 py-4 flex items-center justify-between text-teal-800 hover:bg-white/20 transition-colors shrink-0"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-widest">Referência Pediátrica</span>
            </div>
            {showRef ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <AnimatePresence>
            {showRef && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white/30 flex flex-col max-h-[600px]"
              >
                <div className="px-6 pb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Buscar no guia (ex: dipirona)..."
                      value={refSearch}
                      onChange={(e) => setRefSearch(e.target.value)}
                      className="w-full bg-white/50 border border-teal-100/50 rounded-xl pl-8 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                  {filteredProtocolos.map((prot) => (
                    <div key={prot.categoria} className="space-y-2">
                      <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2 sticky top-0 bg-white/30 backdrop-blur-md py-1">{prot.categoria}</h4>
                      <div className="grid gap-2">
                        {prot.itens.map(item => (
                          <div key={item.nome} className="bg-white/50 p-3 rounded-xl border border-teal-50 flex justify-between items-center text-xs group hover:bg-white transition-colors">
                            <div className="flex-1 pr-2">
                              <p className="font-bold text-slate-800">{item.nome}</p>
                              <p className="text-slate-400 text-[10px] leading-tight">{item.obs}</p>
                            </div>
                            <span className="bg-teal-100 text-teal-700 font-black px-2 py-1 rounded-lg shrink-0 whitespace-nowrap">
                              {item.dose}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredProtocolos.length === 0 && (
                    <p className="text-center text-xs text-slate-400 py-4 italic">Nenhum resultado encontrado.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Right Panel: Results */}
      <div className="flex-1 flex flex-col relative z-10 max-w-2xl">
        <AnimatePresence mode="wait">
          {!showResult || !selectedMedicamento ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-teal-900/5 backdrop-blur-sm border-2 border-dashed border-teal-200/50 rounded-[32px] flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Info className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-2 tracking-tight">Aguardando Dados</h3>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                Insira o peso do paciente e selecione o medicamento para visualizar a posologia recomendada e gerar o receituário.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6 h-full"
            >
              <div className="flex-1 bg-white backdrop-blur-2xl border border-white rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Decorative watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
                  <Stethoscope size={300} />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-10">
                    <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-teal-100/50">
                      Receituário Digital
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Data: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2 underline decoration-teal-200 decoration-8 underline-offset-4 leading-tight">
                      {selectedMedicamento.nome}
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">Apresentação: 1 Unidade / Frasco</p>
                  </div>

                  <div className="space-y-10 flex-1">
                    {ageWarning && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 rounded-[20px] p-4 flex items-center gap-3"
                      >
                        <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                        <p className="text-xs font-bold text-red-800 leading-tight">
                          {ageWarning}
                        </p>
                      </motion.div>
                    )}

                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 flex-col">
                        <span className="text-teal-600 font-black text-lg leading-none">
                          {selectedMedicamento.categoria.includes('Injetáveis') ? 'EV/IM' : 'VO'}
                        </span>
                        <span className="text-[8px] text-teal-400 font-bold">VIA</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-teal-800 uppercase tracking-widest mb-3 opacity-70 flex items-center justify-between">
                          <span>Dose e Via</span>
                        </p>
                        <p className="text-2xl font-bold text-slate-800 leading-tight">
                          Dar / Fazer <span className="text-teal-600 bg-teal-50 px-2 rounded-lg">{dosage}</span>
                        </p>
                        {explicitDose && (
                          <p className="text-[10px] text-teal-600 mt-2 font-medium bg-teal-50/50 p-2 rounded-lg border border-teal-100/50 italic">
                            Cálculo baseado na dose de <strong>{explicitDose}</strong>.
                          </p>
                        )}
                      </div>
                    </div>

                    {selectedMedicamento.reconstituicao && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-blue-50/50 border border-blue-100 rounded-[24px] p-5 space-y-4"
                      >
                        <div className="flex items-center gap-2 text-blue-800 font-bold text-[10px] uppercase tracking-widest brightness-75">
                          <Droplets className="w-4 h-4" /> Instruções de Reconstituição
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-[9px] text-blue-400 font-bold tracking-tight uppercase">Diluente</p>
                            <p className="text-xs font-bold text-slate-700">{selectedMedicamento.reconstituicao.diluente} ({selectedMedicamento.reconstituicao.volumeDiluente})</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] text-blue-400 font-bold tracking-tight uppercase">Volume Final</p>
                            <p className="text-xs font-bold text-slate-700">{selectedMedicamento.reconstituicao.volumeFinal} {selectedMedicamento.reconstituicao.concentracaoFinal && `(~${selectedMedicamento.reconstituicao.concentracaoFinal})`}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] text-blue-400 font-bold tracking-tight uppercase">Ambiente (15-30°C)</p>
                            <p className="text-xs font-bold text-slate-700">{selectedMedicamento.reconstituicao.estabilidadeTA}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] text-blue-400 font-bold tracking-tight uppercase">Geladeira (2-8°C)</p>
                            <p className="text-xs font-bold text-slate-700">{selectedMedicamento.reconstituicao.estabilidadeRef}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                        <Clock className="h-7 w-7 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-orange-800 uppercase tracking-widest mb-3 opacity-70">Posologia Sugerida</p>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                          {selectedMedicamento.pos}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-red-900">Isenção de Responsabilidade</p>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          Este cálculo é meramente informativo. Não substitui o julgamento clínico. Certifique-se de validar as doses com as diretrizes atualizadas do Ministério da Saúde.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 mx-[-40px] mb-[-40px] px-10 py-4 flex justify-between items-center text-slate-400 text-[10px] font-mono mt-auto relative z-20">
                  <span className="uppercase tracking-widest">Paciente: {idade || 'Não Informado'}</span>
                  <span className="bg-slate-800 px-2 py-1 rounded">Peso: {peso} kg</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-white/80 backdrop-blur-md border border-white text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-sm active:scale-95"
                >
                  <Printer className="h-5 w-5" />
                  Imprimir
                </button>
                <button className="flex-1 bg-white/80 backdrop-blur-md border border-white text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-sm active:scale-95">
                  <Share2 className="h-5 w-5" />
                  Compartilhar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
