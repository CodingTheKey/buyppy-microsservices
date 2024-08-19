import Excel from "exceljs";
import Client from "../../../domain/client/entity/client";
import { ClientRepository } from "../../../infra/client/repository/prisma/client.repository";

export class ExportClientsUseCase {
  private readonly clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(): Promise<Client[]> {
    try {
      const clients = await this.clientRepository.findAll();
      return clients;
    } catch (error: unknown) {
      console.error("Error fetching clients:", error);
      throw new Error("Failed to fetch clients");
    }
  }

  async generateExcel(clients: Client[]): Promise<Excel.Workbook> {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Clients");

    worksheet.columns = [
      { header: "Nome", key: "name", width: 30 },
      { header: "E-mail", key: "email", width: 30 },
      { header: "CPF/CNPJ", key: "document", width: 20 },
      { header: "Telefone", key: "phone", width: 20 },
      { header: "Observação", key: "observations", width: 50 },
      { header: "Rua", key: "street", width: 30 },
      { header: "Número", key: "number", width: 10 },
      { header: "CEP", key: "zipCode", width: 10 },
      { header: "Cidade", key: "city", width: 20 },
    ];

    clients.forEach((client) => {
      worksheet.addRow({
        name: client.name,
        email: client.email,
        document: client.document,
        phone: client.phone,
        observations: client.observations,
        street: client.address.street,
        number: client.address.number,
        zipCode: client.address.zipCode,
        city: client.address.city,
      });
    });

    return workbook;
  }
}