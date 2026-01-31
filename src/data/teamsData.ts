export interface MatchResult {
    opponent: string;
    score: string;
    date: string;
    competition?: string;
}

export interface QualifierStats {
    summary: string;
    matches: number | string;
    won: number | string;
    drawn: number | string;
    lost: number | string;
    recent_matches?: MatchResult[];
}

export interface TeamData {
    name: string;
    group: string;
    wc_participations: number | string;
    qualifiers: QualifierStats;
    friendlies: MatchResult[];
}

export const teamsData: Record<string, TeamData> = {
    // GRUPO A
    'mx': {
        name: 'México',
        group: 'A',
        wc_participations: 18,
        qualifiers: {
            summary: 'País-sede. Classificado automaticamente. Campeão da CONCACAF Nations League 2025.',
            matches: '-', won: '-', drawn: '-', lost: '-',
            recent_matches: [
                { opponent: 'Honduras', score: '2 - 0', date: '18/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Honduras', score: '1 - 2', date: '14/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Equador', score: '0 - 0', date: '30/06/2024', competition: 'Copa América' },
                { opponent: 'Venezuela', score: '0 - 1', date: '26/06/2024', competition: 'Copa América' },
                { opponent: 'Jamaica', score: '1 - 0', date: '22/06/2024', competition: 'Copa América' },
                { opponent: 'EUA', score: '0 - 2', date: '24/03/2024', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Panamá', score: '3 - 0', date: '21/03/2024', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Honduras', score: '2 - 0', date: '21/11/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Honduras', score: '0 - 2', date: '17/11/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Alemanha', score: '2 - 2', date: '17/10/2023', competition: 'Amistoso' },
                { opponent: 'Gana', score: '2 - 0', date: '14/10/2023', competition: 'Amistoso' },
                { opponent: 'Uzbequistão', score: '3 - 3', date: '12/09/2023', competition: 'Amistoso' },
                { opponent: 'Austrália', score: '2 - 2', date: '09/09/2023', competition: 'Amistoso' }
            ]
        },
        friendlies: [
            { opponent: 'EUA', score: '2 - 0', date: '15/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Canadá', score: '0 - 0', date: '10/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Nova Zelândia', score: '3 - 0', date: '07/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Brasil', score: '2 - 3', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Uruguai', score: '0 - 4', date: '05/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Bolívia', score: '1 - 0', date: '31/05/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Colômbia', score: '2 - 3', date: '16/12/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'za': {
        name: 'África do Sul',
        group: 'A',
        wc_participations: 4,
        qualifiers: {
            summary: 'Vencedor do Grupo C (CAF). Retorno histórico à Copa após 16 anos.',
            matches: 10, won: 5, drawn: 3, lost: 2,
            recent_matches: [
                { opponent: 'Ruanda', score: '3 - 0', date: '14/10/2025' },
                { opponent: 'Zimbabwe', score: '0 - 0', date: '10/10/2025' },
                { opponent: 'Nigéria', score: '1 - 1', date: '09/09/2025' },
                { opponent: 'Lesoto', score: '3 - 0', date: '05/09/2025' },
                { opponent: 'Benin', score: '1 - 2', date: '25/03/2025' },
                { opponent: 'Lesoto', score: '1 - 1', date: '21/03/2025' },
                { opponent: 'Zimbabwe', score: '3 - 1', date: '11/06/2024' },
                { opponent: 'Nigéria', score: '1 - 1', date: '07/06/2024' },
                { opponent: 'Ruanda', score: '0 - 2', date: '21/11/2023' },
                { opponent: 'Benin', score: '2 - 1', date: '18/11/2023' }
            ]
        },
        friendlies: [
            { opponent: 'Ghana A\'', score: '1 - 0', date: '16/12/2025' },
            { opponent: 'Zâmbia', score: '3 - 1', date: '15/11/2025' }
        ]
    },
    'kr': {
        name: 'Coreia do Sul',
        group: 'A',
        wc_participations: 12,
        qualifiers: {
            summary: 'Invicto nas Eliminatórias Asiáticas (AFC). 1º Lugar no Grupo B (3ª Fase).',
            matches: 16, won: 12, drawn: 4, lost: 0,
            recent_matches: [
                { opponent: 'Sudão do Sul', score: '3 - 0', date: '19/11/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Uganda', score: '2 - 0', date: '15/11/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Congo', score: '1 - 1', date: '15/10/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Congo', score: '5 - 0', date: '11/10/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Sudão do Sul', score: '3 - 2', date: '10/09/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Uganda', score: '2 - 2', date: '06/09/2024', competition: 'Qualificações AFCON' },
                { opponent: 'Zimbábue', score: '3 - 1', date: '11/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Nigéria', score: '1 - 1', date: '07/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Rep. Democrática do Congo', score: '0 - 0', date: '10/02/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Nigéria', score: '1 - 1', date: '07/02/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Cabo Verde', score: '0 - 0', date: '03/02/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Marrocos', score: '2 - 0', date: '30/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Tunísia', score: '0 - 0', date: '24/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Namíbia', score: '4 - 0', date: '21/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Mali', score: '0 - 2', date: '16/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Ruanda', score: '0 - 2', date: '21/11/2023', competition: 'Eliminatórias da Copa' },
                { opponent: 'Benim', score: '2 - 1', date: '18/11/2023', competition: 'Eliminatórias da Copa' }
            ]
        },
        friendlies: [
            { opponent: 'Argélia', score: '3 - 3', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Andorra', score: '1 - 1', date: '21/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Lesoto', score: '0 - 0', date: '10/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Costa do Marfim', score: '1 - 1', date: '17/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Suazilândia', score: '0 - 0', date: '13/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Rep. Democrática do Congo', score: '1 - 0', date: '12/09/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Namíbia', score: '0 - 0', date: '09/09/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'un_a': {
        name: 'Vencedor Play-off D',
        group: 'A',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },

    // GRUPO B
    'ca': {
        name: 'Canadá',
        group: 'B',
        wc_participations: 4,
        qualifiers: {
            summary: 'País-sede. Classificado automaticamente. 4º Lugar na Copa América 2024. Bronze na Nations League 2024-25.',
            matches: '-', won: '-', drawn: '-', lost: '-',
            recent_matches: [
                { opponent: 'Suriname', score: '3 - 0', date: '19/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Suriname', score: '1 - 0', date: '15/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Uruguai', score: '2 - 2', date: '13/07/2024', competition: 'Copa América' },
                { opponent: 'Argentina', score: '0 - 2', date: '09/07/2024', competition: 'Copa América' },
                { opponent: 'Venezuela', score: '1 - 1', date: '05/07/2024', competition: 'Copa América' },
                { opponent: 'Chile', score: '0 - 0', date: '29/06/2024', competition: 'Copa América' },
                { opponent: 'Peru', score: '1 - 0', date: '25/06/2024', competition: 'Copa América' },
                { opponent: 'Argentina', score: '0 - 2', date: '20/06/2024', competition: 'Copa América' },
                { opponent: 'Trinidad e Tobago', score: '2 - 0', date: '23/03/2024', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Jamaica', score: '2 - 3', date: '21/11/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Jamaica', score: '2 - 1', date: '18/11/2023', competition: 'Liga das Nações CONCACAF' }
            ]
        },
        friendlies: [
            { opponent: 'Panamá', score: '2 - 1', date: '15/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '0 - 0', date: '10/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'EUA', score: '2 - 1', date: '07/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'França', score: '0 - 0', date: '09/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Holanda', score: '0 - 4', date: '06/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Japão', score: '1 - 4', date: '13/10/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'un_b': {
        name: 'Vencedor Play-off A',
        group: 'B',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },
    'qa': {
        name: 'Catar',
        group: 'B',
        wc_participations: 2,
        qualifiers: {
            summary: 'Classificado via Eliminatórias da Ásia (4ª Fase). Vaga garantida com vitória sobre EAU.',
            matches: 16, won: 10, drawn: 3, lost: 3,
            recent_matches: [
                { opponent: 'Emirados Árabes', score: '0 - 5', date: '19/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Uzbequistão', score: '3 - 2', date: '14/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Irã', score: '1 - 4', date: '15/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Quirguistão', score: '3 - 1', date: '10/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Coreia do Norte', score: '2 - 2', date: '10/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Emirados Árabes', score: '1 - 3', date: '05/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Índia', score: '2 - 1', date: '11/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Afeganistão', score: '0 - 0', date: '06/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Kuwait', score: '2 - 1', date: '26/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Kuwait', score: '3 - 0', date: '21/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Jordânia', score: '3 - 1', date: '10/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Irã', score: '3 - 2', date: '07/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Uzbequistão', score: '1 - 1', date: '03/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Palestina', score: '2 - 1', date: '29/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'China', score: '1 - 0', date: '22/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Tajiquistão', score: '1 - 0', date: '17/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Líbano', score: '3 - 0', date: '12/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Índia', score: '3 - 0', date: '21/11/2023', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Afeganistão', score: '8 - 1', date: '16/11/2023', competition: 'Eliminatórias da Ásia' }
            ]
        },
        friendlies: [
            { opponent: 'Jordânia', score: '1 - 2', date: '05/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Camboja', score: '3 - 0', date: '31/12/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Iraque', score: '0 - 0', date: '13/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Rússia', score: '1 - 1', date: '12/09/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Quênia', score: '1 - 2', date: '07/09/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'ch': {
        name: 'Suíça',
        group: 'B',
        wc_participations: 13,
        qualifiers: {
            summary: 'Classificado UEFA. Quartas de final na Euro 2024. Rebaixada na Nations League 2024/25.',
            matches: 10, won: 6, drawn: 3, lost: 1,
            recent_matches: [
                { opponent: 'Bélgica', score: '1 - 1', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'País de Gales', score: '2 - 0', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bélgica', score: '0 - 1', date: '12/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'País de Gales', score: '3 - 1', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Gibraltar', score: '5 - 0', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Armênia', score: '2 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Espanha', score: '2 - 3', date: '18/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Sérvia', score: '1 - 1', date: '15/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Dinamarca', score: '2 - 2', date: '15/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Sérvia', score: '0 - 2', date: '12/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Espanha', score: '1 - 4', date: '08/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Dinamarca', score: '0 - 2', date: '05/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Inglaterra', score: '1 - 1', date: '06/07/2024', competition: 'Eurocopa' },
                { opponent: 'Itália', score: '2 - 0', date: '29/06/2024', competition: 'Eurocopa' },
                { opponent: 'Alemanha', score: '1 - 1', date: '23/06/2024', competition: 'Eurocopa' },
                { opponent: 'Escócia', score: '1 - 1', date: '19/06/2024', competition: 'Eurocopa' },
                { opponent: 'Hungria', score: '3 - 1', date: '15/06/2024', competition: 'Eurocopa' },
                { opponent: 'Romênia', score: '0 - 1', date: '21/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Kosovo', score: '1 - 1', date: '18/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Israel', score: '1 - 1', date: '15/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Belarus', score: '3 - 3', date: '15/10/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Gibraltar', score: '4 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Armênia', score: '2 - 1', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Áustria', score: '1 - 1', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Estônia', score: '4 - 0', date: '04/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Irlanda', score: '1 - 0', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Dinamarca', score: '0 - 0', date: '23/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    // GRUPO C
    'br': {
        name: 'Brasil',
        group: 'C',
        wc_participations: 23,
        qualifiers: {
            summary: 'Classificado CONMEBOL. Única seleção em todas as copas. 6º Lugar nas Eliminatórias. Quartas de Final na Copa América 2024.',
            matches: 18, won: 8, drawn: 4, lost: 6,
            recent_matches: [
                { opponent: 'Bolívia', score: '0 - 1', date: '09/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Chile', score: '3 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Paraguai', score: '1 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Equador', score: '0 - 0', date: '05/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Argentina', score: '1 - 4', date: '25/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Colômbia', score: '2 - 1', date: '20/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Uruguai', score: '1 - 1', date: '19/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Venezuela', score: '1 - 1', date: '14/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Peru', score: '4 - 0', date: '15/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Chile', score: '2 - 1', date: '10/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Paraguai', score: '0 - 1', date: '10/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Equador', score: '1 - 0', date: '06/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Uruguai', score: '0 - 0', date: '06/07/2024', competition: 'Copa América' },
                { opponent: 'Colômbia', score: '1 - 1', date: '02/07/2024', competition: 'Copa América' },
                { opponent: 'Paraguai', score: '4 - 1', date: '28/06/2024', competition: 'Copa América' },
                { opponent: 'Costa Rica', score: '0 - 0', date: '24/06/2024', competition: 'Copa América' }
            ]
        },
        friendlies: [
            { opponent: 'Tunísia', score: '1 - 1', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Senegal', score: '2 - 0', date: '15/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Japão', score: '2 - 3', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Coreia do Sul', score: '5 - 0', date: '10/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'EUA', score: '1 - 1', date: '12/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '3 - 2', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Espanha', score: '3 - 3', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Inglaterra', score: '1 - 0', date: '23/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'ma': {
        name: 'Marrocos',
        group: 'C',
        wc_participations: 7,
        qualifiers: {
            summary: 'Semifinalista em 2022. Classificado CAF. Desempenho sólido na Copa das Nações da África.',
            matches: 6, won: 6, drawn: 0, lost: 0,
            recent_matches: [
                { opponent: 'Senegal', score: '0 - 1', date: '18/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Nigéria', score: '0 - 0', date: '14/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Camarões', score: '2 - 0', date: '09/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Tanzania', score: '1 - 0', date: '04/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Zâmbia', score: '3 - 0', date: '29/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Mali', score: '1 - 1', date: '26/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Comoros', score: '2 - 0', date: '21/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Congo', score: '1 - 0', date: '14/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Zâmbia', score: '2 - 0', date: '08/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Niger', score: '5 - 0', date: '05/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Madagascar', score: '3 - 2', date: '30/08/2025', competition: 'Camp. Africano de Nações' },
                { opponent: 'Senegal', score: '1 - 1', date: '26/08/2025', competition: 'Camp. Africano de Nações' },
                { opponent: 'Tanzania', score: '1 - 0', date: '22/08/2025', competition: 'Camp. Africano de Nações' },
                { opponent: 'RD Congo', score: '3 - 1', date: '17/08/2025', competition: 'Camp. Africano de Nações' },
                { opponent: 'Tanzania', score: '2 - 0', date: '25/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Niger', score: '2 - 1', date: '21/03/2025', competition: 'Eliminatórias - CAF' }
            ]
        },
        friendlies: [
            { opponent: 'Uganda', score: '4 - 0', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Moçambique', score: '1 - 0', date: '14/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Bahrein', score: '1 - 0', date: '09/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Benin', score: '1 - 0', date: '09/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Tunísia', score: '2 - 0', date: '06/06/2025', competition: 'Amistoso Internacional' }
        ]
    },
    'ht': {
        name: 'Haiti',
        group: 'C',
        wc_participations: 2,
        qualifiers: {
            summary: 'Vencedor do Grupo Final (CONCACAF). Desempenho sólido na Liga das Nações e Copa Ouro.',
            matches: 12, won: 7, drawn: 2, lost: 3,
            recent_matches: [
                { opponent: 'Nicaragua', score: '2 - 0', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Costa Rica', score: '1 - 0', date: '13/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Honduras', score: '0 - 3', date: '13/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Nicaragua', score: '3 - 0', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Costa Rica', score: '3 - 3', date: '09/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Honduras', score: '0 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'EUA', score: '1 - 2', date: '22/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Trindade e Tobago', score: '1 - 1', date: '19/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Arábia Saudita', score: '0 - 1', date: '15/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Curaçao', score: '1 - 5', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Aruba', score: '5 - 0', date: '07/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Porto Rico', score: '3 - 0', date: '18/11/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Sint Maarten', score: '8 - 0', date: '15/11/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Aruba', score: '5 - 3', date: '14/10/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Aruba', score: '3 - 1', date: '11/10/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Sint Maarten', score: '6 - 0', date: '09/09/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Porto Rico', score: '4 - 1', date: '06/09/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Barbados', score: '3 - 1', date: '09/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Santa Lúcia', score: '2 - 1', date: '06/06/2024', competition: 'Eliminatórias da Copa' }
            ]
        },
        friendlies: [
            { opponent: 'Azerbaijão', score: '3 - 0', date: '22/03/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Guiana Francesa', score: '1 - 1', date: '23/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Jamaica', score: '2 - 3', date: '15/10/2023', competition: 'Concacaf Nations League' },
            { opponent: 'Suriname', score: '1 - 1', date: '12/10/2023', competition: 'Concacaf Nations League' },
            { opponent: 'Jamaica', score: '2 - 2', date: '12/09/2023', competition: 'Concacaf Nations League' },
            { opponent: 'Cuba', score: '0 - 0', date: '08/09/2023', competition: 'Concacaf Nations League' }
        ]
    },
    'sc': {
        name: 'Escócia',
        group: 'C',
        wc_participations: 9,
        qualifiers: {
            summary: 'Classificado UEFA. Disputou a Euro 2024 e Nations League.',
            matches: 8, won: 5, drawn: 2, lost: 1,
            recent_matches: [
                { opponent: 'Dinamarca', score: '4 - 2', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Grécia', score: '2 - 3', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bielorrússia', score: '2 - 1', date: '12/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Grécia', score: '3 - 1', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bielorrússia', score: '2 - 0', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Dinamarca', score: '0 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Grécia', score: '0 - 3', date: '23/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Grécia', score: '1 - 0', date: '20/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '2 - 1', date: '18/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Croácia', score: '1 - 0', date: '15/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Portugal', score: '0 - 0', date: '15/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Croácia', score: '1 - 2', date: '12/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Portugal', score: '1 - 2', date: '08/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '2 - 3', date: '05/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Hungria', score: '0 - 1', date: '23/06/2024', competition: 'Eurocopa' },
                { opponent: 'Suíça', score: '1 - 1', date: '19/06/2024', competition: 'Eurocopa' },
                { opponent: 'Alemanha', score: '1 - 5', date: '14/06/2024', competition: 'Eurocopa' },
                { opponent: 'Noruega', score: '3 - 3', date: '19/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Geórgia', score: '2 - 2', date: '16/11/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Liechtenstein', score: '4 - 0', date: '09/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Islândia', score: '1 - 3', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Finlândia', score: '2 - 2', date: '07/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Gibraltar', score: '2 - 0', date: '03/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Irlanda do Norte', score: '0 - 1', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Holanda', score: '0 - 4', date: '22/03/2024', competition: 'Amistoso Internacional' }
        ]
    },

    // GRUPO D
    'us': {
        name: 'Estados Unidos',
        group: 'D',
        wc_participations: 12,
        qualifiers: {
            summary: 'País-sede. Classificado automaticamente.',
            matches: '-', won: '-', drawn: '-', lost: '-',
            recent_matches: [
                { opponent: 'México', score: '1 - 2', date: '06/07/2025', competition: 'Copa Ouro' },
                { opponent: 'Guatemala', score: '2 - 1', date: '02/07/2025', competition: 'Copa Ouro' },
                { opponent: 'Costa Rica', score: '2 - 2 (4-3 pen)', date: '29/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Haiti', score: '2 - 1', date: '22/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Arábia Saudita', score: '1 - 0', date: '19/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Trindade e Tobago', score: '5 - 0', date: '15/06/2025', competition: 'Copa Ouro' },
                { opponent: 'Canadá', score: '1 - 2', date: '23/03/2025', competition: 'Concacaf Nations League' },
                { opponent: 'Panamá', score: '0 - 1', date: '20/03/2025', competition: 'Concacaf Nations League' },
                { opponent: 'Jamaica', score: '4 - 2', date: '18/11/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Jamaica', score: '1 - 0', date: '14/11/2024', competition: 'Concacaf Nations League' },
                { opponent: 'Uruguai', score: '0 - 1', date: '01/07/2024', competition: 'Copa América' }
            ]
        },
        friendlies: [
            { opponent: 'Uruguai', score: '5 - 1', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Paraguai', score: '2 - 1', date: '15/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Austrália', score: '2 - 1', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Equador', score: '1 - 1', date: '10/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Japão', score: '2 - 0', date: '09/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Coreia do Sul', score: '0 - 2', date: '06/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Suíça', score: '0 - 4', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Turquia', score: '1 - 2', date: '07/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Costa Rica', score: '3 - 0', date: '22/01/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Venezuela', score: '3 - 1', date: '18/01/2025', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '0 - 2', date: '15/10/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Panamá', score: '2 - 0', date: '12/10/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Nova Zelândia', score: '1 - 1', date: '10/09/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Canadá', score: '1 - 2', date: '07/09/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'py': {
        name: 'Paraguai',
        group: 'D',
        wc_participations: 9,
        qualifiers: {
            summary: 'Classificado da CONMEBOL.',
            matches: 18, won: 7, drawn: 5, lost: 6,
            recent_matches: [
                { opponent: 'Peru', score: '0 - 1', date: '09/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Equador', score: '0 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Brasil', score: '1 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Uruguai', score: '2 - 0', date: '05/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Colômbia', score: '2 - 2', date: '25/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Chile', score: '1 - 0', date: '20/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bolívia', score: '2 - 2', date: '19/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Argentina', score: '2 - 1', date: '14/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Venezuela', score: '2 - 1', date: '15/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Equador', score: '0 - 0', date: '10/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Brasil', score: '1 - 0', date: '10/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Uruguai', score: '0 - 0', date: '06/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Costa Rica', score: '2 - 1', date: '02/07/2024', competition: 'Copa América' },
                { opponent: 'Brasil', score: '1 - 4', date: '28/06/2024', competition: 'Copa América' },
                { opponent: 'Colômbia', score: '2 - 1', date: '24/06/2024', competition: 'Copa América' },
                { opponent: 'Colômbia', score: '0 - 1', date: '21/11/2023', competition: 'Eliminatórias da Copa' },
                { opponent: 'Chile', score: '0 - 0', date: '16/11/2023', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bolívia', score: '1 - 0', date: '17/10/2023', competition: 'Eliminatórias da Copa' }
            ]
        },
        friendlies: [
            { opponent: 'México', score: '1 - 2', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Estados Unidos', score: '2 - 1', date: '15/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Coreia do Sul', score: '2 - 0', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Japão', score: '2 - 2', date: '10/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Panamá', score: '0 - 1', date: '16/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Chile', score: '3 - 0', date: '11/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Peru', score: '0 - 0', date: '07/06/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'au': {
        name: 'Austrália',
        group: 'D',
        wc_participations: 7,
        qualifiers: {
            summary: 'Classificado da Ásia (AFC).',
            matches: 14, won: 8, drawn: 4, lost: 2,
            recent_matches: [
                { opponent: 'Arábia Saudita', score: '1 - 2', date: '10/06/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Japão', score: '1 - 0', date: '05/06/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'China', score: '0 - 2', date: '25/03/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Indonésia', score: '5 - 1', date: '20/03/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Bahrein', score: '2 - 2', date: '19/11/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Arábia Saudita', score: '0 - 0', date: '14/11/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Japão', score: '1 - 1', date: '15/10/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'China', score: '3 - 1', date: '10/10/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Indonésia', score: '0 - 0', date: '10/09/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Bahrein', score: '0 - 1', date: '05/09/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Palestina', score: '5 - 0', date: '11/06/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Bangladesh', score: '0 - 2', date: '06/06/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Líbano', score: '0 - 5', date: '26/03/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Líbano', score: '2 - 0', date: '21/03/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Coreia do Sul', score: '1 - 2', date: '02/02/2024', competition: 'Copa das Nações da Ásia' }, //
                { opponent: 'Indonésia', score: '4 - 0', date: '28/01/2024', competition: 'Copa das Nações da Ásia' }, //
                { opponent: 'Uzbequistão', score: '1 - 1', date: '23/01/2024', competition: 'Copa das Nações da Ásia' }, //
                { opponent: 'Síria', score: '0 - 1', date: '18/01/2024', competition: 'Copa das Nações da Ásia' }, //
                { opponent: 'Índia', score: '2 - 0', date: '13/01/2024', competition: 'Copa das Nações da Ásia' } //
            ]
        },
        friendlies: [
            { opponent: 'Colômbia', score: '3 - 0', date: '18/11/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Venezuela', score: '1 - 0', date: '14/11/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Estados Unidos', score: '2 - 1', date: '14/10/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Canadá', score: '0 - 1', date: '10/10/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Nova Zelândia', score: '1 - 3', date: '09/09/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Nova Zelândia', score: '1 - 0', date: '05/09/2025', competition: 'Amistoso internacional' } //
        ]
    },
    'un_d': {
        name: 'Vencedor Play-off C',
        group: 'D',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },

    // GRUPO E
    'de': {
        name: 'Alemanha',
        group: 'E',
        wc_participations: 21,
        qualifiers: {
            summary: 'Vencedor do Grupo A da UEFA.',
            matches: 10, won: 8, drawn: 1, lost: 1,
            recent_matches: [
                { opponent: 'Eslováquia', score: '6 - 0', date: '17/11/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Luxemburgo', score: '0 - 2', date: '14/11/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Irlanda do Norte', score: '0 - 1', date: '13/10/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Luxemburgo', score: '4 - 0', date: '10/10/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Irlanda do Norte', score: '3 - 1', date: '07/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Eslováquia', score: '2 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'França', score: '0 - 2', date: '08/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Portugal', score: '1 - 2', date: '04/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Itália', score: '3 - 3', date: '23/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Itália', score: '1 - 2', date: '20/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Hungria', score: '1 - 1', date: '19/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Bósnia e Herzegovina', score: '7 - 0', date: '16/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Holanda', score: '1 - 0', date: '14/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Bósnia e Herzegovina', score: '1 - 2', date: '11/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Holanda', score: '2 - 2', date: '10/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Hungria', score: '5 - 0', date: '07/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Espanha', score: '2 - 1', date: '05/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Dinamarca', score: '2 - 0', date: '29/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Suíça', score: '1 - 1', date: '23/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Hungria', score: '2 - 0', date: '19/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Escócia', score: '5 - 1', date: '14/06/2024', competition: 'Eurocopa' } //
            ]
        },
        friendlies: [
            { opponent: 'Grécia', score: '2 - 1', date: '07/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Ucrânia', score: '0 - 0', date: '03/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Holanda', score: '2 - 1', date: '26/03/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'França', score: '0 - 2', date: '23/03/2024', competition: 'Amistoso Internacional' } //
        ]
    },
    'cw': {
        name: 'Curaçau',
        group: 'E',
        wc_participations: 1,
        qualifiers: {
            summary: 'Histórica primeira classificação (CONCACAF).',
            matches: 8, won: 6, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Jamaica', score: '0 - 0', date: '18/11/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Bermuda', score: '0 - 7', date: '13/11/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Trindade e Tobago', score: '1 - 1', date: '14/10/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Jamaica', score: '2 - 0', date: '10/10/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Bermuda', score: '3 - 2', date: '09/09/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Trindade e Tobago', score: '0 - 0', date: '05/09/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Haiti', score: '1 - 5', date: '10/06/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'St. Lucia', score: '4 - 0', date: '06/06/2025', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Aruba', score: '0 - 2', date: '08/06/2024', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' }, //
                { opponent: 'Barbados', score: '4 - 1', date: '05/06/2024', competition: 'Eliminatórias da Concacaf para a Copa do Mundo' } //
            ]
        },
        friendlies: [
            { opponent: 'Grécia', score: 'Jogo a ser realizado', date: '21/03/2025', competition: 'Amistoso Internacional' }, //
        ]
    },
    'ci': {
        name: 'Costa do Marfim',
        group: 'E',
        wc_participations: 4,
        qualifiers: {
            summary: 'Líder do Grupo F da CAF.',
            matches: 10, won: 8, drawn: 1, lost: 1,
            recent_matches: [
                { opponent: 'Egito', score: '3 - 2', date: '10/01/2026', competition: 'Copa das Nações da África' }, //
                { opponent: 'Burkina Faso', score: '3 - 0', date: '06/01/2026', competition: 'Copa das Nações da África' }, //
                { opponent: 'Gabon', score: '2 - 3', date: '31/12/2025', competition: 'Copa das Nações da África' }, //
                { opponent: 'Camarões', score: '1 - 1', date: '28/12/2025', competition: 'Copa das Nações da África' }, //
                { opponent: 'Moçambique', score: '1 - 0', date: '24/12/2025', competition: 'Copa das Nações da África' }, //
                { opponent: 'Kenya', score: '3 - 0', date: '14/10/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Seychelles', score: '0 - 7', date: '10/10/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Gabon', score: '0 - 0', date: '09/09/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Burundi', score: '1 - 0', date: '05/09/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Gambia', score: '1 - 0', date: '24/03/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Burundi', score: '0 - 1', date: '21/03/2025', competition: 'Eliminatórias - CAF' }, //
                { opponent: 'Burkina Faso', score: '2 - 0', date: '28/12/2024', competition: 'African Nations Championship Qualifying' }, //
                { opponent: 'Burkina Faso', score: '2 - 0', date: '22/12/2024', competition: 'African Nations Championship Qualifying' }, //
                { opponent: 'Chad', score: '4 - 0', date: '19/11/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Zâmbia', score: '1 - 0', date: '15/11/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Sierra Leone', score: '1 - 0', date: '15/10/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Sierra Leone', score: '4 - 1', date: '11/10/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Chad', score: '0 - 2', date: '10/09/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Zâmbia', score: '2 - 0', date: '06/09/2024', competition: 'Eliminatórias - Copa Africana' }, //
                { opponent: 'Kenya', score: '0 - 0', date: '11/06/2024', competition: 'Eliminatórias - CAF' } //
            ]
        },
        friendlies: [
            { opponent: 'Omã', score: '0 - 2', date: '18/11/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Arábia Saudita', score: '1 - 0', date: '14/11/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Canadá', score: '0 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Nova Zelândia', score: '0 - 1', date: '07/06/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Guinea', score: '4 - 1', date: '15/12/2024', competition: 'Amistoso Internacional' } //
        ]
    },
    'ec': {
        name: 'Equador',
        group: 'E',
        wc_participations: 5,
        qualifiers: {
            summary: 'Classificado CONMEBOL.',
            matches: 18, won: 11, drawn: 4, lost: 3,
            recent_matches: [
                { opponent: 'Argentina', score: '1 - 0', date: '09/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Paraguai', score: '0 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Peru', score: '0 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Brasil', score: '0 - 0', date: '05/06/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Chile', score: '0 - 0', date: '25/03/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Venezuela', score: '2 - 1', date: '21/03/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Colômbia', score: '1 - 0', date: '19/11/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Bolívia', score: '4 - 0', date: '14/11/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Uruguai', score: '0 - 0', date: '15/10/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Paraguai', score: '0 - 0', date: '10/10/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Peru', score: '1 - 0', date: '10/09/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Brasil', score: '0 - 1', date: '06/09/2024', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Argentina', score: '1 - 1', date: '04/07/2024', competition: 'Copa América' }, //
                { opponent: 'México', score: '0 - 0', date: '30/06/2024', competition: 'Copa América' }, //
                { opponent: 'Jamaica', score: '3 - 1', date: '26/06/2024', competition: 'Copa América' }, //
                { opponent: 'Venezuela', score: '1 - 2', date: '22/06/2024', competition: 'Copa América' } //
            ]
        },
        friendlies: [
            { opponent: 'Nova Zelândia', score: '2 - 0', date: '18/11/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Canadá', score: '0 - 0', date: '13/11/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'México', score: '1 - 1', date: '14/10/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Estados Unidos', score: '1 - 1', date: '10/10/2025', competition: 'Amistoso Internacional' }, //
            { opponent: 'Honduras', score: '2 - 1', date: '16/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Bolívia', score: '3 - 1', date: '12/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Argentina', score: '0 - 1', date: '09/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Itália', score: '0 - 2', date: '24/03/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Guatemala', score: '2 - 0', date: '21/03/2024', competition: 'Amistoso Internacional' } //
        ]
    },
    // GRUPO F
    'nl': {
        name: 'Holanda',
        group: 'F',
        wc_participations: 12,
        qualifiers: {
            summary: 'Vencedor invicto do Grupo G da UEFA.',
            matches: 8, won: 6, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Finlândia', score: '2 - 0', date: '16/11/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Armênia', score: '5 - 1', date: '13/11/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Andorra', score: '3 - 0', date: '13/10/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Finlândia', score: '4 - 2', date: '10/10/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Andorra', score: '5 - 0', date: '08/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Romênia', score: '2 - 1', date: '05/09/2025', competition: 'Eliminatórias da Copa' }, //
                { opponent: 'Espanha', score: '3 - 2', date: '08/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Croácia', score: '2 - 0', date: '05/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'França', score: '2 - 0', date: '23/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'França', score: '1 - 2', date: '20/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Bósnia e Herzegovina', score: '1 - 1', date: '19/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Hungria', score: '4 - 0', date: '16/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Alemanha', score: '0 - 1', date: '14/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Hungria', score: '1 - 1', date: '11/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Alemanha', score: '2 - 2', date: '10/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Bósnia e Herzegovina', score: '5 - 2', date: '07/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Inglaterra', score: '1 - 2', date: '10/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Turquia', score: '2 - 1', date: '06/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Romênia', score: '3 - 0', date: '02/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Áustria', score: '2 - 3', date: '25/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'França', score: '0 - 0', date: '21/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Polônia', score: '2 - 1', date: '16/06/2024', competition: 'Eurocopa' } //
            ]
        },
        friendlies: [
            { opponent: 'Islândia', score: '4 - 0', date: '10/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Canadá', score: '4 - 0', date: '06/06/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Alemanha', score: '1 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' }, //
            { opponent: 'Escócia', score: '4 - 0', date: '22/03/2024', competition: 'Amistoso Internacional' } //
        ]
    },
    'jp': {
        name: 'Japão',
        group: 'F',
        wc_participations: 8,
        qualifiers: {
            summary: 'Dominio absoluto na Ásia.',
            matches: 12, won: 11, drawn: 1, lost: 0,
            recent_matches: [
                { opponent: 'Indonésia', score: '6 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Austrália', score: '1 - 0', date: '05/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Arábia Saudita', score: '0 - 0', date: '25/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bahrein', score: '2 - 0', date: '20/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'China', score: '1 - 3', date: '19/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Indonésia', score: '0 - 4', date: '15/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Austrália', score: '1 - 1', date: '15/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Arábia Saudita', score: '0 - 2', date: '10/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bahrein', score: '0 - 5', date: '10/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'China', score: '7 - 0', date: '05/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Síria', score: '5 - 0', date: '11/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Birmânia', score: '0 - 5', date: '06/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Coreia do Norte', score: '0 - 3', date: '26/03/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Coreia do Norte', score: '1 - 0', date: '21/03/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Irã', score: '2 - 1', date: '03/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Bahrein', score: '1 - 3', date: '31/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Indonésia', score: '3 - 1', date: '24/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Iraque', score: '2 - 1', date: '19/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Vietnã', score: '4 - 2', date: '14/01/2024', competition: 'Copa da Ásia' }
            ]
        },
        friendlies: [
            { opponent: 'Bolívia', score: '3 - 0', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Gana', score: '2 - 0', date: '14/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Brasil', score: '3 - 2', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Paraguai', score: '2 - 2', date: '10/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Estados Unidos', score: '2 - 0', date: '09/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '0 - 0', date: '06/09/2025', competition: 'Amistoso Internacional' }
        ]
    },
    'un_f': {
        name: 'Vencedor Play-off B',
        group: 'F',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },
    'tn': {
        name: 'Tunísia',
        group: 'F',
        wc_participations: 7,
        qualifiers: {
            summary: 'Vencedor do Grupo H da CAF.',
            matches: 10, won: 8, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Mali', score: '1 - 1', date: '03/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Tanzânia', score: '1 - 1', date: '30/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Nigéria', score: '2 - 3', date: '27/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Uganda', score: '3 - 1', date: '23/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Namíbia', score: '3 - 0', date: '13/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'São Tomé e Príncipe', score: '6 - 0', date: '10/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Guiné Equatorial', score: '1 - 0', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Libéria', score: '3 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Malawi', score: '2 - 0', date: '24/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Libéria', score: '1 - 0', date: '19/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Gâmbia', score: '0 - 1', date: '18/11/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Madagascar', score: '3 - 2', date: '14/11/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Comores', score: '1 - 1', date: '15/10/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Comores', score: '0 - 1', date: '11/10/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Gâmbia', score: '2 - 1', date: '08/09/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Madagascar', score: '1 - 0', date: '05/09/2024', competition: 'Eliminatórias Copa Africana' },
                { opponent: 'Namíbia', score: '0 - 0', date: '09/06/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Guiné Equatorial', score: '1 - 0', date: '05/06/2024', competition: 'Eliminatórias da Copa' }
            ]
        },
        friendlies: [
            { opponent: 'Botswana', score: '2 - 1', date: '18/12/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Brasil', score: '1 - 1', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Jordânia', score: '3 - 2', date: '14/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Mauritânia', score: '1 - 1', date: '12/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Marrocos', score: '0 - 2', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Burkina Faso', score: '2 - 0', date: '02/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Nova Zelândia', score: '0 - 0', date: '26/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    // GRUPO G
    'be': {
        name: 'Bélgica',
        group: 'G',
        wc_participations: 15,
        qualifiers: {
            summary: 'Vencedor do Grupo (UEFA).',
            matches: 8, won: 6, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Liechtenstein', score: '7 - 0', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Cazaquistão', score: '1 - 1', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'País de Gales', score: '2 - 4', date: '13/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Macedônia do Norte', score: '0 - 0', date: '10/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Cazaquistão', score: '6 - 0', date: '07/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Liechtenstein', score: '0 - 6', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'País de Gales', score: '4 - 3', date: '09/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Macedônia do Norte', score: '1 - 1', date: '06/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Ucrânia', score: '3 - 0', date: '23/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Ucrânia', score: '3 - 1', date: '20/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Israel', score: '1 - 0', date: '17/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Itália', score: '0 - 1', date: '14/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'França', score: '1 - 2', date: '14/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Itália', score: '2 - 2', date: '10/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'França', score: '2 - 0', date: '09/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Israel', score: '3 - 1', date: '06/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'França', score: '1 - 0', date: '01/07/2024', competition: 'Eurocopa' },
                { opponent: 'Ucrânia', score: '0 - 0', date: '26/06/2024', competition: 'Eurocopa' },
                { opponent: 'Romênia', score: '2 - 0', date: '22/06/2024', competition: 'Eurocopa' },
                { opponent: 'Eslováquia', score: '0 - 1', date: '17/06/2024', competition: 'Eurocopa' },
                { opponent: 'Azerbaijão', score: '5 - 0', date: '19/11/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Luxemburgo', score: '3 - 0', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Montenegro', score: '2 - 0', date: '05/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Inglaterra', score: '2 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Irlanda', score: '0 - 0', date: '23/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'eg': {
        name: 'Egito',
        group: 'G',
        wc_participations: 4,
        qualifiers: {
            summary: 'Vencedor do Grupo Africano.',
            matches: 10, won: 8, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Nigéria', score: '0 - 0', date: '17/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Senegal', score: '0 - 1', date: '14/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Costa do Marfim', score: '3 - 2', date: '10/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Benin', score: '3 - 1', date: '05/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Angola', score: '0 - 0', date: '29/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'África do Sul', score: '1 - 0', date: '26/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Zimbábue', score: '2 - 1', date: '22/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Guiné-Bissau', score: '1 - 0', date: '12/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Djibouti', score: '3 - 0', date: '08/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Burkina Faso', score: '0 - 0', date: '09/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Etiópia', score: '2 - 0', date: '05/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Serra Leoa', score: '1 - 0', date: '25/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Etiópia', score: '2 - 0', date: '21/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'África do Sul', score: '1 - 3', date: '09/03/2025', competition: 'African Nations Championship Qualifying' },
                { opponent: 'África do Sul', score: '1 - 1', date: '02/03/2025', competition: 'African Nations Championship Qualifying' },
                { opponent: 'Botswana', score: '1 - 1', date: '19/11/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Cabo Verde', score: '1 - 1', date: '15/11/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Mauritânia', score: '1 - 0', date: '15/10/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Mauritânia', score: '2 - 0', date: '11/10/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Botswana', score: '4 - 0', date: '10/09/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Cabo Verde', score: '3 - 0', date: '06/09/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Guiné-Bissau', score: '1 - 1', date: '10/06/2024', competition: 'Eliminatórias - CAF' }
            ]
        },
        friendlies: [
            { opponent: 'Nigéria', score: '2 - 1', date: '16/12/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Cabo Verde', score: '1 - 1', date: '17/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Uzbequistão', score: '0 - 2', date: '14/11/2025', competition: 'Amistoso Internacional' }
        ]
    },
    'ir': {
        name: 'Irã',
        group: 'G',
        wc_participations: 7,
        qualifiers: {
            summary: 'Classificado da Ásia.',
            matches: 14, won: 10, drawn: 3, lost: 1,
            recent_matches: [
                { opponent: 'Coreia do Norte', score: '3 - 0', date: '10/06/2025', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Qatar', score: '0 - 1', date: '05/06/2025', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Uzbequistão', score: '2 - 2', date: '25/03/2025', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Emirados Árabes', score: '2 - 0', date: '20/03/2025', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Quirguizistão', score: '3 - 2', date: '19/11/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Coreia do Norte', score: '3 - 2', date: '14/11/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Qatar', score: '4 - 1', date: '15/10/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Uzbequistão', score: '0 - 0', date: '10/10/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Emirados Árabes', score: '1 - 0', date: '10/09/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Quirguizistão', score: '1 - 0', date: '05/09/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Uzbequistão', score: '0 - 0', date: '11/06/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Hong Kong', score: '4 - 2', date: '06/06/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Turquemenistão', score: '1 - 0', date: '26/03/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Turquemenistão', score: '5 - 0', date: '21/03/2024', competition: 'Eliminatórias Asiáticas' },
                { opponent: 'Qatar', score: '2 - 3', date: '07/02/2024', competition: 'Copa das Nações da Ásia' },
                { opponent: 'Japão', score: '2 - 1', date: '03/02/2024', competition: 'Copa das Nações da Ásia' },
                { opponent: 'Síria', score: '1 - 1', date: '31/01/2024', competition: 'Copa das Nações da Ásia' },
                { opponent: 'Emirados Árabes', score: '2 - 1', date: '23/01/2024', competition: 'Copa das Nações da Ásia' },
                { opponent: 'Hong Kong', score: '1 - 0', date: '19/01/2024', competition: 'Copa das Nações da Ásia' },
                { opponent: 'Palestina', score: '4 - 1', date: '14/01/2024', competition: 'Copa das Nações da Ásia' }
            ]
        },
        friendlies: [
            { opponent: 'Uzbequistão', score: '0 - 0', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Cabo Verde', score: '0 - 0', date: '13/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Tanzania', score: '2 - 0', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Rússia', score: '1 - 2', date: '10/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Indonesia', score: '5 - 0', date: '09/01/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'nz': {
        name: 'Nova Zelândia',
        group: 'G',
        wc_participations: 3,
        qualifiers: {
            summary: 'Vencedor da Oceania (OFC).',
            matches: 5, won: 4, drawn: 0, lost: 1,
            recent_matches: [
                { opponent: 'Nova Caledônia', score: '0 - 3', date: '24/03/2025', competition: 'Eliminatórias - Oceania' },
                { opponent: 'Fiji', score: '7 - 0', date: '21/03/2025', competition: 'Eliminatórias - Oceania' },
                { opponent: 'Samoa', score: '0 - 8', date: '18/11/2024', competition: 'Eliminatórias - Oceania' },
                { opponent: 'Vanuatu', score: '8 - 1', date: '15/11/2024', competition: 'Eliminatórias - Oceania' },
                { opponent: 'Tahiti', score: '3 - 0', date: '10/10/2024', competition: 'Eliminatórias - Oceania' }
            ]
        },
        friendlies: [
            { opponent: 'Equador', score: '2 - 0', date: '18/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Colômbia', score: '2 - 1', date: '15/11/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Noruega', score: '1 - 1', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Polônia', score: '1 - 0', date: '09/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Austrália', score: '1 - 3', date: '09/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Austrália', score: '1 - 0', date: '05/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Ucrânia', score: '1 - 2', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Costa do Marfim', score: '0 - 1', date: '07/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Malásia', score: '4 - 0', date: '14/10/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Estados Unidos', score: '1 - 1', date: '10/09/2024', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '3 - 0', date: '07/09/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Tunísia', score: '0 - 0', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Egito', score: '1 - 0', date: '22/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Irlanda', score: '1 - 1', date: '21/11/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Grécia', score: '2 - 0', date: '17/11/2023', competition: 'Amistoso Internacional' }
        ]
    },
    // GRUPO H
    'es': {
        name: 'Espanha',
        group: 'H',
        wc_participations: 17,
        qualifiers: {
            summary: 'Líder do Grupo E (UEFA).',
            matches: 10, won: 9, drawn: 1, lost: 0,
            recent_matches: [
                { opponent: 'Moldávia', score: '2 - 1', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Albânia', score: '3 - 0', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '1 - 1', date: '13/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Letônia', score: '4 - 1', date: '10/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Albânia', score: '0 - 0', date: '07/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Moldávia', score: '2 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '4 - 0', date: '09/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Letônia', score: '3 - 0', date: '06/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Dinamarca', score: '2 - 1', date: '23/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Dinamarca', score: '1 - 1', date: '20/03/2025', competition: 'UEFA Nations League' },
                { opponent: 'Suíça', score: '3 - 2', date: '18/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Dinamarca', score: '2 - 1', date: '15/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Sérvia', score: '3 - 0', date: '15/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Dinamarca', score: '1 - 0', date: '12/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Suíça', score: '4 - 1', date: '08/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Sérvia', score: '0 - 0', date: '05/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Inglaterra', score: '2 - 1', date: '14/07/2024', competition: 'Eurocopa' },
                { opponent: 'França', score: '2 - 1', date: '09/07/2024', competition: 'Eurocopa' },
                { opponent: 'Alemanha', score: '2 - 1', date: '05/07/2024', competition: 'Eurocopa' },
                { opponent: 'Geórgia', score: '4 - 1', date: '30/06/2024', competition: 'Eurocopa' },
                { opponent: 'Albânia', score: '1 - 0', date: '24/06/2024', competition: 'Eurocopa' },
                { opponent: 'Itália', score: '1 - 0', date: '20/06/2024', competition: 'Eurocopa' },
                { opponent: 'Croácia', score: '3 - 0', date: '15/06/2024', competition: 'Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Irlanda do Norte', score: '5 - 1', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Andorra', score: '5 - 0', date: '05/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Brasil', score: '3 - 3', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Colômbia', score: '0 - 1', date: '22/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'cv': {
        name: 'Cabo Verde',
        group: 'H',
        wc_participations: 1,
        qualifiers: {
            summary: 'Classificação histórica CAF.',
            matches: 10, won: 6, drawn: 3, lost: 1,
            recent_matches: [
                { opponent: 'Eswatini', score: '3 - 0', date: '13/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Líbia', score: '3 - 3', date: '08/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Camarões', score: '1 - 0', date: '09/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Maurício', score: '2 - 0', date: '04/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Angola', score: '2 - 1', date: '25/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Maurício', score: '1 - 0', date: '20/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Mauritânia', score: '0 - 1', date: '19/11/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Egito', score: '1 - 1', date: '15/11/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Botswana', score: '0 - 1', date: '15/10/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Botswana', score: '0 - 1', date: '10/10/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Mauritânia', score: '2 - 0', date: '10/09/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Egito', score: '0 - 3', date: '06/09/2024', competition: 'Eliminatórias - Copa Africana' },
                { opponent: 'Líbia', score: '1 - 0', date: '11/06/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Camarões', score: '1 - 4', date: '08/06/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'África do Sul', score: '0 - 0', date: '03/02/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Mauritânia', score: '1 - 0', date: '29/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Egito', score: '2 - 2', date: '22/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Moçambique', score: '3 - 0', date: '19/01/2024', competition: 'Copa das Nações da África' }
            ]
        },
        friendlies: [
            { opponent: 'Egito', score: '1 - 1', date: '17/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Irã', score: '0 - 0', date: '13/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Geórgia', score: '1 - 1', date: '08/06/2025', competition: 'Amistoso internacional' },
            { opponent: 'Malásia', score: '3 - 0', date: '03/06/2025', competition: 'Amistoso internacional' },
            { opponent: 'Malásia', score: '1 - 1', date: '29/05/2025', competition: 'Amistoso internacional' },
            { opponent: 'Guiné Equatorial', score: '1 - 0', date: '25/03/2024', competition: 'Amistoso internacional' },
            { opponent: 'Guiana', score: '1 - 0', date: '21/03/2024', competition: 'Amistoso internacional' }
        ]
    },
    'sa': {
        name: 'Arábia Saudita',
        group: 'H',
        wc_participations: 7,
        qualifiers: {
            summary: 'Classificado da Ásia (AFC).',
            matches: 14, won: 9, drawn: 3, lost: 2,
            recent_matches: [
                { opponent: 'Iraque', score: '0 - 0', date: '14/10/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Indonesia', score: '2 - 3', date: '08/10/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'México', score: '2 - 0', date: '28/06/2025', competition: 'Copa Ouro' }, //
                { opponent: 'Trindade e Tobago', score: '1 - 1', date: '22/06/2025', competition: 'Copa Ouro' }, //
                { opponent: 'Estados Unidos', score: '0 - 1', date: '19/06/2025', competition: 'Copa Ouro' }, //
                { opponent: 'Haiti', score: '0 - 1', date: '15/06/2025', competition: 'Copa Ouro' }, //
                { opponent: 'Austrália', score: '1 - 2', date: '10/06/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Bahrein', score: '0 - 2', date: '05/06/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Japão', score: '0 - 0', date: '25/03/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'China', score: '1 - 0', date: '20/03/2025', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Omã', score: '2 - 1', date: '31/12/2024', competition: 'Arabian Gulf Cup' }, //
                { opponent: 'Iraque', score: '1 - 3', date: '28/12/2024', competition: 'Arabian Gulf Cup' }, //
                { opponent: 'Iêmen', score: '2 - 3', date: '25/12/2024', competition: 'Arabian Gulf Cup' }, //
                { opponent: 'Bahrein', score: '2 - 3', date: '22/12/2024', competition: 'Arabian Gulf Cup' }, //
                { opponent: 'Indonesia', score: '2 - 0', date: '19/11/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Austrália', score: '0 - 0', date: '14/11/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Bahrein', score: '0 - 0', date: '15/10/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'Japão', score: '0 - 2', date: '10/10/2024', competition: 'Eliminatórias Asiáticas' }, //
                { opponent: 'China', score: '1 - 2', date: '10/09/2024', competition: 'Eliminatórias Asiáticas' } //
            ]
        },
        friendlies: [
            { opponent: 'Argélia', score: '0 - 2', date: '18/11/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Costa do Marfim', score: '1 - 0', date: '14/11/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'República Tcheca', score: '1 - 1', date: '08/09/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Macedônia do Norte', score: '2 - 1', date: '04/09/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Jordânia', score: '2 - 0', date: '30/05/2025', competition: 'Amistoso internacional' }, //
            { opponent: 'Trindade e Tobago', score: '3 - 1', date: '17/12/2024', competition: 'Amistoso internacional' } //
        ]
    },
    'uy': {
        name: 'Uruguai',
        group: 'H',
        wc_participations: 15,
        qualifiers: {
            summary: 'Vice-Líder da CONMEBOL.',
            matches: 18, won: 11, drawn: 4, lost: 3,
            recent_matches: [
                { opponent: 'Chile', score: '0 - 0', date: '09/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Peru', score: '3 - 0', date: '04/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Venezuela', score: '2 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Paraguai', score: '0 - 2', date: '05/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Bolívia', score: '0 - 0', date: '25/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Argentina', score: '0 - 1', date: '21/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Brasil', score: '1 - 1', date: '19/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Colômbia', score: '3 - 2', date: '15/11/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Equador', score: '0 - 0', date: '15/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Peru', score: '0 - 1', date: '11/10/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Venezuela', score: '0 - 0', date: '10/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Paraguai', score: '0 - 0', date: '06/09/2024', competition: 'Eliminatórias da Copa' },
                { opponent: 'Canadá', score: '2 - 2', date: '13/07/2024', competition: 'Copa América' },
                { opponent: 'Colômbia', score: '0 - 1', date: '10/07/2024', competition: 'Copa América' },
                { opponent: 'Brasil', score: '0 - 0', date: '06/07/2024', competition: 'Copa América' },
                { opponent: 'Estados Unidos', score: '1 - 0', date: '01/07/2024', competition: 'Copa América' },
                { opponent: 'Bolívia', score: '5 - 0', date: '27/06/2024', competition: 'Copa América' },
                { opponent: 'Panamá', score: '3 - 1', date: '23/06/2024', competition: 'Copa América' }
            ]
        },
        friendlies: [
            { opponent: 'Estados Unidos', score: '1 - 5', date: '18/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'México', score: '0 - 0', date: '15/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Uzbequistão', score: '2 - 1', date: '13/10/2025', competition: 'Amistoso internacional' },
            { opponent: 'República Dominicana', score: '1 - 0', date: '10/10/2025', competition: 'Amistoso internacional' },
            { opponent: 'Guatemala', score: '1 - 1', date: '01/09/2024', competition: 'Amistoso internacional' },
            { opponent: 'México', score: '4 - 0', date: '05/06/2024', competition: 'Amistoso internacional' },
            { opponent: 'Costa Rica', score: '0 - 0', date: '31/05/2024', competition: 'Amistoso internacional' }
        ]
    },

    // GRUPO I
    'fr': {
        name: 'França',
        group: 'I',
        wc_participations: 17,
        qualifiers: {
            summary: 'Vencedor do Grupo D da UEFA.',
            matches: 8, won: 6, drawn: 1, lost: 1,
            recent_matches: [
                { opponent: 'Azerbaijão', score: '3 - 1', date: '16/11/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Ucrânia', score: '4 - 0', date: '13/11/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Islândia', score: '2 - 2', date: '13/10/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Azerbaijão', score: '3 - 0', date: '10/10/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Islândia', score: '2 - 1', date: '09/09/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Ucrânia', score: '2 - 0', date: '05/09/2025', competition: 'Eliminatórias europeias para a Copa do Mundo' }, //
                { opponent: 'Alemanha', score: '2 - 0', date: '08/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Espanha', score: '4 - 5', date: '05/06/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Croácia', score: '2 - 0', date: '23/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Croácia', score: '0 - 2', date: '20/03/2025', competition: 'UEFA Nations League' }, //
                { opponent: 'Itália', score: '3 - 1', date: '17/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Israel', score: '0 - 0', date: '14/11/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Bélgica', score: '2 - 1', date: '14/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Israel', score: '4 - 1', date: '10/10/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Bélgica', score: '2 - 0', date: '09/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Itália', score: '1 - 3', date: '06/09/2024', competition: 'UEFA Nations League' }, //
                { opponent: 'Espanha', score: '1 - 2', date: '09/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Portugal', score: '0 - 0', date: '05/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Bélgica', score: '1 - 0', date: '01/07/2024', competition: 'Eurocopa' }, //
                { opponent: 'Polônia', score: '1 - 1', date: '25/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Holanda', score: '0 - 0', date: '21/06/2024', competition: 'Eurocopa' }, //
                { opponent: 'Áustria', score: '1 - 0', date: '17/06/2024', competition: 'Eurocopa' } //
            ]
        },
        friendlies: [
            { opponent: 'Canadá', score: '0 - 0', date: '09/06/2024', competition: 'Amistoso internacional' }, //
            { opponent: 'Luxemburgo', score: '3 - 0', date: '05/06/2024', competition: 'Amistoso internacional' }, //
            { opponent: 'Chile', score: '3 - 2', date: '26/03/2024', competition: 'Amistoso internacional' } //
        ]
    },
    'sn': {
        name: 'Senegal',
        group: 'I',
        wc_participations: 4,
        qualifiers: {
            summary: 'Vencedor do Grupo B da CAF.',
            matches: 10, won: 7, drawn: 3, lost: 0,
            recent_matches: [
                { opponent: 'Marrocos', score: '1 - 0', date: '18/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Egito', score: '1 - 0', date: '14/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Mali', score: '0 - 1', date: '09/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Sudão', score: '3 - 1', date: '03/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Benin', score: '0 - 3', date: '30/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'República Democrática do Congo', score: '1 - 1', date: '27/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Botsuana', score: '3 - 0', date: '23/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Mauritânia', score: '4 - 0', date: '14/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Sudão do Sul', score: '0 - 5', date: '10/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'República Democrática do Congo', score: '2 - 3', date: '09/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Sudão', score: '2 - 0', date: '05/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Sudão', score: '1 - 1', date: '29/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Marrocos', score: '1 - 1', date: '26/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Uganda', score: '0 - 1', date: '23/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Sudão', score: '0 - 0', date: '19/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Congo', score: '1 - 1', date: '12/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Nigéria', score: '1 - 0', date: '05/08/2025', competition: 'Campeonato Africano de Nações' }
            ]
        },
        friendlies: [
            { opponent: 'Quênia', score: '8 - 0', date: '18/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Brasil', score: '2 - 0', date: '15/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Tanzânia', score: '2 - 1', date: '27/07/2025', competition: 'Amistoso internacional' },
            { opponent: 'Uganda', score: '2 - 1', date: '24/07/2025', competition: 'Amistoso internacional' },
            { opponent: 'Guiné', score: '1 - 0', date: '07/07/2025', competition: 'Amistoso internacional' },
            { opponent: 'Guiné', score: '0 - 0', date: '04/07/2025', competition: 'Amistoso internacional' },
            { opponent: 'Inglaterra', score: '1 - 3', date: '10/06/2025', competition: 'Amistoso internacional' },
            { opponent: 'Irlanda', score: '1 - 1', date: '06/06/2025', competition: 'Amistoso internacional' }
        ]
    },
    'un_i': {
        name: 'Vencedor Play-off 2',
        group: 'I',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },
    'no': {
        name: 'Noruega',
        group: 'I',
        wc_participations: 4,
        qualifiers: {
            summary: 'Classificação via UEFA. Retorno de Haaland.',
            matches: 10, won: 5, drawn: 3, lost: 2,
            recent_matches: [
                { opponent: 'Itália', score: '4 - 1', date: '16/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Estônia', score: '4 - 1', date: '13/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '5 - 0', date: '11/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Moldávia', score: '11 - 1', date: '09/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Estônia', score: '1 - 0', date: '09/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Itália', score: '3 - 0', date: '06/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '4 - 2', date: '25/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Moldávia', score: '5 - 0', date: '22/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Cazaquistão', score: '5 - 0', date: '17/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Eslovênia', score: '4 - 1', date: '14/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Áustria', score: '1 - 5', date: '13/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Eslovênia', score: '3 - 0', date: '10/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Áustria', score: '2 - 1', date: '09/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Cazaquistão', score: '0 - 0', date: '06/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Escócia', score: '3 - 3', date: '19/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Espanha', score: '0 - 1', date: '15/10/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Chipre', score: '4 - 0', date: '12/10/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Geórgia', score: '2 - 1', date: '12/09/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Nova Zelândia', score: '1 - 1', date: '14/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Finlândia', score: '1 - 0', date: '04/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Dinamarca', score: '1 - 3', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Kosovo', score: '3 - 0', date: '05/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Eslováquia', score: '1 - 1', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'República Tcheca', score: '1 - 2', date: '22/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Ilhas Faroe', score: '2 - 0', date: '16/11/2023', competition: 'Amistoso Internacional' }
        ]
    },

    // GRUPO J
    'ar': {
        name: 'Argentina',
        group: 'J',
        wc_participations: 19,
        qualifiers: {
            summary: 'Campeã da CONMEBOL. Atual campeã mundial.',
            matches: 18, won: 12, drawn: 2, lost: 4,
            recent_matches: [
                { opponent: 'Peru', score: '3 - 1', date: '18/11/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Paraguai', score: '2 - 1', date: '14/11/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Bolívia', score: '6 - 0', date: '15/10/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Venezuela', score: '1 - 1', date: '10/10/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Colômbia', score: '1 - 2', date: '10/09/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Chile', score: '3 - 0', date: '05/09/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Colômbia', score: '1 - 0', date: '14/07/2024', competition: 'Copa América' },
                { opponent: 'Canadá', score: '2 - 0', date: '09/07/2024', competition: 'Copa América' },
                { opponent: 'Equador', score: '1 - 1', date: '04/07/2024', competition: 'Copa América' },
                { opponent: 'Peru', score: '2 - 0', date: '29/06/2024', competition: 'Copa América' },
                { opponent: 'Chile', score: '1 - 0', date: '25/06/2024', competition: 'Copa América' },
                { opponent: 'Canadá', score: '2 - 0', date: '20/06/2024', competition: 'Copa América' },
                { opponent: 'Brasil', score: '1 - 0', date: '21/11/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Uruguai', score: '0 - 2', date: '16/11/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Peru', score: '2 - 0', date: '17/10/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Paraguai', score: '1 - 0', date: '12/10/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Bolívia', score: '3 - 0', date: '12/09/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Equador', score: '1 - 0', date: '07/09/2023', competition: 'Eliminatórias sul-americanas' }
            ]
        },
        friendlies: [
            { opponent: 'Guatemala', score: '4 - 1', date: '14/06/2024', competition: 'Amistoso internacional' },
            { opponent: 'Equador', score: '1 - 0', date: '09/06/2024', competition: 'Amistoso internacional' },
            { opponent: 'Costa Rica', score: '3 - 1', date: '26/03/2024', competition: 'Amistoso internacional' },
            { opponent: 'El Salvador', score: '3 - 0', date: '22/03/2024', competition: 'Amistoso internacional' }
        ]
    },
    'dz': {
        name: 'Argélia',
        group: 'J',
        wc_participations: 5,
        qualifiers: {
            summary: 'Classificado CAF.',
            matches: 10, won: 7, drawn: 2, lost: 1,
            recent_matches: [
                { opponent: 'Mali', score: '2 - 0', date: '18/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Nigéria', score: '0 - 0', date: '14/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Gana', score: '2 - 1', date: '09/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Marrocos', score: '1 - 2', date: '03/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Egito', score: '1 - 0', date: '30/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Costa do Marfim', score: '1 - 0', date: '27/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Zâmbia', score: '3 - 0', date: '23/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Botsuana', score: '2 - 0', date: '14/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Somália', score: '5 - 0', date: '10/10/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Moçambique', score: '1 - 0', date: '09/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Guiné', score: '1 - 0', date: '05/09/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Mauritânia', score: '3 - 0', date: '29/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Líbia', score: '3 - 0', date: '26/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Tunísia', score: '2 - 0', date: '23/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Sudão', score: '1 - 0', date: '19/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Burkina Faso', score: '1 - 0', date: '12/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Gana', score: '1 - 1', date: '05/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Uganda', score: '2 - 1', date: '10/06/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Guiné', score: '1 - 0', date: '06/06/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Libéria', score: '3 - 0', date: '25/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Guiné Equatorial', score: '2 - 0', date: '22/03/2025', competition: 'Eliminatórias - CAF' },
                { opponent: 'Libéria', score: '5 - 1', date: '17/11/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Guiné Equatorial', score: '2 - 0', date: '14/11/2024', competition: 'Eliminatórias - CAF' }
            ]
        },
        friendlies: [
            { opponent: 'Etiópia', score: '3 - 0', date: '18/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Egito', score: '1 - 1', date: '15/11/2025', competition: 'Amistoso internacional' },
            { opponent: 'Etiópia', score: '3 - 0', date: '01/08/2025', competition: 'Amistoso internacional' },
            { opponent: 'Nigéria', score: '2 - 1', date: '27/07/2025', competition: 'Amistoso internacional' },
            { opponent: 'Senegal', score: '1 - 1', date: '24/07/2025', competition: 'Amistoso internacional' }
        ]
    },
    'at': {
        name: 'Áustria',
        group: 'J',
        wc_participations: 8,
        qualifiers: {
            summary: 'Classificado UEFA.',
            matches: 10, won: 6, drawn: 2, lost: 2,
            recent_matches: [
                { opponent: 'Eslovênia', score: '4 - 1', date: '17/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Cazaquistão', score: '2 - 0', date: '14/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Moldávia', score: '5 - 0', date: '10/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '3 - 1', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Estônia', score: '4 - 0', date: '10/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Itália', score: '2 - 3', date: '06/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Moldávia', score: '2 - 0', date: '24/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Israel', score: '1 - 1', date: '21/03/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Eslovênia', score: '1 - 1', date: '17/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Cazaquistão', score: '2 - 0', date: '14/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Noruega', score: '5 - 1', date: '13/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Cazaquistão', score: '4 - 0', date: '10/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Noruega', score: '1 - 2', date: '09/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Eslovênia', score: '1 - 1', date: '06/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Turquia', score: '1 - 2', date: '02/07/2024', competition: 'Eurocopa' },
                { opponent: 'Holanda', score: '3 - 2', date: '25/06/2024', competition: 'Eurocopa' },
                { opponent: 'Polônia', score: '3 - 1', date: '21/06/2024', competition: 'Eurocopa' },
                { opponent: 'França', score: '0 - 1', date: '17/06/2024', competition: 'Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Polônia', score: '1 - 1', date: '13/10/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Suíça', score: '0 - 1', date: '05/09/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Suíça', score: '1 - 1', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Sérvia', score: '2 - 1', date: '04/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Turquia', score: '6 - 1', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Eslováquia', score: '2 - 0', date: '23/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Alemanha', score: '2 - 0', date: '21/11/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'jo': {
        name: 'Jordânia',
        group: 'J',
        wc_participations: 1,
        qualifiers: {
            summary: 'Estreante em Copas (AFC).',
            matches: 14, won: 8, drawn: 3, lost: 3,
            recent_matches: [
                { opponent: 'Kuwait', score: '1 - 0', date: '18/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Iraque', score: '0 - 0', date: '14/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Omã', score: '4 - 0', date: '15/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Coreia do Sul', score: '0 - 2', date: '10/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Palestina', score: '3 - 1', date: '10/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Kuwait', score: '1 - 1', date: '05/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Arábia Saudita', score: '2 - 1', date: '11/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Tajiquistão', score: '3 - 0', date: '06/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Paquistão', score: '7 - 0', date: '26/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Paquistão', score: '3 - 0', date: '21/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Catar', score: '1 - 3', date: '10/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Coreia do Sul', score: '2 - 0', date: '06/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Tajiquistão', score: '1 - 0', date: '02/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Iraque', score: '3 - 2', date: '29/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Bahrein', score: '0 - 1', date: '25/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Coreia do Sul', score: '2 - 2', date: '20/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Malásia', score: '4 - 0', date: '15/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Arábia Saudita', score: '0 - 2', date: '21/11/2023', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Tajiquistão', score: '1 - 1', date: '16/11/2023', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Iraque', score: '2 - 2', date: '17/10/2023', competition: 'Copa Jordânia' },
                { opponent: 'Irã', score: '1 - 3', date: '13/10/2023', competition: 'Copa Jordânia' },
                { opponent: 'Azerbaijão', score: '1 - 2', date: '12/09/2023', competition: 'Copa Jordânia' }
            ]
        },
        friendlies: [
            { opponent: 'Coreia do Norte', score: '2 - 1', date: '29/08/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Coreia do Norte', score: '0 - 0', date: '27/08/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Japão', score: '1 - 6', date: '09/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Catar', score: '2 - 1', date: '05/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Noruega', score: '0 - 6', date: '07/09/2023', competition: 'Amistoso Internacional' }
        ]
    },

    // GRUPO K
    'pt': {
        name: 'Portugal',
        group: 'K',
        wc_participations: 9,
        qualifiers: {
            summary: 'Vencedor do Grupo F da UEFA.',
            matches: 10, won: 8, drawn: 1, lost: 1,
            recent_matches: [
                { opponent: 'Irlanda', score: '3 - 0', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Geórgia', score: '2 - 0', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Geórgia', score: '4 - 0', date: '12/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Azerbaijão', score: '3 - 0', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Irlanda', score: '1 - 1', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Azerbaijão', score: '2 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Croácia', score: '1 - 1', date: '18/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '5 - 1', date: '15/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Escócia', score: '0 - 0', date: '15/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '3 - 1', date: '12/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Escócia', score: '2 - 1', date: '08/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Croácia', score: '2 - 1', date: '05/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'França', score: '0 - 0', date: '05/07/2024', competition: 'Eurocopa' },
                { opponent: 'Eslovênia', score: '0 - 0', date: '01/07/2024', competition: 'Eurocopa' },
                { opponent: 'Geórgia', score: '0 - 2', date: '26/06/2024', competition: 'Eurocopa' },
                { opponent: 'Turquia', score: '3 - 0', date: '22/06/2024', competition: 'Eurocopa' },
                { opponent: 'República Tcheca', score: '2 - 1', date: '18/06/2024', competition: 'Eurocopa' },
                { opponent: 'Islândia', score: '2 - 0', date: '19/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Liechtenstein', score: '2 - 0', date: '16/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Bósnia e Herz.', score: '5 - 0', date: '16/10/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Eslováquia', score: '3 - 2', date: '13/10/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Malta', score: '4 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Hungria', score: '2 - 0', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Irlanda', score: '3 - 0', date: '11/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Croácia', score: '1 - 2', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Finlândia', score: '4 - 2', date: '04/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Eslovênia', score: '0 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Suécia', score: '5 - 2', date: '21/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'un_k': {
        name: 'Vencedor Play-off 1',
        group: 'K',
        wc_participations: '-',
        qualifiers: { summary: 'Ainda em disputa', matches: '-', won: '-', drawn: '-', lost: '-' },
        friendlies: []
    },
    'uz': {
        name: 'Uzbequistão',
        group: 'K',
        wc_participations: 1,
        qualifiers: {
            summary: 'Estreante em Copas (AFC).',
            matches: 14, won: 9, drawn: 4, lost: 1,
            recent_matches: [
                { opponent: 'Coreia do Norte', score: '1 - 0', date: '19/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Catar', score: '2 - 3', date: '14/11/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Emirados Árabes', score: '1 - 0', date: '15/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Irã', score: '0 - 0', date: '10/10/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Quirguistão', score: '3 - 2', date: '10/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Coreia do Norte', score: '1 - 0', date: '05/09/2025', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Irã', score: '0 - 0', date: '11/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Turcomenistão', score: '3 - 1', date: '06/06/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Hong Kong', score: '3 - 0', date: '26/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Hong Kong', score: '2 - 0', date: '21/03/2024', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Catar', score: '1 - 1', date: '03/02/2024', competition: 'Copa da Ásia' },
                { opponent: 'Tailândia', score: '2 - 1', date: '30/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Austrália', score: '1 - 1', date: '23/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Índia', score: '3 - 0', date: '18/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Síria', score: '0 - 0', date: '13/01/2024', competition: 'Copa da Ásia' },
                { opponent: 'Irã', score: '2 - 2', date: '21/11/2023', competition: 'Eliminatórias da Ásia' },
                { opponent: 'Turcomenistão', score: '3 - 1', date: '16/11/2023', competition: 'Eliminatórias da Ásia' },
                { opponent: 'China', score: '2 - 1', date: '16/10/2023', competition: 'International Cup' },
                { opponent: 'Vietnã', score: '2 - 0', date: '13/10/2023', competition: 'International Cup' },
                { opponent: 'México', score: '3 - 3', date: '12/09/2023', competition: 'International Cup' },
                { opponent: 'EUA', score: '0 - 3', date: '09/09/2023', competition: 'International Cup' }
            ]
        },
        friendlies: [
            { opponent: 'Cazaquistão', score: '2 - 0', date: '11/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Cazaquistão', score: '0 - 0', date: '07/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Palestina', score: '1 - 0', date: '07/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Quirguistão', score: '4 - 1', date: '25/12/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'co': {
        name: 'Colômbia',
        group: 'K',
        wc_participations: 7,
        qualifiers: {
            summary: 'Classificado CONMEBOL.',
            matches: 18, won: 8, drawn: 6, lost: 4,
            recent_matches: [
                { opponent: 'Paraguai', score: '3 - 1', date: '18/11/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Equador', score: '1 - 0', date: '14/11/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Chile', score: '4 - 0', date: '15/10/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Bolívia', score: '0 - 1', date: '10/10/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Argentina', score: '2 - 1', date: '10/09/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Peru', score: '1 - 1', date: '05/09/2025', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Argentina', score: '0 - 1', date: '14/07/2024', competition: 'Copa América' },
                { opponent: 'Uruguai', score: '1 - 0', date: '10/07/2024', competition: 'Copa América' },
                { opponent: 'Panamá', score: '5 - 0', date: '06/07/2024', competition: 'Copa América' },
                { opponent: 'Brasil', score: '1 - 1', date: '02/07/2024', competition: 'Copa América' },
                { opponent: 'Costa Rica', score: '3 - 0', date: '28/06/2024', competition: 'Copa América' },
                { opponent: 'Paraguai', score: '2 - 1', date: '24/06/2024', competition: 'Copa América' },
                { opponent: 'Paraguai', score: '1 - 0', date: '21/11/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Brasil', score: '2 - 1', date: '16/11/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Equador', score: '0 - 0', date: '17/10/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Uruguai', score: '2 - 2', date: '12/10/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Chile', score: '0 - 0', date: '12/09/2023', competition: 'Eliminatórias sul-americanas' },
                { opponent: 'Venezuela', score: '1 - 0', date: '07/09/2023', competition: 'Eliminatórias sul-americanas' }
            ]
        },
        friendlies: [
            { opponent: 'Bolívia', score: '3 - 0', date: '15/06/2024', competition: 'Amistoso internacional' },
            { opponent: 'EUA', score: '5 - 1', date: '08/06/2024', competition: 'Amistoso internacional' },
            { opponent: 'Romênia', score: '3 - 2', date: '26/03/2024', competition: 'Amistoso internacional' },
            { opponent: 'Espanha', score: '1 - 0', date: '22/03/2024', competition: 'Amistoso internacional' },
            { opponent: 'México', score: '3 - 2', date: '16/12/2023', competition: 'Amistoso internacional' },
            { opponent: 'Venezuela', score: '1 - 0', date: '10/12/2023', competition: 'Amistoso internacional' }
        ]
    },

    // GRUPO L
    'en': {
        name: 'Inglaterra',
        group: 'L',
        wc_participations: 17,
        qualifiers: {
            summary: 'Campanha impecável no Grupo K da UEFA.',
            matches: 8, won: 8, drawn: 0, lost: 0,
            recent_matches: [
                { opponent: 'Polônia', score: '2 - 0', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Montenegro', score: '3 - 0', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Polônia', score: '1 - 1', date: '12/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Montenegro', score: '4 - 0', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Andorra', score: '6 - 0', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Estônia', score: '3 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Irlanda', score: '5 - 0', date: '17/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Grécia', score: '3 - 0', date: '14/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Finlândia', score: '3 - 1', date: '13/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Grécia', score: '1 - 2', date: '10/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Finlândia', score: '2 - 0', date: '10/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Irlanda', score: '2 - 0', date: '07/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Espanha', score: '1 - 2', date: '14/07/2024', competition: 'Eurocopa' },
                { opponent: 'Holanda', score: '2 - 1', date: '10/07/2024', competition: 'Eurocopa' },
                { opponent: 'Suíça', score: '1 - 1', date: '06/07/2024', competition: 'Eurocopa' },
                { opponent: 'Eslováquia', score: '2 - 1', date: '30/06/2024', competition: 'Eurocopa' },
                { opponent: 'Eslovênia', score: '0 - 0', date: '25/06/2024', competition: 'Eurocopa' },
                { opponent: 'Dinamarca', score: '1 - 1', date: '20/06/2024', competition: 'Eurocopa' },
                { opponent: 'Sérvia', score: '1 - 0', date: '16/06/2024', competition: 'Eurocopa' },
                { opponent: 'Macedônia do Norte', score: '1 - 1', date: '20/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Malta', score: '2 - 0', date: '17/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Itália', score: '3 - 1', date: '17/10/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Andorra', score: '4 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Estônia', score: '2 - 0', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Islândia', score: '0 - 1', date: '07/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Bósnia e Herz.', score: '3 - 0', date: '03/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Bélgica', score: '2 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Brasil', score: '0 - 1', date: '23/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Austrália', score: '1 - 0', date: '13/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Escócia', score: '3 - 1', date: '12/09/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'hr': {
        name: 'Croácia',
        group: 'L',
        wc_participations: 7,
        qualifiers: {
            summary: 'Vencedor do Grupo L da UEFA.',
            matches: 10, won: 7, drawn: 2, lost: 1,
            recent_matches: [
                { opponent: 'Irlanda do Norte', score: '3 - 1', date: '18/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Suécia', score: '2 - 0', date: '15/11/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Suécia', score: '1 - 0', date: '12/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Luxemburgo', score: '4 - 0', date: '09/10/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Irlanda do Norte', score: '1 - 1', date: '08/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Luxemburgo', score: '3 - 0', date: '05/09/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Portugal', score: '1 - 1', date: '18/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Escócia', score: '0 - 1', date: '15/11/2024', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '3 - 3', date: '15/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Escócia', score: '2 - 1', date: '12/10/2024', competition: 'UEFA Nations League' },
                { opponent: 'Polônia', score: '1 - 0', date: '08/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Portugal', score: '1 - 2', date: '05/09/2024', competition: 'UEFA Nations League' },
                { opponent: 'Itália', score: '1 - 1', date: '24/06/2024', competition: 'Eurocopa' },
                { opponent: 'Albânia', score: '2 - 2', date: '19/06/2024', competition: 'Eurocopa' },
                { opponent: 'Espanha', score: '0 - 3', date: '15/06/2024', competition: 'Eurocopa' },
                { opponent: 'Armênia', score: '1 - 0', date: '21/11/2023', competition: 'Eliminatórias Eurocopa' },
                { opponent: 'Letônia', score: '2 - 0', date: '18/11/2023', competition: 'Eliminatórias Eurocopa' }
            ]
        },
        friendlies: [
            { opponent: 'Armênia', score: '3 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Albânia', score: '2 - 0', date: '06/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Portugal', score: '2 - 1', date: '08/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Macedônia do Norte', score: '3 - 0', date: '03/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Egito', score: '4 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Tunísia', score: '0 - 0', date: '23/03/2024', competition: 'Amistoso Internacional' }
        ]
    },
    'gh': {
        name: 'Gana',
        group: 'L',
        wc_participations: 5,
        qualifiers: {
            summary: 'Vencedor do Grupo I (CAF).',
            matches: 10, won: 8, drawn: 2, lost: 0,
            recent_matches: [
                { opponent: 'Argélia', score: '1 - 2', date: '09/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Mali', score: '1 - 1', date: '05/01/2026', competition: 'Copa das Nações da África' },
                { opponent: 'Nigéria', score: '0 - 2', date: '31/12/2025', competition: 'Copa das Nações da África' },
                { opponent: 'Níger', score: '1 - 2', date: '18/11/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Angola', score: '1 - 1', date: '15/11/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Sudão', score: '0 - 2', date: '15/10/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Sudão', score: '0 - 0', date: '10/10/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Níger', score: '1 - 1', date: '09/09/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Angola', score: '0 - 1', date: '05/09/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Rep. Centro-Africana', score: '4 - 3', date: '10/06/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Mali', score: '2 - 1', date: '06/06/2024', competition: 'Eliminatórias - CAF' },
                { opponent: 'Moçambique', score: '2 - 2', date: '22/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Egito', score: '2 - 2', date: '18/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Cabo Verde', score: '1 - 2', date: '14/01/2024', competition: 'Copa das Nações da África' },
                { opponent: 'Comores', score: '0 - 1', date: '21/11/2023', competition: 'Eliminatórias - CAF' },
                { opponent: 'Madagascar', score: '1 - 0', date: '17/11/2023', competition: 'Eliminatórias - CAF' },
                { opponent: 'Nigéria', score: '0 - 2', date: '28/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Burkina Faso', score: '2 - 1', date: '25/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Argélia', score: '1 - 1', date: '05/08/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Nigéria', score: '3 - 2', date: '30/07/2025', competition: 'Campeonato Africano de Nações' },
                { opponent: 'Burkina Faso', score: '2 - 0', date: '27/07/2025', competition: 'Campeonato Africano de Nações' }
            ]
        },
        friendlies: [
            { opponent: 'Libéria', score: '1 - 0', date: '10/06/2025', competition: 'Amistoso Internacional' },
            { opponent: 'Uganda', score: '2 - 2', date: '26/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Nigéria', score: '1 - 2', date: '22/03/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Namíbia', score: '0 - 0', date: '08/01/2024', competition: 'Amistoso Internacional' },
            { opponent: 'EUA', score: '0 - 4', date: '17/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'México', score: '0 - 2', date: '14/10/2023', competition: 'Amistoso Internacional' },
            { opponent: 'Libéria', score: '3 - 1', date: '12/09/2023', competition: 'Amistoso Internacional' }
        ]
    },
    'pa': {
        name: 'Panamá',
        group: 'L',
        wc_participations: 2,
        qualifiers: {
            summary: 'Vencedor do Grupo A da CONCACAF.',
            matches: 10, won: 7, drawn: 3, lost: 0,
            recent_matches: [
                { opponent: 'Costa Rica', score: '2 - 2', date: '18/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Costa Rica', score: '1 - 0', date: '14/11/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Canadá', score: '1 - 2', date: '15/10/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'EUA', score: '0 - 2', date: '12/10/2025', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Guiana', score: '2 - 0', date: '08/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Montserrat', score: '3 - 1', date: '05/06/2025', competition: 'Eliminatórias da Copa' },
                { opponent: 'Colômbia', score: '0 - 5', date: '06/07/2024', competition: 'Copa América' },
                { opponent: 'Bolívia', score: '3 - 1', date: '01/07/2024', competition: 'Copa América' },
                { opponent: 'EUA', score: '2 - 1', date: '27/06/2024', competition: 'Copa América' },
                { opponent: 'Uruguai', score: '1 - 3', date: '23/06/2024', competition: 'Copa América' },
                { opponent: 'Jamaica', score: '0 - 1', date: '24/03/2024', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'México', score: '0 - 3', date: '21/03/2024', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Costa Rica', score: '3 - 1', date: '20/11/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Costa Rica', score: '3 - 0', date: '16/11/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Guatemala', score: '3 - 0', date: '17/10/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Martinica', score: '2 - 1', date: '13/10/2023', competition: 'Liga das Nações CONCACAF' },
                { opponent: 'Guatemala', score: '1 - 1', date: '10/09/2023', competition: 'Liga das Nações CONCACAF' }
            ]
        },
        friendlies: [
            { opponent: 'Paraguai', score: '0 - 1', date: '16/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Guiana Francesa', score: '0 - 1', date: '10/06/2024', competition: 'Amistoso Internacional' },
            { opponent: 'Catalunha', score: '2 - 2', date: '29/05/2024', competition: 'Amistoso Internacional' }
        ]
    },
}
