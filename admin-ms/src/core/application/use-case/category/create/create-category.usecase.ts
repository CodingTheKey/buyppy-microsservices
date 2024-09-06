import { CategoryFactory } from "../../../../domain/category/factory/create-category.factory"
import { CategoryRepositoryInterface } from "../../../repositories/category/category-repository.interface"
import { InputCreateCategoryDTO } from "./input-create-category.dto"

export class CreateCategoryUseCase {
  private readonly categoryRepository: CategoryRepositoryInterface

  constructor(
    categoryRepository: CategoryRepositoryInterface
  ) {
    this.categoryRepository = categoryRepository
  }

  async execute(input: InputCreateCategoryDTO) {
    const category = CategoryFactory.create(input.title)

    await this.categoryRepository.create(category)
  }
}