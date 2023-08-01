import { getCustomRepository } from "typeorm";
import { SuporteRep } from "../../repositories/SuporteRep";

interface iSuporte {
    seq?: any;
    data?: any;
    hora?: any;
    opt_cod_cliente?: any;
    status?: any;
    prioridade?: any;
    atendente?: string;
    titulo?: any;
    descricao?: any;
    contato?: any;
    resolucao?: any;
    cod_setor?: any;
}

class ServiceCriaSuporte {
    async execute({
        data,
        hora,
        opt_cod_cliente,
        status,
        prioridade,
        atendente,
        titulo,
        descricao,
        contato,
        resolucao,
        cod_setor,
    }: iSuporte) {
        const supRep = getCustomRepository(SuporteRep);

        const verCad = await supRep.findOne({
            titulo,
            hora,
            opt_cod_cliente,
        });

        if (verCad) {
            throw new Error("Suporte Já Cadastrado!");
        }

        const _suporte = await supRep.create({
            data,
            hora,
            opt_cod_cliente,
            status,
            prioridade,
            atendente,
            titulo,
            descricao,
            contato,
            resolucao,
            cod_setor,
        });

        await supRep.save(_suporte);

        return _suporte;
    }
}

export { ServiceCriaSuporte };
