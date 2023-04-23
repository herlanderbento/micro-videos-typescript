import UseCase from "../../../@seedwork/application/use-cases";
import CategoryRepository from "../../domain/repository/category.repository";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/pagination-output";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

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

  // private toOutput(searchResult: CategoryRepository.SearchResult): Output {
  //   const items = searchResult.items.map((item) => {
  //     return CategoryOutputMapper.toOutput(item);
  //   });
  //   const pagination = PaginationOutputMapper.toOutput(searchResult);

  //   return {
  //     items,
  //     ...pagination,
  //   };
  // }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
