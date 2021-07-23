import { Request, Response } from "express"
import { ExecuteSQL } from "../../BancoSql";

class ControleUpdateStatus {
    async handle(request: Request, response: Response) {
        const { opt_cod_cliente,
            opt_chave_ped,
            app,
            novo_status
        } = request.body;

        if (app === "ACCON") {
            const atualizaNovoStatus = await ExecuteSQL(
                `UPDATE opt_ped_app SET novo_status = '${novo_status}'
                WHERE opt_pedido_app = '${opt_chave_ped}'
                AND opt_cod_cliente = ?`, opt_cod_cliente
            )
        }
        else {
            console.log(`ATUALIZOU PEDIDO: ${opt_chave_ped} STATUS ${novo_status} COD_CLI ${opt_cod_cliente}`)
            const atualizaStatus = await ExecuteSQL(
                `UPDATE opt_ped_app SET novo_status = '${novo_status}', 
                    status = '${novo_status}'
                    WHERE opt_pedido_app = '${opt_chave_ped}'
                    AND opt_cod_cliente = ?`, opt_cod_cliente)
        }

        return response.json({
            message: "Atualizados"
        })
    }
}

export { ControleUpdateStatus }