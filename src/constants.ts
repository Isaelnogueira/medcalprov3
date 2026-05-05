/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Medicamento {
  nome: string;
  calc: (peso: number) => string;
  pos: string;
  categoria: string;
  concentracaoMgMl?: number;
  unidade?: 'gotas' | 'mL';
  doseSugeridaMgKg?: number;
  doseTipo?: 'dose' | 'dia';
  idadeMinimaMeses?: number;
  reconstituicao?: {
    diluente: string;
    volumeDiluente: string;
    volumeFinal: string;
    concentracaoFinal?: string;
    estabilidadeTA?: string;
    estabilidadeRef?: string;
  };
}

export interface Protocolo {
  categoria: string;
  itens: {
    nome: string;
    dose: string;
    obs?: string;
  }[];
}

export const PROTOCOLOS: Protocolo[] = [
  {
    categoria: "Analgésicos / Antitérmicos",
    itens: [
      { nome: "Dipirona 500mg/ml", dose: "10-12 mg/kg", obs: "Padrão: 1 gota/kg. Máx 6/6h. > 3 meses/5kg." },
      { nome: "Paracetamol 200mg/ml", dose: "10-15 mg/kg", obs: "Min 4/4h. Máx 5 doses/24h." },
      { nome: "AAS (Ác. Acetilsalicílico)", dose: "10-15 mg/kg", obs: "Contraindicado em Dengue/Gripe (Síndrome de Reye)." },
    ]
  },
  {
    categoria: "Antieméticos",
    itens: [
      { nome: "Ondansetrona", dose: "0.15 mg/kg/dose", obs: "Máx: 8mg/dose. Via Oral ou EV." },
      { nome: "Bromoprida", dose: "0.5 a 1 mg/kg/dia", obs: "Dividido em 3 tomadas. 30min antes das refeições." },
      { nome: "Metoclopramida", dose: "0.1 mg/kg/dose", obs: "Evitar < 1 ano (risco de reações extrapiramidais)." },
      { nome: "Domperidona", dose: "0.25 mg/kg/dose", obs: "Máx 1 mg/kg/dia. 3x ao dia." },
    ]
  },
  {
    categoria: "Anti-histamínicos",
    itens: [
      { nome: "Loratadina", dose: "5mg (<30kg) / 10mg (>30kg)", obs: "Dose única diária. > 2 anos." },
      { nome: "Desloratadina", dose: "1.25mg (1-5a) / 2.5mg (6-11a)", obs: "Dose única diária. Xarope 0.5mg/ml." },
      { nome: "Fexofenadina", dose: "30mg (2-11a) / 60mg (>12a)", obs: "Pode ser 2x ao dia. Aguardar 2h para antiácidos." },
    ]
  },
  {
    categoria: "Antibióticos (Doses Padrão)",
    itens: [
      { nome: "Amoxicilina", dose: "40-50 mg/kg/dia", obs: "Dose dobrada (80-90) em OMA ou Pneumonia." },
      { nome: "Cefalexina", dose: "25-50 mg/kg/dia", obs: "De 6/6h. Infecções de pele ou trato urinário." },
      { nome: "Azitromicina", dose: "10 mg/kg/dia", obs: "Dose única diária por 3 a 5 dias." },
      { nome: "Ampicilina EV", dose: "100-200 mg/kg/dia", obs: "0-8 dias: 100mg/kg/dia; >30 dias: 200mg/kg/dia." },
    ]
  },
  {
    categoria: "Corticoides",
    itens: [
      { nome: "Prednisolona 3mg/ml", dose: "1 a 2 mg/kg/dia", obs: "Dose única ou 12/12h. Máx 60mg/dia." },
      { nome: "Dexametasona", dose: "0.15 a 0.6 mg/kg", obs: "Dose única (Crupe). Máx 10mg." },
      { nome: "Betametasona Gotas", dose: "1 gota por kg", obs: "Dose única diária." },
    ]
  }
];

export const CATEGORIAS = [
  "Analgésicos e Antitérmicos",
  "Anti-inflamatórios",
  "Expectorantes e Antitussígenos",
  "Anti-alérgicos",
  "Corticoides",
  "Anti-eméticos e Antiespasmódicos",
  "Constipação",
  "Antiparasitários",
  "Antibióticos",
  "Antibióticos Injetáveis (EV/IM)",
  "Nebulização (Inalatório)"
];

export const MEDICAMENTOS: Record<string, Medicamento> = {
  // Analgésicos
  "dip_500": { categoria: "Analgésicos e Antitérmicos", nome: "DIPIRONA 500MG/ML", unidade: 'gotas', concentracaoMgMl: 500, doseSugeridaMgKg: 15, doseTipo: 'dose', idadeMinimaMeses: 3, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 6/6h se dor ou febre." },
  "dip_50": { categoria: "Analgésicos e Antitérmicos", nome: "DIPIRONA 50MG/ML", unidade: 'mL', concentracaoMgMl: 50, doseSugeridaMgKg: 15, doseTipo: 'dose', idadeMinimaMeses: 3, calc: p => (p / 2).toFixed(1) + " mL", pos: "Via Oral (VO), até de 6/6h se dor ou febre." },
  "par_200": { categoria: "Analgésicos e Antitérmicos", nome: "PARACETAMOL 200MG/ML", unidade: 'gotas', concentracaoMgMl: 200, doseSugeridaMgKg: 12.5, doseTipo: 'dose', calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 6/6h se dor ou febre." },
  "par_100": { categoria: "Analgésicos e Antitérmicos", nome: "PARACETAMOL 100MG/ML", unidade: 'mL', concentracaoMgMl: 100, doseSugeridaMgKg: 12.5, doseTipo: 'dose', calc: p => (p / 2).toFixed(1) + " mL", pos: "Via Oral (VO), até de 6/6h se dor ou febre." },

  // Antieméticos
  "onda_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "ONDANSETRONA 4MG/ML (GOTAS)", unidade: 'gotas', concentracaoMgMl: 4, doseSugeridaMgKg: 0.15, doseTipo: 'dose', calc: p => Math.round((p * 0.15) / 0.2) + " gotas", pos: "Via Oral (VO), dose única ou a cada 8/8h. Máx 8mg/dose." },
  "onda_sol": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "ONDANSETRONA 2MG/ML (SOLUÇÃO)", unidade: 'mL', concentracaoMgMl: 2, doseSugeridaMgKg: 0.15, doseTipo: 'dose', calc: p => ((p * 0.15) / 2).toFixed(1) + " mL", pos: "Via Oral (VO), dose única ou a cada 8/8h. Máx 8mg/dose." },
  "brom_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "BROMOPRIDA 4MG/ML (GOTAS)", unidade: 'gotas', concentracaoMgMl: 4, calc: p => Math.round(p / 2) + " gotas", pos: "Via Oral (VO), de 8/8h. 30 min antes das refeições." },

  // Anti-inflamatórios
  "ibu_100": { categoria: "Anti-inflamatórios", nome: "IBUPROFENO 100MG/ML", unidade: 'gotas', concentracaoMgMl: 100, doseSugeridaMgKg: 10, idadeMinimaMeses: 6, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 6/6h ou 8/8h por 5 dias." },
  "ceto_gt": { categoria: "Anti-inflamatórios", nome: "CETOPROFENO 20MG/ML", unidade: 'gotas', concentracaoMgMl: 20, idadeMinimaMeses: 6, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), de 8/8h." },
  "ceto_xp": { categoria: "Anti-inflamatórios", nome: "CETOPROFENO XAROPE 1MG/ML", unidade: 'mL', concentracaoMgMl: 1, idadeMinimaMeses: 6, calc: p => (p / 2).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h." },
  "diclo_gt": { categoria: "Anti-inflamatórios", nome: "DICLOFENACO RESINATO 15MG/ML", unidade: 'gotas', concentracaoMgMl: 15, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), de 8/8h." },
  "nime_gt": { categoria: "Anti-inflamatórios", nome: "NIMESULIDA 50MG/ML", unidade: 'gotas', concentracaoMgMl: 50, idadeMinimaMeses: 144, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), de 12/12h (>12 anos)." },

  // Expectorantes / Antitussígenos
  "acebro_xp": { categoria: "Expectorantes e Antitussígenos", nome: "ACEBROFILINA 25MG/5ML", calc: p => (p / 5).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h." },
  "terb_guaif_xp": { categoria: "Expectorantes e Antitussígenos", nome: "TERBUTALINA + GUAIFENESINA XAROPE", calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h." },
  "cloper_gt": { categoria: "Expectorantes e Antitussígenos", nome: "CLOPERASTINA GOTAS 35,4MG/ML", calc: p => Math.round(p) + " a " + Math.round(p * 2) + " gotas", pos: "Via Oral (VO), de 8/8h." },
  "levodro_gt": { categoria: "Expectorantes e Antitussígenos", nome: "LEVODROPROPIZINA GOTAS 30MG/ML", calc: p => Math.round(p / 3) + " gotas", pos: "Via Oral (VO), de 8/8h." },

  // Anti-alérgicos
  "dexclor_xp": { categoria: "Anti-alérgicos", nome: "DEXCLOFENIRAMINA 2MG/ML", calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h por 5 dias." },
  "hidrox_xp": { categoria: "Anti-alérgicos", nome: "HIDROXIZINA 2MG/ML", calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h." },
  "lorat_sol": { categoria: "Anti-alérgicos", nome: "LORATADINA 1MG/ML", unidade: 'mL', concentracaoMgMl: 1, idadeMinimaMeses: 24, calc: p => (p < 30 ? "5 mL" : "10 mL"), pos: "Via Oral (VO), 1x ao dia. > 2 anos." },
  "deslorat_sol": { categoria: "Anti-alérgicos", nome: "DESLORATADINA 0,5MG/ML", unidade: 'mL', concentracaoMgMl: 0.5, idadeMinimaMeses: 6, calc: p => (p < 12 ? "2.5 mL" : "5 mL"), pos: "Via Oral (VO), 1x ao dia." },
  "fexo_sol": { categoria: "Anti-alérgicos", nome: "FEXOFENADINA 6MG/ML", unidade: 'mL', concentracaoMgMl: 6, calc: p => (p / 2).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h." },

  // Corticoides
  "pred_3": { categoria: "Corticoides", nome: "PREDNISOLONA 3MG/ML", calc: p => (p / 3).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h por 5 dias." },
  "pred_11": { categoria: "Corticoides", nome: "PREDNISOLONA 11MG/ML", calc: p => Math.round(p * 2) + " gotas", pos: "Via Oral (VO), 12/12h." },
  "dexa_elix": { categoria: "Corticoides", nome: "DEXAMETASONA ELIXIR 0,5MG/5ML", calc: p => (p / 3).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h ou 12/12h." },
  "beta_elix": { categoria: "Corticoides", nome: "BETAMETASONA ELIXIR 0,1MG/ML", calc: p => Math.round(p) + " mL", pos: "Via Oral (VO), 1x/dia." },

  // Anti-eméticos e Antiespasmódicos
  "bromo_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "BROMOPRIDA 4MG/ML", doseSugeridaMgKg: 0.5, doseTipo: 'dia', calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 8/8h se náuseas ou vômitos." },
  "meto_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "METOCLOPRAMIDA 4MG/ML", doseSugeridaMgKg: 0.1, doseTipo: 'dose', idadeMinimaMeses: 12, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 8/8h se náuseas ou vômitos." },
  "dompe_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "DOMPERIDONA 5MG/ML", doseSugeridaMgKg: 0.25, doseTipo: 'dose', idadeMinimaMeses: 12, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), de 8/8h se náuseas ou vômitos." },
  "dimen_piri_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "DIMENIDRINATO + PIRIDOXINA GOTAS", idadeMinimaMeses: 24, calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), de 6/6h." },
  "esco_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "ESCOPOLAMINA 10MG/ML", doseSugeridaMgKg: 0.2, doseTipo: 'dose', calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 6/6h." },
  "esco_dip_gt": { categoria: "Anti-eméticos e Antiespasmódicos", nome: "ESCOPOLAMINA + DIPIRONA", doseSugeridaMgKg: 0.2, doseTipo: 'dose', calc: p => Math.round(p) + " gotas", pos: "Via Oral (VO), até de 6/6h." },

  // Constipação
  "lactu_xp": { categoria: "Constipação", nome: "LACTULOSE XAROPE 667MG/ML", calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h até evacuação regular." },

  // Antiparasitários
  "nita_susp": { categoria: "Antiparasitários", nome: "NITAZOXANIDA 20MG/ML", calc: p => (p * 0.375).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h por 3 dias." },
  "metro_susp": { categoria: "Antiparasitários", nome: "METRONIDAZOL 200MG/5ML", calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h por 7 dias." },

  // Antibióticos
  "ampic_susp": { categoria: "Antibióticos", nome: "AMPICILINA 250MG/5ML", concentracaoMgMl: 50, doseSugeridaMgKg: 50, doseTipo: 'dose', calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 6/6h por 7-10 dias." },
  "cefal_susp": { categoria: "Antibióticos", nome: "CEFALEXINA 250MG/5ML", concentracaoMgMl: 50, doseSugeridaMgKg: 50, doseTipo: 'dia', calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 6/6h por 7-10 dias." },
  "azitro_susp": { categoria: "Antibióticos", nome: "AZITROMICINA 200MG/5ML", concentracaoMgMl: 40, doseSugeridaMgKg: 10, doseTipo: 'dia', calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), 1x/dia por 5-7 dias." },
  "eritro_susp": { categoria: "Antibióticos", nome: "ERITROMICINA 250MG/5ML", concentracaoMgMl: 50, doseSugeridaMgKg: 50, doseTipo: 'dia', calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 6/6h por 7-10 dias." },
  "amoxi_susp": { categoria: "Antibióticos", nome: "AMOXICILINA 250MG/5ML", concentracaoMgMl: 50, doseSugeridaMgKg: 50, doseTipo: 'dia', calc: p => (p / 3).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h por 7-10 dias." },
  "amoxi_clav_susp": { categoria: "Antibióticos", nome: "AMOXICILINA-CLAVULANATO 250+62,5MG/ML", concentracaoMgMl: 50, doseSugeridaMgKg: 50, doseTipo: 'dia', calc: p => (p / 3).toFixed(1) + " mL", pos: "Via Oral (VO), de 8/8h por 7-10 dias." },
  "cefal_ev": { 
    categoria: "Antibióticos Injetáveis (EV/IM)", 
    nome: "CEFALOTINA 1G (EV)", 
    unidade: 'mL', 
    concentracaoMgMl: 93, 
    doseSugeridaMgKg: 100, 
    doseTipo: 'dia', 
    calc: p => ((p * 100) / 4 / 93).toFixed(1) + " mL", 
    pos: "Via Endovenosa (EV), de 6/6h.",
    reconstituicao: {
      diluente: "AD",
      volumeDiluente: "10 mL",
      volumeFinal: "10,7 mL",
      concentracaoFinal: "93 mg/mL",
      estabilidadeTA: "12 horas",
      estabilidadeRef: "96 horas (4 dias)"
    }
  },
  "ceftri_ev": { 
    categoria: "Antibióticos Injetáveis (EV/IM)", 
    nome: "CEFTRIAXONA 1G (IV)", 
    unidade: 'mL', 
    concentracaoMgMl: 91, 
    doseSugeridaMgKg: 80, 
    doseTipo: 'dia', 
    calc: p => ((p * 80) / 91).toFixed(1) + " mL", 
    pos: "Via Endovenosa (EV), 1x/dia. (Dose máx p/ Meningite: 100mg/kg/dia)",
    reconstituicao: {
      diluente: "Agua Destilada (AD)",
      volumeDiluente: "10 mL",
      volumeFinal: "11 mL",
      concentracaoFinal: "91 mg/mL",
      estabilidadeTA: "6 horas",
      estabilidadeRef: "24 horas"
    }
  },
  "ceftri_im": { 
    categoria: "Antibióticos Injetáveis (EV/IM)", 
    nome: "CEFTRIAXONA 1G (IM)", 
    unidade: 'mL', 
    concentracaoMgMl: 238, 
    doseSugeridaMgKg: 80, 
    doseTipo: 'dia', 
    calc: p => ((p * 80) / 238).toFixed(1) + " mL", 
    pos: "Via Intramuscular (IM) profunda, 1x/dia.",
    reconstituicao: {
      diluente: "Lidocaína 1%",
      volumeDiluente: "3,5 mL",
      volumeFinal: "4,2 mL",
      concentracaoFinal: "238 mg/mL",
      estabilidadeTA: "6 horas",
      estabilidadeRef: "24 horas"
    }
  },
  "amic_ev": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "AMICACINA 250MG/ML (AMP 2ML)",
    unidade: 'mL',
    concentracaoMgMl: 250,
    doseSugeridaMgKg: 15,
    doseTipo: 'dia',
    calc: p => ((p * 15) / 250).toFixed(1) + " mL",
    pos: "Via EV ou IM, 1x/dia. Infundir em 30-60 min.",
    reconstituicao: {
      diluente: "Não necessita",
      volumeDiluente: "N/A",
      volumeFinal: "2 mL (ampola)",
      estabilidadeTA: "24 horas",
      estabilidadeRef: "N/A"
    }
  },
  "benza_600": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "BENZILPENICILINA BENZATINA 600K UI",
    unidade: 'mL',
    calc: p => "Ver posologia",
    pos: "Via Intramuscular (IM) profunda. Uso único.",
    reconstituicao: {
      diluente: "Agua para injeção",
      volumeDiluente: "3,6 mL",
      volumeFinal: "4 mL",
      estabilidadeTA: "Uso imediato",
      estabilidadeRef: "N/A"
    }
  },
  "peni_potassica_5m": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "BENZILPENICILINA POTÁSSICA 5M UI",
    unidade: 'mL',
    concentracaoMgMl: 416000,
    calc: p => "Ver posologia conforme UI/kg",
    pos: "Via Endovenosa (EV).",
    reconstituicao: {
      diluente: "Agua para injeção",
      volumeDiluente: "10 mL",
      volumeFinal: "12 mL",
      concentracaoFinal: "~416.000 UI/mL",
      estabilidadeTA: "N/A",
      estabilidadeRef: "24 horas"
    }
  },
  "sulfa_200": { categoria: "Antibióticos", nome: "SULFAMETOXAZOL-TRIMETOPRIM 200+40MG/5ML", concentracaoMgMl: 40, doseSugeridaMgKg: 20, doseTipo: 'dia', calc: p => (p / 2).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h por 5-7 dias." },
  "sulfa_400": { categoria: "Antibióticos", nome: "SULFAMETOXAZOL-TRIMETOPRIM 400+80MG/5ML", concentracaoMgMl: 80, doseSugeridaMgKg: 20, doseTipo: 'dia', calc: p => (p / 4).toFixed(1) + " mL", pos: "Via Oral (VO), de 12/12h por 5-7 dias." },

  // Antibióticos Injetáveis
  "ampic_ev": { 
    categoria: "Antibióticos Injetáveis (EV/IM)", 
    nome: "AMPICILINA EV (1G)", 
    unidade: 'mL',
    concentracaoMgMl: 294, 
    doseSugeridaMgKg: 50, 
    doseTipo: 'dose',
    calc: p => ((p * 50) / 294).toFixed(1) + " mL", 
    pos: "Via Endovenosa (EV). Intervalos: 0-8 dias (100mg/kg/dia: 12/12h); >30 dias (200mg/kg/dia: 6/6h).",
    reconstituicao: {
      diluente: "Água p/ injeção",
      volumeDiluente: "3 mL",
      volumeFinal: "3,4 mL",
      concentracaoFinal: "294 mg/mL",
      estabilidadeTA: "Uso imediato",
      estabilidadeRef: "N/A"
    }
  },
  "mero_ev": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "MEROPENEM 1G (EV)",
    unidade: 'mL',
    concentracaoMgMl: 50,
    doseSugeridaMgKg: 20,
    doseTipo: 'dose',
    calc: p => ((p * 20) / 50).toFixed(1) + " mL",
    pos: "Via Endovenosa (EV), de 8/8h.",
    reconstituicao: {
      diluente: "AD",
      volumeDiluente: "20 mL",
      volumeFinal: "20 mL",
      concentracaoFinal: "50 mg/mL",
      estabilidadeTA: "3 horas",
      estabilidadeRef: "16 horas"
    }
  },
  "oxa_ev": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "OXACILINA 500MG (EV)",
    unidade: 'mL',
    concentracaoMgMl: 93,
    doseSugeridaMgKg: 50,
    doseTipo: 'dose',
    calc: p => ((p * 50) / 93).toFixed(1) + " mL",
    pos: "Via Endovenosa (EV), de 6/6h.",
    reconstituicao: {
      diluente: "AD ou SF 0,9%",
      volumeDiluente: "5 mL",
      volumeFinal: "5,37 mL",
      concentracaoFinal: "93,1 mg/mL",
      estabilidadeTA: "6 horas",
      estabilidadeRef: "6 horas"
    }
  },
  "vanco_ev": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "VANCOMICINA 500MG (EV)",
    unidade: 'mL',
    concentracaoMgMl: 49,
    doseSugeridaMgKg: 15,
    doseTipo: 'dose',
    calc: p => ((p * 15) / 49).toFixed(1) + " mL",
    pos: "Via Endovenosa (EV), de 6/6h. Administrar em pelo menos 60 min.",
    reconstituicao: {
      diluente: "AD",
      volumeDiluente: "10 mL",
      volumeFinal: "10,2 mL",
      concentracaoFinal: "49 mg/mL",
      estabilidadeTA: "24 horas",
      estabilidadeRef: "14 dias"
    }
  },
  "benza_1200": {
    categoria: "Antibióticos Injetáveis (EV/IM)",
    nome: "BENZILPENICILINA BENZATINA 1.2M UI",
    unidade: 'mL',
    calc: p => "Ver posologia",
    pos: "Via Intramuscular (IM) profunda. Uso único.",
    reconstituicao: {
      diluente: "Agua para injeção",
      volumeDiluente: "3,2 mL",
      volumeFinal: "4 mL",
      estabilidadeTA: "Uso imediato",
      estabilidadeRef: "N/A"
    }
  },

  // Nebulização
  "fenoterol_nbz": { categoria: "Nebulização (Inalatório)", nome: "FENOTEROL (BEROTEC) 5MG/ML", calc: p => Math.round(p / 3) + " gotas", pos: "Via NBZ, diluir em 5mL de SF 0,9%, inalar de 6/6h por 5 dias." },
  "salbutamol_nbz": { categoria: "Nebulização (Inalatório)", nome: "SALBUTAMOL 5MG/ML", calc: p => Math.round((p / 5) * 2) + " gotas", pos: "Via NBZ, diluir em 5mL de SF 0,9%, inalar de 6/6h por 5 dias." }
};
