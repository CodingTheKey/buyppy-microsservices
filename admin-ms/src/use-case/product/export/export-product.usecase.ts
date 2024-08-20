import Excel from "exceljs";
import { Product } from "../../../domain/product/entity/product";
import { ProductRepository } from "../../../infra/product/repository/prisma/product.repository";

export class ExportProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    try {
      const products = await this.productRepository.findAll();
      return products;
    } catch (error: unknown) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async generateExcel(products: Product[]): Promise<Excel.Workbook> {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Products");

    worksheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Nome", key: "name", width: 30 },
      { header: "Código", key: "code", width: 20 },
      { header: "Custo", key: "cost", width: 15 },
      { header: "Preço", key: "price", width: 15 },
      { header: "Preço Promocional", key: "promotionalPrice", width: 20 },
      { header: "Estoque", key: "stock", width: 20 },
      { header: "Categoria", key: "category", width: 20 },
      { header: "Data de Criação", key: "createAt", width: 20 },
      { header: "Data de Atualização", key: "updatedAt", width: 20 },
      { header: "Data de Exclusão", key: "deletedAt", width: 20 },
    ];

    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        code: product.code,
        cost: product.cost,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        category: product.category,
        createAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
      });
    });

    return workbook;
  }
}