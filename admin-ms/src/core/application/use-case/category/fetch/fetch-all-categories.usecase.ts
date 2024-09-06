import { CategoryRepositoryInterface } from "../../../repositories/category/category-repository.interface";
import { CategoryMapper } from "../mappers/category.mapper";

export class FetchAllCategoriesUseCase {
  private readonly categoryRepository: CategoryRepositoryInterface

  constructor(
    categoryRepository: CategoryRepositoryInterface
  ) {
    this.categoryRepository = categoryRepository
  }

  async execute() {
    const raw = await this.categoryRepository.findAll()

    const categories = raw.map((c) => CategoryMapper.execute(c))

    return categories
  }
}