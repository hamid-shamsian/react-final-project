import { useQuery } from "@tanstack/react-query";
import catService, { Category } from "../services/catService";
import subCatService from "../services/subCatService";

type CategoriesData = Category[];

const fetchCategories = async (): Promise<CategoriesData> => {
  let { categories } = await catService.getAll();

  const subCategories = await Promise.all(categories.map((c: Category) => c._id).map((catId: string) => subCatService.getAll(catId)));
  categories.forEach((c: Category, i: number) => (c.subcategories = subCategories[i].subcategories));

  return categories;
};

const useCategories = () =>
  useQuery<CategoriesData, Error>({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    placeholderData: prevData => prevData
  });

export default useCategories;
