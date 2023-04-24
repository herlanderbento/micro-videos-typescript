import { CategoryRepository } from "#category/domain/repository/category.repository";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#seedwork/application/dto/pagination-output";
import { SearchInputDto } from "#seedwork/application/dto/search-input";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import UseCase from "#seedwork/application/use-cases";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  public constructor(
    private categoryRepository: CategoryRepository.Repository
  ) {}

  public async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const { items: _items } = searchResult;
    const items = _items.map((item) => {
      return CategoryOutputMapper.toOutput(item);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
