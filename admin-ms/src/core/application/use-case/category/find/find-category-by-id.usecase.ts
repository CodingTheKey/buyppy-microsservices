import { CategoryRepositoryInterface } from "../../../repositories/category/category-repository.interface";
import { CategoryMapper } from "../mappers/category.mapper";

export class FindCategoryByIdUseCase {
  private readonly categoryRepository: CategoryRepositoryInterface
  constructor(
    categoryRepository: CategoryRepositoryInterface
  ) {
    this.categoryRepository = categoryRepository
  }

  async execute(id: string) {
    const category = await this.categoryRepository.find(id)

    const output = CategoryMapper.execute(category)

    return output
  }
}