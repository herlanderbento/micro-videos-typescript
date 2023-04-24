import { SearchResult } from "#seedwork/domain/repository/repository-contracts";
import { PaginationOutputMapper } from "./pagination-output";

describe("PaginationOutputMapper unit tests", () => {
  // it("should convert a SearchResult in output", () => {
  //   const result = new SearchResult({
  //     items: ["fake"] as any,
  //     total: 1,
  //     current_page: 1,
  //     per_page: 1,
  //     sort: "name",
  //     sort_dir: "desc",
  //     filter: "fake",
  //   });

  //   const output = PaginationOutputMapper.toOutput(result.items);
  //   expect(output).toStrictEqual({
  //     items: ["fake"],
  //     total: 1,
  //     current_page: 1,
  //     last_page: 1,
  //     per_page: 1,
  //   });
  // });

  it("should convert a SearchResult in output", () => {
    const result = new SearchResult({
      items: ["fake"] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: "name",
      sort_dir: "desc",
      filter: "fake",
    });
    const output = PaginationOutputMapper.toOutput(result.items, result);
    expect(output).toStrictEqual({
      items: ["fake"],
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    });
  });
});
